import { Router } from 'express';
import { authorControllers } from '../controllers/Author';
import { authorValidations } from '../validationSchemas/author.validation';
import { validateRequest } from '../middlewares/validation';

const router = Router();

router.get('/', authorControllers.getAllAuthor);
router.post(
  '/',
  authorValidations.createAuthorValidationSchema,
  validateRequest,
  authorControllers.createAuthor,
);
// Define routes for other author operations

export const authorRoutes = router;
