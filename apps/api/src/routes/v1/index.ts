import { Router } from 'express';
import sessionRoutes from './session';
import pokedexRoutes from './pokedex';

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

export default router;
