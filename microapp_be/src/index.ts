import { AppDataSource } from "./data-source"
import * as express from "express"
import 'dotenv/config'
import routes from "./route"

AppDataSource.initialize()
    .then(async () => {
        const app = express()
        
        app.use(express.json())
        app.use('/api/v1', routes)

        app.listen(process.env.PORT, () => console.log(`server runing on port : ${process.env.PORT}`))
    })
    .catch(error => console.log(error))
