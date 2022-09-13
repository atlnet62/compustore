import express from 'express';
import { removeCategory, checkForm, editCategory, addCategory, allCategory } from '../controllers/category.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/all', allCategory); //user + admin
router.post('/add', auth, addCategory); //admin
router.get('/:mode/:categoryID?', auth, checkForm); //admin
router.patch('/edit/:categoryID', auth, editCategory); //admin
router.delete('/remove/:categoryID', auth, removeCategory); //admin


export default router;