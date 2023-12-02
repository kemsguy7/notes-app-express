"use strict";
// routes/users.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.route('/').post().get(user_1.findAll);
//router.route('/').post(authenticate, createUser).get(findAll);
//router.route('/:id').get(authenticate, findOne).patch(authenticate, updateUser).delete(authenticate, deleteUser);
router.route('/:id').get(user_1.findSingle).patch(user_1.updateUser).delete(user_1.deleteUser);
router.post('/signup', user_1.signup);
router.post('/login', user_1.login);
exports.default = router;
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
