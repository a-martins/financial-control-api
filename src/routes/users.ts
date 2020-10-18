import express from 'express'
import UserControler from '../controllers/UserController'

const routes = express.Router();

const userControler = new UserControler()

routes.post('/', userControler.create)

export default routes;