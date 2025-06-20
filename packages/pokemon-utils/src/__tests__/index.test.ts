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
      playerId: 'player1',
      sessionId: 'session1',
      speciesId: 25, // Pikachu
      routeName: 'Route 1',
      status: 'CAUGHT',
      location: 'TEAM',
      position: 1,
    },
    {
      id: '2',
      playerId: 'player1',
      sessionId: 'session1',
      speciesId: 1, // Bulbasaur
      routeName: 'Route 2',
      status: 'CAUGHT',
      location: 'BOX',
      position: 1,
    },
    {
      id: '3',
      playerId: 'player1',
      sessionId: 'session1',
      speciesId: 4, // Charmander
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
      expect(boxPokemon[0].position).toBe(1);
      expect(boxPokemon[1].position).toBe(2); // Gap filled
    });

    it('should exclude removed Pokemon', () => {
      const result = PokemonPositionManager.reorganizeBoxPositions(
        mockPokemon,
        '2'
      );
      const boxPokemon = result.filter((p) => p.location === 'BOX');

      expect(boxPokemon).toHaveLength(1);
      expect(boxPokemon[0].id).toBe('3');
      expect(boxPokemon[0].position).toBe(1);
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
      expect(result.error).toBe('Team position must be between 1 and 6');
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
      expect(boxPokemon.map((p) => p.position)).toEqual([1, 2, 3]);
    });
  });

  describe('getNextTeamPosition', () => {
    it('should return next available team position', () => {
      const position = PokemonPositionManager.getNextTeamPosition(
        mockPokemon,
        'player1'
      );
      expect(position).toBe(2); // Position 1 is taken
    });

    it('should return null when team is full', () => {
      const fullTeam: Pokemon[] = Array.from({ length: 6 }, (_, i) => ({
        id: `team${i}`,
        playerId: 'player1',
        sessionId: 'session1',
        speciesId: i + 1,
        routeName: `Route ${i}`,
        status: 'CAUGHT',
        location: 'TEAM',
        position: i + 1,
      }));

      const position = PokemonPositionManager.getNextTeamPosition(
        fullTeam,
        'player1'
      );
      expect(position).toBeNull();
    });
  });

  describe('getNextBoxPosition', () => {
    it('should return next box position', () => {
      const position = PokemonPositionManager.getNextBoxPosition(
        mockPokemon,
        'player1'
      );
      expect(position).toBe(4); // Highest box position is 3
    });

    it('should return 1 for empty box', () => {
      const teamOnly = mockPokemon.filter((p) => p.location === 'TEAM');
      const position = PokemonPositionManager.getNextBoxPosition(
        teamOnly,
        'player1'
      );
      expect(position).toBe(1);
    });
  });
});

