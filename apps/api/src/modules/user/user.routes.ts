import { Router } from 'express';
import { createUser, getUserById, updateUser } from './user.controller';

const router: Router = Router();

router.post('/', createUser);
router.get('/:userId', getUserById);
router.put('/:userId', updateUser);

export default router; 