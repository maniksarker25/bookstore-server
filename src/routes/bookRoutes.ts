import { Router } from 'express';
import { validateRequest } from '../middlewares/validation';
import { bookControllers } from '../controllers/Book';
import { bookValidations } from '../validationSchemas/book.validation';
import auth from '../middlewares/auth';

const router = Router();

router.get('/', auth(), bookControllers.getAllBook);
router.get('/:id', bookControllers.getSingleBook);
router.get('/author/:id', bookControllers.getBooksForSpecificAuthor);
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
