import { Router } from 'express';
import { authorControllers } from '../controllers/Author';
import { authorValidations } from '../validationSchemas/author.validation';
import { validateRequest } from '../middlewares/validation';
import auth from '../middlewares/auth';

const router = Router();

router.get('/', authorControllers.getAllAuthor);
router.get('/:id', authorControllers.getSingleAuthor);
router.post(
  '/',
  auth(),
  authorValidations.createAuthorValidationSchema,
  validateRequest,
  authorControllers.createAuthor,
);
router.put(
  '/:id',
  auth(),
  authorValidations.updateAuthorValidationSchema,
  validateRequest,
  authorControllers.updateAuthor,
);
router.delete('/:id', auth(), authorControllers.deleteAuthor);

export const authorRoutes = router;
