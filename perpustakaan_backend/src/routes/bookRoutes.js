import express from 'express';
import { listBooks } from '../controllers/bookController.js';

const router = express.Router();

router.get('/list-book', listBooks);

export default router;