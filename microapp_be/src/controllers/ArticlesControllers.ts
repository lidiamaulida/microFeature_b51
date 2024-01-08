import { Request, Response } from "express";
import ArticlesService from "../services/ArticlesService";
import { createArticleSchema } from "../utils/validator/ArticleValidator";
import cloudinary from "../libs/cloudinary";

export default new class ArticleControllers {
    async getAll(req: Request, res: Response){
        try {
            const response = await ArticlesService.gettAllARticle()

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async getOneById(req: Request, res: Response){
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID provided", error: "Invalid input for type number" });
            }

            const response = await ArticlesService.getOneById(id)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async createArticle(req: Request, res: Response) {
        try {
          const loginSessions = res.locals.loginSession
          const data = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            image: res.locals.filename
          }
          
          const { error, value } = createArticleSchema.validate(data)
          if (error) return res.status(400).json(error.details[0].message)
          
          cloudinary.upload()
          const clouninaryRes = await cloudinary.destination(value.image)

          const obj = {
            title: value.title,
            description: value.description,
            date: value.date,
            author: value.author,
            image: clouninaryRes.secure_url,
            user: {
              id: loginSessions.obj.id
            }
          }
          
          const response = await ArticlesService.createArticle(obj);

          return res.status(201).json(response);
        } catch (error) {
          return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }

    async update(req: Request, res: Response) {
      try {
          const loginSessions = res.locals.loginSession
          const id = req.params.id;
          const data = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            image: res.locals.filename
          }

          const { error, value } = createArticleSchema.validate(data)
          if (error) return res.status(400).json(error.details[0].message)

          const obj = {
            ...value,
            user: {
              id: loginSessions.obj.id
            }
          }
          const response = await ArticlesService.update(id, obj);
          return res.status(200).json(response);
      } catch (error) {
          console.error('Error updating article:', error);
          return res.status(500).json({ message: "Internal server error", error: error.message });
      }
   }

   async delete(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const response = await ArticlesService.delete(id);
        return res.status(200).json(response);
    } catch (error) {
        console.error('Error deleting province:', error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

} 