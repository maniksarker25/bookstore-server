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
router.put(
  '/:id',
  authorValidations.updateAuthorValidationSchema,
  validateRequest,
  authorControllers.updateAuthor,
);
router.delete('/:id', authorControllers.deleteAuthor);

export const authorRoutes = router;
