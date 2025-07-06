import { Router } from 'express';
import * as pokemonController from './pokemon.controller';

const router: Router = Router();

// List/filter Pokémon
router.get('/:sessionId', pokemonController.listPokemon);
// Add a Pokémon
router.post('/:sessionId', pokemonController.addPokemon);
// Swap two Pokémon positions
router.post('/:sessionId/swap', pokemonController.swapPokemon);
// Update a Pokémon
router.patch('/:sessionId/:id', pokemonController.updatePokemon);
// get unique list of route names
router.get('/:sessionId/routes', pokemonController.getRoutes);

export default router;
