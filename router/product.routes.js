import express from 'express';
import { selectProduct, checkForm, removeProduct, editProduct, addProduct, allProduct, selectProductByCategory } from '../controllers/product.js';
// import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/all', allProduct); // visitor + user + admin
router.get("/search/:title", selectProduct); //visitor + user + admin
router.get('/filter/:categoryID', selectProductByCategory);
router.post('/add', addProduct); //admin
router.get('/:mode/:productID?', checkForm); //admin
router.patch('/edit/:productID', editProduct); //admin
router.delete('/remove/:productID', removeProduct); //admin


export default router;