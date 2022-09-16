import express from 'express';
import { removeRole, checkForm, editRole, addRole, allRole } from '../controllers/role.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/all', auth, allRole); //admin
router.post('/add', auth, addRole); //admin
router.get('/:mode/:roleID?', auth, checkForm); //admin
router.patch('/edit/:roleID', auth, editRole); //admin
router.delete('/remove/:roleID',auth, removeRole); //admin


export default router;