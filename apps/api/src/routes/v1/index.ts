import { Router } from 'express';
import sessionRoutes from '../../modules/session/session.routes';
import pokedexRoutes from '../../modules/pokedex/pokedex.routes';
import pokemonRoutes from '../../modules/pokemon/pokemon.routes';
import userRoutes from '../../modules/user/user.routes';

const router: Router = Router();

// Welcome endpoint for v1
router.get('/', (req, res) => {
  res.json({
    message: 'SoulLink Companion API v1',
    version: '1.0.0',
    endpoints: {
      docs: '/api-docs',
    },
  });
});

// Resource routes
router.use('/session', sessionRoutes);
router.use('/pokedex', pokedexRoutes);
router.use('/pokemon', pokemonRoutes);
router.use('/users', userRoutes);

export default router;