describe('PokemonValidationManager', () => {
  const mockPokemonData: PokemonData[] = [
    { id: 1, name: 'Bulbasaur', evolution_next: 2 },
    { id: 2, name: 'Ivysaur', evolution_prev: 1, evolution_next: 3 },
    { id: 3, name: 'Venusaur', evolution_prev: 2 },
    { id: 25, name: 'Pikachu', evolution_next: 26 },
    { id: 26, name: 'Raichu', evolution_prev: 25 },
    { id: 150, name: 'Mewtwo' },
  ];

  const mockPokemon: Pokemon[] = [
    {
      id: '1',
      playerId: 'player1',
      sessionId: 'session1',
      speciesId: 25, // Pikachu
      routeName: 'Route 1',
      status: 'CAUGHT',
      location: 'TEAM',
      position: 1,
    },
    {
      id: '2',
      playerId: 'player2',
      sessionId: 'session1',
      speciesId: 1, // Bulbasaur
      routeName: 'Route 1',
      status: 'CAUGHT',
      location: 'TEAM',
      position: 1,
    },
    {
      id: '3',
      playerId: 'player1',
      sessionId: 'session1',
      speciesId: 150, // Mewtwo
      routeName: 'Route 2',
      status: 'DEAD',
      location: 'BOX',
      position: 1,
    },
    {
      id: '4',
      playerId: 'player2',
      sessionId: 'session1',
      speciesId: 4, // Charmander
      routeName: 'Route 2',
      status: 'CAUGHT',
      location: 'BOX',
      position: 1,
    },
  ];

  describe('getEvolutionLine', () => {
    it('should get complete evolution line', () => {
      const line = PokemonValidationManager.getEvolutionLine(
        2,
        mockPokemonData
      ); // Ivysaur
      expect(line.sort()).toEqual([1, 2, 3]); // Bulbasaur, Ivysaur, Venusaur
    });

    it('should handle Pokemon with no evolutions', () => {
      const line = PokemonValidationManager.getEvolutionLine(
        150,
        mockPokemonData
      ); // Mewtwo
      expect(line).toEqual([150]);
    });

    it('should handle missing Pokemon', () => {
      const line = PokemonValidationManager.getEvolutionLine(
        999,
        mockPokemonData
      );
      expect(line).toEqual([999]);
    });

    it('should handle evolution line starting from first form', () => {
      const line = PokemonValidationManager.getEvolutionLine(
        1,
        mockPokemonData
      ); // Bulbasaur
      expect(line.sort()).toEqual([1, 2, 3]);
    });

    it('should handle evolution line starting from final form', () => {
      const line = PokemonValidationManager.getEvolutionLine(
        3,
        mockPokemonData
      ); // Venusaur
      expect(line.sort()).toEqual([1, 2, 3]);
    });
  });

  describe('canCatchSpecies', () => {
    it('should allow catching new species', () => {
      const result = PokemonValidationManager.canCatchSpecies(
        150, // Mewtwo
        'player1',
        'session2', // Different session
        mockPokemon,
        mockPokemonData
      );
      expect(result.canCatch).toBe(true);
    });

    it('should prevent catching evolution of already caught Pokemon', () => {
      const result = PokemonValidationManager.canCatchSpecies(
        26, // Raichu (evolution of already caught Pikachu)
        'player1',
        'session1',
        mockPokemon,
        mockPokemonData
      );
      expect(result.canCatch).toBe(false);
      expect(result.reason).toContain('Pikachu');
    });

    it('should prevent catching pre-evolution of already caught Pokemon', () => {
      const result = PokemonValidationManager.canCatchSpecies(
        2, // Ivysaur (evolution of already caught Bulbasaur by player2)
        'player2',
        'session1',
        mockPokemon,
        mockPokemonData
      );
      expect(result.canCatch).toBe(false);
      expect(result.reason).toContain('Bulbasaur');
    });
  });

  describe('isPokemonValid', () => {
    it('should return true when all players have route link and team Pokemon have linked Pokemon in teams', () => {
      // Pokemon 1 and 2 are both on Route 1, both in teams
      const pokemon1 = mockPokemon.find((p) => p.id === '1')!;
      const sessionPlayerIds = ['player1', 'player2']; // Two players in session
      const result = PokemonValidationManager.isPokemonValid(
        pokemon1,
        mockPokemon,
        sessionPlayerIds
      );
      expect(result).toBe(true);
    });

    it('should return false when not all players have a Pokemon on the route', () => {
      // Create scenario where only player1 has Route 3 Pokemon
      const incompleteLinkPokemon: Pokemon[] = [
        ...mockPokemon,
        {
          id: '7',
          playerId: 'player1',
          sessionId: 'session1',
          speciesId: 25,
          routeName: 'Route 3',
          status: 'CAUGHT',
          location: 'BOX',
          position: 3,
        },
      ];

      const pokemon7 = incompleteLinkPokemon.find((p) => p.id === '7')!;
      const threePlayerSession = ['player1', 'player2', 'player3']; // Three players but only player1 has Route 3
      const result = PokemonValidationManager.isPokemonValid(
        pokemon7,
        incompleteLinkPokemon,
        threePlayerSession
      );
      expect(result).toBe(false);
    });

    it('should return false when Pokemon is in team but linked Pokemon are in box', () => {
      // Pokemon 1 is in team but Pokemon 2 (linked) is in box
      const mixedLocationPokemon: Pokemon[] = mockPokemon.map((p) =>
        p.id === '2' ? { ...p, location: 'BOX' as const } : p
      );

      const pokemon1 = mixedLocationPokemon.find((p) => p.id === '1')!;
      const sessionPlayerIds = ['player1', 'player2'];
      const result = PokemonValidationManager.isPokemonValid(
        pokemon1,
        mixedLocationPokemon,
        sessionPlayerIds
      );
      expect(result).toBe(false);
    });

    it('should return true when Pokemon is in box regardless of linked Pokemon locations', () => {
      // Pokemon 3 is in box, linked Pokemon 4 can be anywhere
      const pokemon3 = mockPokemon.find((p) => p.id === '3')!;
      const sessionPlayerIds = ['player1', 'player2'];
      const result = PokemonValidationManager.isPokemonValid(
        pokemon3,
        mockPokemon,
        sessionPlayerIds
      );
      expect(result).toBe(true);
    });

    // Edge case tests
    describe('Edge Cases', () => {
      describe('isPokemonValid - First Pokemon caught scenario', () => {
        it('should return false when player catches the very first Pokemon of the session', () => {
          // Real edge case: Completely empty session, first Pokemon ever caught
          const firstPokemonEver: Pokemon[] = [
            {
              id: '1',
              playerId: 'player1',
              sessionId: 'session1',
              speciesId: 1,
              routeName: 'Route 1',
              status: 'CAUGHT',
              location: 'BOX',
              position: 1,
            },
          ];

          const pokemon1 = firstPokemonEver.find((p) => p.id === '1')!;
          // Session has 3 players but only player1 has caught Pokemon
          const threePlayerSession = ['player1', 'player2', 'player3'];
          const result = PokemonValidationManager.isPokemonValid(
            pokemon1,
            firstPokemonEver,
            threePlayerSession
          );

          // Now this correctly returns false because not all players have Route 1 Pokemon
          expect(result).toBe(false);
        });

        it('should show the bug was fixed - now works correctly with session player info', () => {
          // This test shows that with proper session player info, the function works correctly
          const firstPokemonEver: Pokemon[] = [
            {
              id: '1',
              playerId: 'player1',
              sessionId: 'session1',
              speciesId: 1,
              routeName: 'Route 1',
              status: 'CAUGHT',
              location: 'BOX',
              position: 1,
            },
          ];

          const pokemon1 = firstPokemonEver.find((p) => p.id === '1')!;

          // Test 1: If only 1 player in session, it should be valid
          const onePlayerSession = ['player1'];
          const resultOne = PokemonValidationManager.isPokemonValid(
            pokemon1,
            firstPokemonEver,
            onePlayerSession
          );
          expect(resultOne).toBe(true); // Valid because all players (just player1) have Route 1 Pokemon

          // Test 2: If 3 players in session, it should be invalid
          const threePlayerSession = ['player1', 'player2', 'player3'];
          const resultThree = PokemonValidationManager.isPokemonValid(
            pokemon1,
            firstPokemonEver,
            threePlayerSession
          );
          expect(resultThree).toBe(false); // Invalid because player2 and player3 don't have Route 1 Pokemon
        });
      });
    });
  });

  describe('canMoveToTeam', () => {
    it('should prevent moving dead Pokemon to team', () => {
      const result = PokemonValidationManager.canMoveToTeam('3', mockPokemon);
      expect(result.canMove).toBe(false);
      expect(result.reason).toBe('Dead Pokemon cannot be moved to team');
    });

    it('should prevent moving Pokemon linked to dead Pokemon to team', () => {
      const result = PokemonValidationManager.canMoveToTeam('4', mockPokemon);
      expect(result.canMove).toBe(false);
      expect(result.reason).toBe('Pokemon is linked to a dead Pokemon');
    });

    it('should allow moving valid Pokemon to team', () => {
      const result = PokemonValidationManager.canMoveToTeam('1', mockPokemon);
      expect(result.canMove).toBe(true);
    });
  });

  describe('isLinkedToDead', () => {
    it('should detect link to dead Pokemon', () => {
      const pokemon4 = mockPokemon.find((p) => p.id === '4')!;
      const result = PokemonValidationManager.isLinkedToDead(
        pokemon4,
        mockPokemon
      );
      expect(result).toBe(true);
    });

    it('should return false for Pokemon not linked to dead', () => {
      const pokemon1 = mockPokemon.find((p) => p.id === '1')!;
      const result = PokemonValidationManager.isLinkedToDead(
        pokemon1,
        mockPokemon
      );
      expect(result).toBe(false);
    });
  });

  describe('getLinkedPokemon', () => {
    it('should find Pokemon on same route', () => {
      const pokemon1 = mockPokemon.find((p) => p.id === '1')!;
      const linked = PokemonValidationManager.getLinkedPokemon(
        pokemon1,
        mockPokemon
      );

      expect(linked).toHaveLength(1);
      expect(linked[0].id).toBe('2');
    });

    it('should exclude self from linked Pokemon', () => {
      const pokemon1 = mockPokemon.find((p) => p.id === '1')!;
      const linked = PokemonValidationManager.getLinkedPokemon(
        pokemon1,
        mockPokemon
      );

      expect(linked.every((p) => p.id !== '1')).toBe(true);
    });
  });

  describe('isTeamValid', () => {
    it('should return true when all team Pokemon have linked Pokemon in teams', () => {
      const result = PokemonValidationManager.isTeamValid(
        'player1',
        mockPokemon
      );
      expect(result).toBe(true); // Pokemon 1's linked Pokemon (2) is also in team
    });

    it('should return false when linked Pokemon not in team', () => {
      const modifiedPokemon = mockPokemon.map((p) =>
        p.id === '2' ? { ...p, location: 'BOX' as const } : p
      );

      const result = PokemonValidationManager.isTeamValid(
        'player1',
        modifiedPokemon
      );
      expect(result).toBe(false);
    });
  });

  describe('canCatchSpecies', () => {
    it('should allow catching new species', () => {
      const result = PokemonValidationManager.canCatchSpecies(
        150, // Mewtwo
        'player1',
        'session2', // Different session
        mockPokemon,
        mockPokemonData
      );
      expect(result.canCatch).toBe(true);
    });

    it('should prevent catching evolution of already caught Pokemon', () => {
      const result = PokemonValidationManager.canCatchSpecies(
        26, // Raichu (evolution of already caught Pikachu)
        'player1',
        'session1',
        mockPokemon,
        mockPokemonData
      );
      expect(result.canCatch).toBe(false);
      expect(result.reason).toContain('Pikachu');
    });

    it('should prevent catching pre-evolution of already caught Pokemon', () => {
      const result = PokemonValidationManager.canCatchSpecies(
        2, // Ivysaur (evolution of already caught Bulbasaur by player2)
        'player2',
        'session1',
        mockPokemon,
        mockPokemonData
      );
      expect(result.canCatch).toBe(false);
      expect(result.reason).toContain('Bulbasaur');
    });

    // Edge case tests
    describe('Edge Cases', () => {
      describe('canCatchSpecies - Dead Pokemon blocking', () => {
        it('should prevent catching evolution of dead Pokemon', () => {
          const deadPokemonScenario: Pokemon[] = [
            {
              id: '1',
              playerId: 'player1',
              sessionId: 'session1',
              speciesId: 1, // Bulbasaur
              routeName: 'Route 1',
              status: 'DEAD', // Dead, not caught
              location: 'BOX',
              position: 1,
            },
          ];

          // Try to catch Ivysaur (evolution of dead Bulbasaur)
          const result = PokemonValidationManager.canCatchSpecies(
            2, // Ivysaur
            'player1',
            'session1',
            deadPokemonScenario,
            mockPokemonData
          );
          expect(result.canCatch).toBe(false);
          expect(result.reason).toContain('Evolution line already caught');
        });

        it('should prevent catching pre-evolution of dead Pokemon', () => {
          const deadPokemonScenario: Pokemon[] = [
            {
              id: '1',
              playerId: 'player1',
              sessionId: 'session1',
              speciesId: 3, // Venusaur
              routeName: 'Route 1',
              status: 'DEAD', // Dead, not caught
              location: 'BOX',
              position: 1,
            },
          ];

          // Try to catch Bulbasaur (pre-evolution of dead Venusaur)
          const result = PokemonValidationManager.canCatchSpecies(
            1, // Bulbasaur
            'player1',
            'session1',
            deadPokemonScenario,
            mockPokemonData
          );
          expect(result.canCatch).toBe(false);
          expect(result.reason).toContain('Evolution line already caught');
        });

        it('should allow catching new evolution line when previous line has dead Pokemon', () => {
          const deadPokemonScenario: Pokemon[] = [
            {
              id: '1',
              playerId: 'player1',
              sessionId: 'session1',
              speciesId: 1, // Bulbasaur (dead)
              routeName: 'Route 1',
              status: 'DEAD',
              location: 'BOX',
              position: 1,
            },
          ];

          // Try to catch Charmander (different evolution line)
          const result = PokemonValidationManager.canCatchSpecies(
            4, // Charmander
            'player1',
            'session1',
            deadPokemonScenario,
            mockPokemonData
          );
          expect(result.canCatch).toBe(true);
        });
      });
    });
  });
});
