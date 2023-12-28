import * as express from "express"
import ArticlesController from "../controllers/ArticlesController"

const routes = express.Router()

//articles
routes.get("/articles", ArticlesController.getAll)

export default routes