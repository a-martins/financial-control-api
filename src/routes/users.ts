import express from 'express'
import UserControler from '../controllers/UserController'
import { check } from 'express-validator'

const routes = express.Router();

const userControler = new UserControler()

routes.post('/', [
    check('email', 'Please add email').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('firstName', 'Please add first name').not().isEmpty(),
    check('lastName', 'Please add last name').not().isEmpty(),
    check('password', 'Please add password').not().isEmpty(),
    check('password', 'Please enter a password with 6 or more characteres').isLength({ min: 6 })
], userControler.create)

export default routes;