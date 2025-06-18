import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params;
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
        // This is a swap operation
        await tx.pokemon.update({
          where: { id: targetPokemon.id },
          data: {
            position: movingPokemon.position,
            inBox: movingPokemon.inBox,
          },
        });

        // Move the dragged Pokemon to the new position (simple swap)
        const updatedPokemon = await tx.pokemon.update({
          where: { id: pokemonId },
          data: {
            position: newPosition,
            inBox: inBox,
          },
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

        return updatedPokemon;
      }
    });

    return NextResponse.json({
      success: true,
      pokemon: result,
    });
  } catch (error) {
    console.error('Error updating Pokemon position:', error);
    return NextResponse.json(
      { error: 'Failed to update Pokemon position' },
      { status: 500 }
    );
  }
}
