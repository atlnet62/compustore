import express from 'express';
import { signup, signin, selectUser, removeUser, checkForm, editUser, addUser, allUser } from '../controllers/user.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/checkToken', auth, selectUser); 

router.get('/all', auth, allUser); //admin
router.post('/add', auth, addUser); //admin
router.get('/:mode/:userUUID?', auth, checkForm); //user + admin
router.patch('/edit/:userUUID', auth, editUser); //user + admin
router.delete('/remove/:userUUID', auth, removeUser); //admin


export default router;

// userUUID = exit to separe the user to delete and the user connected (request.params.uuid !== request.params.userUUID)