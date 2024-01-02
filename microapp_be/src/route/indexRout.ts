import * as express from "express"
import ArticlesController from "../controllers/ArticlesController"
import UploadFile from "../middlewares/UploadFile"
import PaslonsControllers from "../controllers/PaslonsControllers"
import PartaiController from "../controllers/PartaiController"
import VotersControllers from "../controllers/VotersControllers"

const routes = express.Router()

//articles
routes.get("/articles", ArticlesController.getAll)
routes.get("/article/:id", ArticlesController.getOneById)
routes.post("/article",UploadFile.upload("image"), ArticlesController.createArticle)

//paslons
routes.get("/paslons", PaslonsControllers.getAll)
routes.get("/paslon/:id", PaslonsControllers.getOneById)
routes.post("/paslon",UploadFile.upload("image"), PaslonsControllers.createPaslon)

//partai
routes.get("/partai", PartaiController.getAll)
routes.get("/partai/:id", PartaiController.getOneById)
routes.post("/partai",UploadFile.upload("image"), PartaiController.createPartai)

//voters
routes.get("/voters", VotersControllers.getAll)
routes.get("/voter/:id", VotersControllers.getOneById)
routes.post("/voter", VotersControllers.createVoters)

export default routes