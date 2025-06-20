import { Router } from 'express';

const router: Router = Router();

// Welcome endpoint for v1
router.get('/', (req, res) => {
  res.json({
    message: 'SoulLink Companion API v1',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      docs: '/api-docs',
    },
  });
});

// Future resource routes will be mounted here
// Example: router.use('/games', gameRoutes);

export default router;
