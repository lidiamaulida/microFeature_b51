import * as express from "express"
import ArticlesController from "../controllers/ArticlesControllers"
import UploadFile from "../middlewares/UploadFile"
import PaslonsControllers from "../controllers/PaslonsControllers"
import PartaiController from "../controllers/PartaiControllers"
import VotersControllers from "../controllers/VotersControllers"
import AuthControllers from "../controllers/AuthControllers"
import AuthMiddleware from "../middlewares/Auth"

const routes = express.Router()

//articles
routes.get("/articles", AuthMiddleware.Auth, ArticlesController.getAll)
routes.get("/article/:id", AuthMiddleware.Auth, ArticlesController.getOneById)
routes.post("/article", AuthMiddleware.Auth, UploadFile.upload("image"), ArticlesController.createArticle)
routes.patch("/article/:id", AuthMiddleware.Auth, UploadFile.upload("image"), ArticlesController.update)
routes.delete("/article/:id", AuthMiddleware.Auth, ArticlesController.delete)

//paslons
routes.get("/paslons", AuthMiddleware.Auth, PaslonsControllers.getAll)
routes.get("/paslon/:id", AuthMiddleware.Auth, PaslonsControllers.getOneById)
routes.post("/paslon", AuthMiddleware.Auth, UploadFile.upload("image"), PaslonsControllers.createPaslon)
routes.patch("/paslon/:id", AuthMiddleware.Auth, UploadFile.upload("image"), PaslonsControllers.update)
routes.delete("/paslon/:id", AuthMiddleware.Auth, PaslonsControllers.delete)

//partai
routes.get("/partai", AuthMiddleware.Auth, PartaiController.getAll)
routes.get("/partai/:id", AuthMiddleware.Auth, PartaiController.getOneById)
routes.post("/partai", AuthMiddleware.Auth, UploadFile.upload("image"), PartaiController.createPartai)
routes.patch("/partai/:id", AuthMiddleware.Auth, UploadFile.upload("image"), PartaiController.update)
routes.delete("/partai/:id", AuthMiddleware.Auth, PartaiController.delete)

//voters
routes.get("/voters", AuthMiddleware.Auth, VotersControllers.getAll)
routes.get("/voter/:id", AuthMiddleware.Auth, VotersControllers.getOne)
routes.post("/voter", AuthMiddleware.Auth, VotersControllers.create)

//auth
routes.post("/auth/register", AuthControllers.register)
routes.post("/auth/login", AuthControllers.login)
routes.get("/auth", AuthControllers.getAll)
routes.get("/auth/:id", AuthControllers.getOne)

export default routes