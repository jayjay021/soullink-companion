import { Router } from 'express';
import * as pokemonController from '../../controllers/pokemonController';

const router: Router = Router();

// List/filter Pokémon
router.get('/:sessionId', pokemonController.listPokemon);
// Add a Pokémon
router.post('/:sessionId', pokemonController.addPokemon);
// Update a Pokémon
router.patch('/:sessionId/:id', pokemonController.updatePokemon);
// get unique list of route names
router.get('/:sessionId/routes', pokemonController.getRoutes);

export default router;
