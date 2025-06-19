import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    const { pokemonId, newPosition, inBox } = await request.json();

    // Validate required fields
    if (!pokemonId || newPosition === undefined || inBox === undefined) {
      return NextResponse.json(
        { error: 'Pokemon ID, position, and box status are required' },
        { status: 400 }
      );
    }

    // Get the Pokemon being moved
    const movingPokemon = await prisma.pokemon.findUnique({
      where: { id: pokemonId, sessionId },
    });

    if (!movingPokemon) {
      return NextResponse.json({ error: 'Pokemon not found' }, { status: 404 });
    }

    // Check if there's a Pokemon already at the target position with the same inBox status
    const targetPokemon = await prisma.pokemon.findFirst({
      where: {
        sessionId,
        position: newPosition,
        inBox: inBox,
        playerId: movingPokemon.playerId, // Ensure same player
      },
    });

    // Use a transaction to handle the swap/move atomically
    const result = await prisma.$transaction(async (tx) => {
      // Handle swapping first if there's a target Pokemon
      if (targetPokemon && targetPokemon.id !== pokemonId) {
        // This is a swap operation - use a temporary position to avoid constraint conflicts
        const tempPosition = -999; // Temporary position that won't conflict

        // Step 1: Move target Pokemon to temporary position
        await tx.pokemon.update({
          where: { id: targetPokemon.id },
          data: {
            position: tempPosition,
          },
        });

        // Step 2: Move the dragged Pokemon to the target position
        await tx.pokemon.update({
          where: { id: pokemonId },
          data: {
            position: newPosition,
            inBox: inBox,
            inTeam: !inBox, // Update team status
          },
        });

        // Step 3: Move target Pokemon to the dragged Pokemon's original position
        await tx.pokemon.update({
          where: { id: targetPokemon.id },
          data: {
            position: movingPokemon.position,
            inBox: movingPokemon.inBox,
            inTeam: !movingPokemon.inBox, // Update team status
          },
        });

        // Update team link validity for both Pokemon involved in the swap
        await updateTeamLinkValidity(tx, movingPokemon);
        await updateTeamLinkValidity(tx, targetPokemon);

        // Return the moved Pokemon
        const updatedPokemon = await tx.pokemon.findUnique({
          where: { id: pokemonId },
        });

        return updatedPokemon;
      } else {
        // This is a move operation (not a swap)
        // Move the dragged Pokemon to the new position
        const updatedPokemon = await tx.pokemon.update({
          where: { id: pokemonId },
          data: {
            position: newPosition,
            inBox: inBox,
            inTeam: !inBox, // Update team status
          },
        });

        // Only compact if Pokemon was moved FROM the box
        if (movingPokemon.inBox) {
          if (!inBox) {
            // Pokemon moved from box to team - compact the box
            const boxPokemon = await tx.pokemon.findMany({
              where: {
                sessionId,
                playerId: movingPokemon.playerId,
                inBox: true,
              },
              orderBy: { position: 'asc' },
            });

            // Reassign positions to eliminate gaps
            for (let i = 0; i < boxPokemon.length; i++) {
              if (boxPokemon[i].position !== i) {
                await tx.pokemon.update({
                  where: { id: boxPokemon[i].id },
                  data: { position: i },
                });
              }
            }
          } else {
            // Pokemon moved within the box - shift down Pokemon that were after the original position
            const originalPosition = movingPokemon.position;

            // Get Pokemon that were positioned after the moved Pokemon's original position
            const pokemonToShift = await tx.pokemon.findMany({
              where: {
                sessionId,
                playerId: movingPokemon.playerId,
                inBox: true,
                position: { gt: originalPosition },
                id: { not: pokemonId }, // Exclude the moved Pokemon
              },
              orderBy: { position: 'asc' },
            });

            // Shift them down by one position to fill the gap
            for (const pokemon of pokemonToShift) {
              await tx.pokemon.update({
                where: { id: pokemon.id },
                data: { position: pokemon.position - 1 },
              });
            }

            // Adjust the moved Pokemon's position if it was moved to the end
            // Since we removed one position from the middle, the end position should be one less
            const finalPosition =
              newPosition > originalPosition ? newPosition - 1 : newPosition;
            if (finalPosition !== newPosition) {
              await tx.pokemon.update({
                where: { id: pokemonId },
                data: { position: finalPosition },
              });
            }
          }
        }

        // Update team link validity for linked Pokemon
        await updateTeamLinkValidity(tx, movingPokemon);

        return updatedPokemon;
      }
    });

    // Get fresh data with updated link status
    const updatedPokemon = await prisma.pokemon.findUnique({
      where: { id: result?.id || pokemonId },
    });

    return NextResponse.json(updatedPokemon);
  } catch (error) {
    console.error('Error updating Pokemon position:', error);
    return NextResponse.json(
      { error: 'Failed to update Pokemon position' },
      { status: 500 }
    );
  }
}

// Helper function to update team link validity
async function updateTeamLinkValidity(
  tx: Prisma.TransactionClient, // Use proper transaction client type
  pokemon: { id: string; linkGroup: string | null }
) {
  // Skip if Pokemon has no link group
  if (!pokemon.linkGroup) return;

  // Get all Pokemon in this link group
  const linkedPokemons = await tx.pokemon.findMany({
    where: { linkGroup: pokemon.linkGroup },
  });

  // Create a map of player IDs to whether they have this Pokemon in their team
  const linkGroupByPlayer = linkedPokemons.reduce(
    (
      acc: Record<string, { inTeam: boolean }>,
      pokemon: { playerId: string; inTeam: boolean; inBox: boolean }
    ) => {
      if (!acc[pokemon.playerId]) {
        acc[pokemon.playerId] = { inTeam: false };
      }
      if (!pokemon.inBox) {
        acc[pokemon.playerId].inTeam = true;
      }
      return acc;
    },
    {} as Record<string, { inTeam: boolean }>
  );

  // Check if all linked Pokemon are in team or all are in box
  const playerIds = Object.keys(linkGroupByPlayer);
  const allInTeam = playerIds.every(
    (playerId) => linkGroupByPlayer[playerId].inTeam
  );

  // Update team link validity for all Pokemon in this group
  await tx.pokemon.updateMany({
    where: { linkGroup: pokemon.linkGroup },
    data: { validTeamLink: allInTeam && linkedPokemons.length > 1 },
  });
}
