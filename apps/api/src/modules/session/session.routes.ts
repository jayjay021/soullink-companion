import { Router } from 'express';
import {
  createSession,
  deleteSession,
  getSession,
  joinSession,
  listSessions,
  updateSession,
} from './session.controller';

const router: Router = Router();

router.get('/', listSessions);
router.post('/', createSession);
router.get('/:sessionId', getSession);
router.put('/:sessionId', updateSession);
router.delete('/:sessionId', deleteSession);
router.post('/:sessionId/join', joinSession);

export default router;
