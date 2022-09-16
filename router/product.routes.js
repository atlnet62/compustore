import express from 'express';
import { selectProduct, checkForm, removeProduct, editProduct, addProduct, allProduct, selectProductByCategory, addImage } from '../controllers/product.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/all', allProduct); // visitor + user + admin
router.get("/search/:title", selectProduct); //visitor + user + admin
router.get('/filter/:categoryID', auth,selectProductByCategory);
router.post('/add', auth,addProduct); //admin
router.get('/:mode/:productID?', auth,checkForm); //admin
router.patch('/edit/:productID', auth,editProduct); //admin
router.delete('/remove/:productID', auth,removeProduct); //admin
router.post("/image/add", auth,addImage); //admin


export default router;