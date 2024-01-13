import express from 'express';
import { fetchAll, createOne, login, getCurrentUser, refreshUserToken } from '../../../controllers/users';
import { auth, isSuperAdmin } from '../../../middlewares/auth';
import { createAccountValidator, loginValidator, refreshUserTokenValidator } from '../../../validations/users';

const router = express.Router();

router.route('/')
  .post(createAccountValidator, createOne)
  .get(auth, isSuperAdmin, fetchAll);

router.post('/login', loginValidator, login);
router.post('/refreshToken', refreshUserTokenValidator, refreshUserToken);
router.get('/current', getCurrentUser);


export default router;
