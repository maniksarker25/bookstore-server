import { Router } from 'express';
import { validateRequest } from '../middlewares/validation';
import { bookControllers } from '../controllers/Book';
import { bookValidations } from '../validationSchemas/book.validation';

const router = Router();

router.get('/', bookControllers.getAllBook);
router.get('/:id', bookControllers.getSingleBook);
router.post(
  '/',
  bookValidations.createBookValidationSchema,
  validateRequest,
  bookControllers.createBook,
);
router.put(
  '/:id',
  bookValidations.updateBookValidationSchema,
  validateRequest,
  bookControllers.updateBook,
);
router.delete('/:id', bookControllers.deleteBook);

export const bookRoutes = router;
