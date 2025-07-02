import {
  PokemonPositionManager,
  PokemonValidationManager,
  Pokemon,
  PokemonData,
} from '../index';

describe('PokemonPositionManager', () => {
  const mockPokemon: Pokemon[] = [
    {
      id: '1',
      user: { id: 'player1', username: 'Player 1' },
      sessionId: 'session1',
      pokemonId: 25, // Pikachu
      name: 'Pikachu',
      image: 'pikachu.png',
      routeName: 'Route 1',
      status: 'CAUGHT',
      location: 'TEAM',
      position: 1,
    },
    {
      id: '2',
      user: { id: 'player1', username: 'Player 1' },
      sessionId: 'session1',
      pokemonId: 1, // Bulbasaur
      name: 'Bulbasaur',
      image: 'bulbasaur.png',
      routeName: 'Route 2',
      status: 'CAUGHT',
      location: 'BOX',
      position: 1,
    },
    {
      id: '3',
      user: { id: 'player1', username: 'Player 1' },
      sessionId: 'session1',
      pokemonId: 4, // Charmander
      name: 'Charmander',
      image: 'charmander.png',
      routeName: 'Route 3',
      status: 'CAUGHT',
      location: 'BOX',
      position: 3,
    },
  ];

  describe('reorganizeBoxPositions', () => {
    it('should reorganize box positions to remove gaps', () => {
      const result = PokemonPositionManager.reorganizeBoxPositions(mockPokemon);
      const boxPokemon = result.filter((p) => p.location === 'BOX');

      expect(boxPokemon).toHaveLength(2);
      expect(boxPokemon[0].position).toBe(0);
      expect(boxPokemon[1].position).toBe(1); // Gap filled
    });

    it('should exclude removed Pokemon', () => {
      const result = PokemonPositionManager.reorganizeBoxPositions(
        mockPokemon,
        '2'
      );
      const boxPokemon = result.filter((p) => p.location === 'BOX');

      expect(boxPokemon).toHaveLength(1);
      expect(boxPokemon[0].id).toBe('3');
      expect(boxPokemon[0].position).toBe(0);
    });
  });

  describe('validateMove', () => {
    it('should validate team position range', () => {
      const result = PokemonPositionManager.validateMove(
        mockPokemon,
        '2',
        'TEAM',
        7
      );

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Team position must be between 0 and 5');
    });

    it('should allow valid team move', () => {
      const result = PokemonPositionManager.validateMove(
        mockPokemon,
        '2',
        'TEAM',
        3
      );

      expect(result.valid).toBe(true);
      const movedPokemon = result.adjustedPokemon.find((p) => p.id === '2');
      expect(movedPokemon?.location).toBe('TEAM');
      expect(movedPokemon?.position).toBe(3);
    });

    it('should reorganize box when moving to box', () => {
      const result = PokemonPositionManager.validateMove(
        mockPokemon,
        '1',
        'BOX',
        5
      );

      expect(result.valid).toBe(true);
      const boxPokemon = result.adjustedPokemon.filter(
        (p) => p.location === 'BOX'
      );
      expect(boxPokemon).toHaveLength(3);
      expect(boxPokemon.map((p) => p.position)).toEqual([0, 1, 2]);
    });

    it('should return error for non-existent Pokemon', () => {
      const result = PokemonPositionManager.validateMove(
        mockPokemon,
        '999',
        'TEAM',
        1
      );

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Pokemon not found');
    });
    it('should adjust positions correctly when moving to box', () => {
      const pokemonToMove: Pokemon = {
        id: '4',
        user: { id: 'player1', username: 'Player 1' },
        sessionId: 'session1',
        pokemonId: 25, // Pikachu
        name: 'Pikachu',
        image: 'pikachu.png',
        routeName: 'Route 4',
        status: 'CAUGHT',
        location: 'TEAM',
        position: 2,
      };

      const result = PokemonPositionManager.validateMove(
        [...mockPokemon, pokemonToMove],
        '4',
        'BOX',
        4
      );

      expect(result.valid).toBe(true);
      const boxPokemon = result.adjustedPokemon.filter(
        (p) => p.location === 'BOX'
      );
      expect(boxPokemon).toHaveLength(3);
      expect(boxPokemon[2].id).toBe('4');
    });

    it('should handle moving to same position', () => {
      const result = PokemonPositionManager.validateMove(
        mockPokemon,
        '1',
        'TEAM',
        1
      );

      expect(result.valid).toBe(true);
      expect(result.adjustedPokemon.length).toBe(0); // No changes needed
    });

    it('should handle moving to box with existing Pokemon', () => {
      const pokemonToMove: Pokemon = {
        id: '4',
        user: { id: 'player1', username: 'Player 1' },
        sessionId: 'session1',
        pokemonId: 25, // Pikachu
        name: 'Pikachu',
        image: 'pikachu.png',
        routeName: 'Route 4',
        status: 'CAUGHT',
        location: 'TEAM',
        position: 2,
      };

      const result = PokemonPositionManager.validateMove(
        [...mockPokemon, pokemonToMove],
        '4',
        'BOX',
        2
      );

      expect(result.valid).toBe(true);
      const boxPokemon = result.adjustedPokemon.filter(
        (p) => p.location === 'BOX'
      );
      expect(boxPokemon).toHaveLength(3);
      expect(boxPokemon[1].position).toBe(1); // New position for moved Pokemon
    });

    it('should handle moving to occupied team position', () => {
      const pokemonToMove: Pokemon = {
        id: '4',
        user: { id: 'player1', username: 'Player 1' },
        sessionId: 'session1',
        pokemonId: 25, // Pikachu
        name: 'Pikachu',
        image: 'pikachu.png',
        routeName: 'Route 4',
        status: 'CAUGHT',
        location: 'TEAM',
        position: 2,
      };

      const result = PokemonPositionManager.validateMove(
        [...mockPokemon, pokemonToMove],
        '4',
        'TEAM',
        1
      );

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Team position 1 is already occupied');
    });

    it('should handle moving to occupied box position', () => {
      const pokemonToMove: Pokemon = {
        id: '4',
        user: { id: 'player1', username: 'Player 1' },
        sessionId: 'session1',
        pokemonId: 25, // Pikachu
        name: 'Pikachu',
        image: 'pikachu.png',
        routeName: 'Route 4',
        status: 'CAUGHT',
        location: 'TEAM',
        position: 2,
      };

      const result = PokemonPositionManager.validateMove(
        [...mockPokemon, pokemonToMove],
        '4',
        'BOX',
        1
      );

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Box position 1 is already occupied');
    });
  });

  describe('getNextTeamPosition', () => {
    it('should return next available team position', () => {
      const result = PokemonPositionManager.getNextTeamPosition(
        mockPokemon,
        'player1'
      );
      expect(result).toBe(0); // Position 1 is occupied, so next is 0
    });

    it('should return null when team is full', () => {
      const fullTeam: Pokemon[] = Array.from({ length: 6 }, (_, i) => ({
        id: `team-${i + 1}`,
        user: { id: 'player1', username: 'Player 1' },
        sessionId: 'session1',
        pokemonId: i + 1,
        name: `Pokemon ${i + 1}`,
        image: `pokemon-${i + 1}.png`,
        routeName: `Route ${i + 1}`,
        status: 'CAUGHT' as const,
        location: 'TEAM' as const,
        position: i,
      }));

      const result = PokemonPositionManager.getNextTeamPosition(
        fullTeam,
        'player1'
      );
      expect(result).toBeNull();
    });
  });

  describe('getNextBoxPosition', () => {
    it('should return next box position', () => {
      const result = PokemonPositionManager.getNextBoxPosition(
        mockPokemon,
        'player1'
      );
      expect(result).toBe(4); // Max position is 3, so next is 4
    });

    it('should return 0 for empty box', () => {
      const result = PokemonPositionManager.getNextBoxPosition(
        [],
        'player1'
      );
      expect(result).toBe(0);
    });
  });
});

