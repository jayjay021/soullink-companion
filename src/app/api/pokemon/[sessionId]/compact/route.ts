import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = await params;
    const { pokemonId, playerId } = await request.json();

    // Validate required fields
    if (!pokemonId || !playerId) {
      return NextResponse.json(
        { error: 'Pokemon ID and player ID are required' },
        { status: 400 }
      );
    }

    // Use a transaction to handle the compaction atomically
    const result = await prisma.$transaction(async (tx) => {
      // Get the Pokemon being moved
      const movingPokemon = await tx.pokemon.findUnique({
        where: { id: pokemonId, sessionId },
      });

      if (!movingPokemon) {
        throw new Error('Pokemon not found');
      }

      // Get all box Pokemon for this player, ordered by position
      const boxPokemon = await tx.pokemon.findMany({
        where: {
          sessionId,
          playerId,
          inBox: true,
          id: { not: pokemonId }, // Exclude the moving Pokemon
        },
        orderBy: { position: 'asc' },
      });

      // Find the next available position at the end
      const nextPosition = boxPokemon.length;

      // Move the Pokemon to the box at the end
      const updatedPokemon = await tx.pokemon.update({
        where: { id: pokemonId },
        data: {
          position: nextPosition,
          inBox: true,
        },
      });

      // Compact positions: reassign consecutive positions starting from 0
      for (let i = 0; i < boxPokemon.length; i++) {
        if (boxPokemon[i].position !== i) {
          await tx.pokemon.update({
            where: { id: boxPokemon[i].id },
            data: { position: i },
          });
        }
      }

      return updatedPokemon;
    });

    return NextResponse.json({
      success: true,
      pokemon: result,
    });
  } catch (error) {
    console.error('Error compacting box positions:', error);
    return NextResponse.json(
      { error: 'Failed to compact box positions' },
      { status: 500 }
    );
  }
}
