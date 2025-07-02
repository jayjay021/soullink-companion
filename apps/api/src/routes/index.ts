import { Router } from 'express';
import v1Routes from './v1';

const router: Router = Router();

// Health check endpoint (not versioned)
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// Mount v1 routes
router.use('/v1', v1Routes);

export default router;