describe('PokemonValidationManager', () => {
  const mockPokemonData: PokemonData[] = [
    {
      id: 1,
      name: {
        english: 'Bulbasaur',
        japanese: 'フシギダネ',
        german: 'Bisasam'
      },
      type: ['Grass', 'Poison'],
      base: {
        HP: 45,
        Attack: 49,
        Defense: 49,
        'Sp. Attack': 65,
        'Sp. Defense': 65,
        Speed: 45
      },
      species: 'Seed Pokémon',
      description: 'Bulbasaur can be seen napping in bright sunlight.',
      evolution: {
        next: [['2', 'Level 16']]
      },
      profile: {
        height: '0.7 m',
        weight: '6.9 kg',
        egg: ['Monster', 'Grass'],
        ability: [['Overgrow', 'false'], ['Chlorophyll', 'true']],
        gender: '87.5:12.5'
      },
      image: {
        sprite: 'bulbasaur-sprite.png',
        thumbnail: 'bulbasaur-thumb.png',
        hires: 'bulbasaur-hires.png'
      }
    },
    {
      id: 2,
      name: {
        english: 'Ivysaur',
        japanese: 'フシギソウ',
        german: 'Bisaknosp'
      },
      type: ['Grass', 'Poison'],
      base: {
        HP: 60,
        Attack: 62,
        Defense: 63,
        'Sp. Attack': 80,
        'Sp. Defense': 80,
        Speed: 60
      },
      species: 'Seed Pokémon',
      description: 'Ivysaur has a flower bud on its back.',
      evolution: {
        prev: ['1', 'Level 16'],
        next: [['3', 'Level 32']]
      },
      profile: {
        height: '1.0 m',
        weight: '13.0 kg',
        egg: ['Monster', 'Grass'],
        ability: [['Overgrow', 'false'], ['Chlorophyll', 'true']],
        gender: '87.5:12.5'
      },
      image: {
        sprite: 'ivysaur-sprite.png',
        thumbnail: 'ivysaur-thumb.png',
        hires: 'ivysaur-hires.png'
      }
    },
    {
      id: 3,
      name: {
        english: 'Venusaur',
        japanese: 'フシギバナ',
        german: 'Bisaflor'
      },
      type: ['Grass', 'Poison'],
      base: {
        HP: 80,
        Attack: 82,
        Defense: 83,
        'Sp. Attack': 100,
        'Sp. Defense': 100,
        Speed: 80
      },
      species: 'Seed Pokémon',
      description: 'Venusaur has a large flower on its back.',
      evolution: {
        prev: ['2', 'Level 32']
      },
      profile: {
        height: '2.0 m',
        weight: '100.0 kg',
        egg: ['Monster', 'Grass'],
        ability: [['Overgrow', 'false'], ['Chlorophyll', 'true']],
        gender: '87.5:12.5'
      },
      image: {
        sprite: 'venusaur-sprite.png',
        thumbnail: 'venusaur-thumb.png',
        hires: 'venusaur-hires.png'
      }
    },
    {
      id: 4,
      name: {
        english: 'Charmander',
        japanese: 'ヒトカゲ',
        german: 'Glumanda'
      },
      type: ['Fire'],
      base: {
        HP: 39,
        Attack: 52,
        Defense: 43,
        'Sp. Attack': 60,
        'Sp. Defense': 50,
        Speed: 65
      },
      species: 'Lizard Pokémon',
      description: 'Charmander has a flame on its tail.',
      evolution: {
        next: [['5', 'Level 16']]
      },
      profile: {
        height: '0.6 m',
        weight: '8.5 kg',
        egg: ['Monster', 'Dragon'],
        ability: [['Blaze', 'false'], ['Solar Power', 'true']],
        gender: '87.5:12.5'
      },
      image: {
        sprite: 'charmander-sprite.png',
        thumbnail: 'charmander-thumb.png',
        hires: 'charmander-hires.png'
      }
    },
    {
      id: 5,
      name: {
        english: 'Charmeleon',
        japanese: 'リザード',
        german: 'Glutexo'
      },
      type: ['Fire'],
      base: {
        HP: 58,
        Attack: 64,
        Defense: 58,
        'Sp. Attack': 80,
        'Sp. Defense': 65,
        Speed: 80
      },
      species: 'Flame Pokémon',
      description: 'Charmeleon has a more aggressive nature.',
      evolution: {
        prev: ['4', 'Level 16'],
        next: [['6', 'Level 36']]
      },
      profile: {
        height: '1.1 m',
        weight: '19.0 kg',
        egg: ['Monster', 'Dragon'],
        ability: [['Blaze', 'false'], ['Solar Power', 'true']],
        gender: '87.5:12.5'
      },
      image: {
        sprite: 'charmeleon-sprite.png',
        thumbnail: 'charmeleon-thumb.png',
        hires: 'charmeleon-hires.png'
      }
    },
    {
      id: 6,
      name: {
        english: 'Charizard',
        japanese: 'リザードン',
        german: 'Glurak'
      },
      type: ['Fire', 'Flying'],
      base: {
        HP: 78,
        Attack: 84,
        Defense: 78,
        'Sp. Attack': 109,
        'Sp. Defense': 85,
        Speed: 100
      },
      species: 'Flame Pokémon',
      description: 'Charizard is a powerful flying and fire type.',
      evolution: {
        prev: ['5', 'Level 36']
      },
      profile: {
        height: '1.7 m',
        weight: '90.5 kg',
        egg: ['Monster', 'Dragon'],
        ability: [['Blaze', 'false'], ['Solar Power', 'true']],
        gender: '87.5:12.5'
      },
      image: {
        sprite: 'charizard-sprite.png',
        thumbnail: 'charizard-thumb.png',
        hires: 'charizard-hires.png'
      }
    },
  ];

  const mockPokemon: Pokemon[] = [
    {
      id: '1',
      user: { id: 'player1', username: 'Player 1' },
      sessionId: 'session1',
      pokemonId: 1, // Bulbasaur
      name: 'Bulbasaur',
      image: 'bulbasaur.png',
      routeName: 'Route 1',
      status: 'CAUGHT',
      location: 'TEAM',
      position: 1,
    },
    {
      id: '2',
      user: { id: 'player2', username: 'Player 2' },
      sessionId: 'session1',
      pokemonId: 1, // Bulbasaur (same species)
      name: 'Bulbasaur',
      image: 'bulbasaur.png',
      routeName: 'Route 1',
      status: 'DEAD',
      location: 'BOX',
      position: 1,
    },
  ];

  describe('getEvolutionLine', () => {
    it('should return evolution line for Bulbasaur', () => {
      const result = PokemonValidationManager.getEvolutionLine(1, mockPokemonData);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should return evolution line for Charmander', () => {
      const result = PokemonValidationManager.getEvolutionLine(4, mockPokemonData);
      expect(result).toEqual([4, 5, 6]);
    });

    it('should return single Pokemon for non-evolving species', () => {
      const result = PokemonValidationManager.getEvolutionLine(999, mockPokemonData);
      expect(result).toEqual([999]);
    });
  });

  describe('canCatchSpecies', () => {
    it('should allow catching new species', () => {
      const result = PokemonValidationManager.canCatchSpecies(4, 'player1', [], mockPokemonData);
      expect(result.canCatch).toBe(true);
    });

    it('should prevent catching evolution of already caught Pokemon', () => {
      const existingPokemon: Pokemon[] = [
        {
          id: '1',
          user: { id: 'player1', username: 'Player 1' },
          sessionId: 'session1',
          pokemonId: 1,
          name: 'Bulbasaur',
          image: 'bulbasaur.png',
          routeName: 'Route 1',
          status: 'CAUGHT',
          location: 'TEAM',
          position: 1,
        },
      ];

      const result = PokemonValidationManager.canCatchSpecies(2, 'player1', existingPokemon, mockPokemonData);
      expect(result.canCatch).toBe(false);
      expect(result.reason).toBe('A Pokemon in this evolution line is already caught');
    });

    it('should prevent catching pre-evolution of already caught Pokemon', () => {
      const existingPokemon: Pokemon[] = [
        {
          id: '1',
          user: { id: 'player1', username: 'Player 1' },
          sessionId: 'session1',
          pokemonId: 3,
          name: 'Venusaur',
          image: 'venusaur.png',
          routeName: 'Route 1',
          status: 'CAUGHT',
          location: 'TEAM',
          position: 1,
        },
      ];

      const result = PokemonValidationManager.canCatchSpecies(2, 'player1', existingPokemon, mockPokemonData);
      expect(result.canCatch).toBe(false);
      expect(result.reason).toBe('A Pokemon in this evolution line is already caught');
    });
    it('should prevent catching same species', () => {
      const existingPokemon: Pokemon[] = [
        {
          id: '1',
          user: { id: 'player1', username: 'Player 1' },
            sessionId: 'session1',
            pokemonId: 1,
            name: 'Bulbasaur',
            image: 'bulbasaur.png',
            routeName: 'Route 1',
            status: 'CAUGHT',
            location: 'TEAM',
            position: 1,
        },
      ];

      const result = PokemonValidationManager.canCatchSpecies(1, 'player1', existingPokemon, mockPokemonData);
      expect(result.canCatch).toBe(false);
      expect(result.reason).toBe('A Pokemon in this evolution line is already caught');
    });
  });


  describe('isLinkedToDead', () => {
    it('should detect link to dead Pokemon', () => {
      const result = PokemonValidationManager.isLinkedToDead(
        mockPokemon[0],
        mockPokemon
      );
      expect(result).toBe(true);
    });

    it('should return false for Pokemon not linked to dead', () => {
      const alivePokemon: Pokemon[] = [
        {
          id: '1',
          user: { id: 'player1', username: 'Player 1' },
          sessionId: 'session1',
          pokemonId: 1,
          name: 'Bulbasaur',
          image: 'bulbasaur.png',
          routeName: 'Route 1',
          status: 'CAUGHT',
          location: 'TEAM',
          position: 1,
        },
        {
          id: '2',
          user: { id: 'player2', username: 'Player 2' },
          sessionId: 'session1',
          pokemonId: 4, // Different species
          name: 'Charmander',
          image: 'charmander.png',
          routeName: 'Route 1',
          status: 'CAUGHT',
          location: 'BOX',
          position: 1,
        },
      ];

      const result = PokemonValidationManager.isLinkedToDead(
        alivePokemon[0],
        alivePokemon
      );
      expect(result).toBe(false);
    });
  });

  describe('getLinkedPokemon', () => {
    it('should find Pokemon of same species', () => {
      const linked = PokemonValidationManager.getLinkedPokemon(
        mockPokemon[0],
        mockPokemon
      );
      expect(linked).toHaveLength(1);
      expect(linked[0].id).toBe('2');
    });

    it('should return empty array for Pokemon with no links', () => {
      const unlinkedPokemon: Pokemon[] = [
        {
          id: '1',
          user: { id: 'player1', username: 'Player 1' },
          sessionId: 'session1',
          pokemonId: 1,
          name: 'Bulbasaur',
          image: 'bulbasaur.png',
          routeName: 'Route 1',
          status: 'CAUGHT',
          location: 'TEAM',
          position: 1,
        },
        {
          id: '2',
          user: { id: 'player2', username: 'Player 2' },
          sessionId: 'session1',
          pokemonId: 4, // Different species
          name: 'Charmander',
          image: 'charmander.png',
          routeName: 'Route 1',
          status: 'CAUGHT',
          location: 'BOX',
          position: 1,
        },
      ];

      const linked = PokemonValidationManager.getLinkedPokemon(
        unlinkedPokemon[0],
        unlinkedPokemon
      );
      expect(linked).toHaveLength(0);
    });
  });

  describe('isTeamValid', () => {
    it('should return true when team has no dead Pokemon', () => {
      const validTeam: Pokemon[] = [
        {
          id: '1',
          user: { id: 'player1', username: 'Player 1' },
          sessionId: 'session1',
          pokemonId: 1,
          name: 'Bulbasaur',
          image: 'bulbasaur.png',
          routeName: 'Route 1',
          status: 'CAUGHT',
          location: 'TEAM',
          position: 1,
        },
      ];

      const result = PokemonValidationManager.isTeamValid('player1', validTeam);
      expect(result).toBe(true);
    });

    it('should return false when team has dead Pokemon', () => {
      const invalidTeam: Pokemon[] = [
        {
          id: '1',
          user: { id: 'player1', username: 'Player 1' },
          sessionId: 'session1',
          pokemonId: 1,
          name: 'Bulbasaur',
          image: 'bulbasaur.png',
          routeName: 'Route 1',
          status: 'DEAD',
          location: 'TEAM',
          position: 1,
        },
      ];

      const result = PokemonValidationManager.isTeamValid('player1', invalidTeam);
      expect(result).toBe(false);
    });
  });

  describe('canCatchSpecies', () => {
    it('should allow catching new species', () => {
      const result = PokemonValidationManager.canCatchSpecies(
        4, // Charmander
        'player1',
        [], // No existing Pokemon
        mockPokemonData
      );

      expect(result.canCatch).toBe(true);
    });

    it('should prevent catching evolution of already caught Pokemon', () => {
      const existingPokemon: Pokemon[] = [
        {
          id: '1',
          user: { id: 'player1', username: 'Player 1' },
          sessionId: 'session1',
          pokemonId: 1, // Bulbasaur
          name: 'Bulbasaur',
          image: 'bulbasaur.png',
          routeName: 'Route 1',
          status: 'CAUGHT',
          location: 'TEAM',
          position: 1,
        },
      ];

      const result = PokemonValidationManager.canCatchSpecies(
        2, // Ivysaur (evolution of Bulbasaur)
        'player1',
        existingPokemon,
        mockPokemonData
      );

      expect(result.canCatch).toBe(false);
      expect(result.reason).toBe('A Pokemon in this evolution line is already caught');
    });

    it('should prevent catching pre-evolution of already caught Pokemon', () => {
      const existingPokemon: Pokemon[] = [
        {
          id: '1',
          user: { id: 'player1', username: 'Player 1' },
          sessionId: 'session1',
          pokemonId: 3, // Venusaur
          name: 'Venusaur',
          image: 'venusaur.png',
          routeName: 'Route 1',
          status: 'CAUGHT',
          location: 'TEAM',
          position: 1,
        },
      ];

      const result = PokemonValidationManager.canCatchSpecies(
        1, // Bulbasaur (pre-evolution of Venusaur)
        'player1',
        existingPokemon,
        mockPokemonData
      );

      expect(result.canCatch).toBe(false);
      expect(result.reason).toBe('A Pokemon in this evolution line is already caught');
    });
  });

  describe('canMoveToTeam', () => {
    it('should allow moving Pokemon to team when space available', () => {
      const pokemon: Pokemon = {
        id: '1',
        user: { id: 'player1', username: 'Player 1' },
        sessionId: 'session1',
        pokemonId: 1,
        name: 'Bulbasaur',
        image: 'bulbasaur.png',
        routeName: 'Route 1',
        status: 'CAUGHT',
        location: 'BOX',
        position: 1,
      };

      const result = PokemonValidationManager.canMoveToTeam('1', [pokemon]);
      expect(result.canMove).toBe(true);
    });

    it('should prevent moving when team is full', () => {
      const fullTeam: Pokemon[] = Array.from({ length: 6 }, (_, i) => ({
        id: `team-${i + 1}`,
        user: { id: 'player1', username: 'Player 1' },
        sessionId: 'session1',
        pokemonId: i + 1,
        name: `Pokemon ${i + 1}`,
        image: `pokemon-${i + 1}.png`,
        routeName: `Route ${i + 1}`,
        status: 'CAUGHT' as const,
        location: 'TEAM' as const,
        position: i,
      }));

      const pokemon: Pokemon = {
        id: 'box-1',
        user: { id: 'player1', username: 'Player 1' },
        sessionId: 'session1',
        pokemonId: 7,
        name: 'Pokemon 7',
        image: 'pokemon-7.png',
        routeName: 'Route 7',
        status: 'CAUGHT',
        location: 'BOX',
        position: 1,
      };

      const result = PokemonValidationManager.canMoveToTeam('box-1', [...fullTeam, pokemon]);
      expect(result.canMove).toBe(false);
      expect(result.reason).toBe('Team is full');
    });

    it('should prevent moving Pokemon already in team', () => {
      const pokemon: Pokemon = {
        id: '1',
        user: { id: 'player1', username: 'Player 1' },
        sessionId: 'session1',
        pokemonId: 1,
        name: 'Bulbasaur',
        image: 'bulbasaur.png',
        routeName: 'Route 1',
        status: 'CAUGHT',
        location: 'TEAM',
        position: 1,
      };

      const result = PokemonValidationManager.canMoveToTeam('1', [pokemon]);
      expect(result.canMove).toBe(false);
      expect(result.reason).toBe('Pokemon is already in team');
    });

    it('should return error for non-existent Pokemon', () => {
      const result = PokemonValidationManager.canMoveToTeam('999', []);
      expect(result.canMove).toBe(false);
      expect(result.reason).toBe('Pokemon not found');
    });
  });

  describe('isPokemonValid', () => {
    it('should validate Pokemon with correct data', () => {
      const pokemon: Pokemon = {
        id: '1',
        user: { id: 'player1', username: 'Player 1' },
        sessionId: 'session1',
        pokemonId: 1,
        name: 'Bulbasaur',
        image: 'bulbasaur.png',
        routeName: 'Route 1',
        status: 'CAUGHT',
        location: 'TEAM',
        position: 1,
      };

      const result = PokemonValidationManager.isPokemonValid(
        pokemon,
        [pokemon],
        ['player1']
      );

      expect(result).toBe(true);
    });

    it('should reject Pokemon with invalid team position', () => {
      const pokemon: Pokemon = {
        id: '1',
        user: { id: 'player1', username: 'Player 1' },
        sessionId: 'session1',
        pokemonId: 1,
        name: 'Bulbasaur',
        image: 'bulbasaur.png',
        routeName: 'Route 1',
        status: 'CAUGHT',
        location: 'TEAM',
        position: 7, // Invalid position
      };

      const result = PokemonValidationManager.isPokemonValid(
        pokemon,
        [pokemon],
        ['player1']
      );

      expect(result).toBe(false);
    });

    it('should reject Pokemon with invalid box position', () => {
      const pokemon: Pokemon = {
        id: '1',
        user: { id: 'player1', username: 'Player 1' },
        sessionId: 'session1',
        pokemonId: 1,
        name: 'Bulbasaur',
        image: 'bulbasaur.png',
        routeName: 'Route 1',
        status: 'CAUGHT',
        location: 'BOX',
        position: -1, // Invalid position (negative)
      };

      const result = PokemonValidationManager.isPokemonValid(
        pokemon,
        [pokemon],
        ['player1']
      );

      expect(result).toBe(false);
    });

    it('should reject Pokemon with duplicate position', () => {
      const pokemon1: Pokemon = {
        id: '1',
        user: { id: 'player1', username: 'Player 1' },
        sessionId: 'session1',
        pokemonId: 1,
        name: 'Bulbasaur',
        image: 'bulbasaur.png',
        routeName: 'Route 1',
        status: 'CAUGHT',
        location: 'TEAM',
        position: 1,
      };

      const pokemon2: Pokemon = {
        id: '2',
        user: { id: 'player1', username: 'Player 1' },
        sessionId: 'session1',
        pokemonId: 2,
        name: 'Ivysaur',
        image: 'ivysaur.png',
        routeName: 'Route 2',
        status: 'CAUGHT',
        location: 'TEAM',
        position: 1, // Same position
      };

      const result = PokemonValidationManager.isPokemonValid(
        pokemon2,
        [pokemon1, pokemon2],
        ['player1']
      );

      expect(result).toBe(false);
    });

    it('should reject Pokemon with user not in session', () => {
      const pokemon: Pokemon = {
        id: '1',
        user: { id: 'player1', username: 'Player 1' },
        sessionId: 'session1',
        pokemonId: 1,
        name: 'Bulbasaur',
        image: 'bulbasaur.png',
        routeName: 'Route 1',
        status: 'CAUGHT',
        location: 'TEAM',
        position: 1,
      };

      const result = PokemonValidationManager.isPokemonValid(
        pokemon,
        [pokemon],
        ['player2'] // Different user
      );

      expect(result).toBe(false);
    });
  });
});
