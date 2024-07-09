import { Router } from 'express';
import { authorValidations } from '../validationSchemas/author.validation';
import { validateRequest } from '../middlewares/validation';
import { bookControllers } from '../controllers/Book';
import { bookValidations } from '../validationSchemas/book.validation';

const router = Router();

router.get('/', bookControllers.getAllBook);
router.post(
  '/',
  bookValidations.createBookValidationSchema,
  validateRequest,
  bookControllers.createBook,
);
router.put(
  '/:id',
  authorValidations.updateAuthorValidationSchema,
  validateRequest,
  bookControllers.updateBook,
);
router.delete('/:id', bookControllers.deleteBook);

export const bookRoutes = router;
