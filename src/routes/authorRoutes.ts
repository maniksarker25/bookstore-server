import { Router } from 'express';
import { authorControllers } from '../controllers/Author';

const router = Router();

router.get('/', authorControllers.getAllAuthor);
router.post('/', authorControllers.createAuthor);
// Define routes for other author operations

export const authorRoutes = router;
