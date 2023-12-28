import { Request, Response } from "express";
import ArticlesService from "../services/ArticlesService";

export default new class ArticleControllers {
    async getAll(req: Request, res: Response){
        try {
            const response = await ArticlesService.gettAllARticle()

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
} 