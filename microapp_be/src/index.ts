import { AppDataSource } from "./data-source"
import * as express from "express"
import 'dotenv/config'
import * as cors from "cors"
import routes from "./route/indexRout"

AppDataSource.initialize()
    .then(async () => {
        const app = express()
        
        app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
        }))
        app.use(express.json())
        app.use('/api/v1', routes)

        app.listen(process.env.PORT, () => console.log(`server runing on port : ${process.env.PORT}`))
    })
    .catch(error => console.log(error))
