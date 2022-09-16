import express from 'express';
import { addPurchase } from './../controllers/purchase.js';

const router = express.Router();

router.post("/add", addPurchase);


export default router;