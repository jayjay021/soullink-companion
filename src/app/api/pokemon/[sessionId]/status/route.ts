import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// PUT /api/pokemon/[sessionId]/status
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
): Promise<NextResponse> {
  const { sessionId } = await params;

  const UpdatePokemonStatusSchema = z.object({
    pokemonId: z.string().min(1),
    isDead: z.boolean().optional(),
  });

  try {
    const body = await req.json();
    const { pokemonId, isDead } = UpdatePokemonStatusSchema.parse(body);

    // Get the Pokemon to update
    const pokemon = await prisma.pokemon.findUnique({
      where: { id: pokemonId },
    });

    if (!pokemon) {
      return NextResponse.json({ error: 'Pokemon not found' }, { status: 404 });
    }

    // Check if this Pokemon belongs to the session
    if (pokemon.sessionId !== sessionId) {
      return NextResponse.json(
        { error: 'Pokemon not found in this session' },
        { status: 404 }
      );
    }

    // Get link group to update all linked Pokemon
    const linkGroup = pokemon.linkGroup;

    // Prepare update data
    const updateData: {
      isDead?: boolean;
      inBox?: boolean;
      inTeam?: boolean;
    } = {};

    // Handle death status if provided
    if (isDead !== undefined) {
      updateData.isDead = isDead;
    }

    // If the Pokemon is dying and has a link group, mark all linked Pokemon as dead
    if (isDead === true && linkGroup) {
      await prisma.pokemon.updateMany({
        where: { linkGroup },
        data: { isDead: true },
      });

      // Get all updated Pokemon
      const updatedPokemons = await prisma.pokemon.findMany({
        where: { linkGroup },
      });

      return NextResponse.json(updatedPokemons);
    }

    // Update the Pokemon with the changes
    await prisma.pokemon.update({
      where: { id: pokemonId },
      data: updateData,
    });

    // If no link group or team status change, just return the updated Pokemon
    return NextResponse.json(
      await prisma.pokemon.findUnique({
        where: { id: pokemonId },
      })
    );
  } catch (error) {
    console.error('Error updating Pokemon status:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update Pokemon status' },
      { status: 500 }
    );
  }
}
