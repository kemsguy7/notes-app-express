// routes/users.ts

import { Router } from 'express';
import { findSingle, updateUser, deleteUser, findAll, login, signup} from '../controllers/user';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.route('/').post().get(findAll);
//router.route('/').post(authenticate, createUser).get(findAll);

//router.route('/:id').get(authenticate, findOne).patch(authenticate, updateUser).delete(authenticate, deleteUser);

router.route('/:id').get(findSingle).patch(updateUser).delete(deleteUser);

router.post('/signup', signup);
router.post('/login', login);

export default router;

/*
import { Router } from 'express';
import { createUser, findOne, updateUser, deleteUser, findAll, loginUser, signupUser } from '../controllers/user';

const router = Router();

router.route('/').post(createUser).get(findAll);

router.route('/signup').post(signupUser); // Add signup route
router.route('/login').post(loginUser);   // Add login route

router.route('/:id').get(findOne).patch(updateUser).delete(deleteUser);

export default router;

*/