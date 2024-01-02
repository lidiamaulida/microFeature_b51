import { Request, Response } from "express"
import PartaiService from "../services/PartaiService";
import { createPartaiSchema } from "../utils/validator/PartaiValidator";
import cloudinary from "../libs/cloudinary";

export default new class PartaiController {
    async getAll(req: Request, res: Response){
        try {
            const response = await PartaiService.getAllPartai()

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

            const response = await PartaiService.getOneById(id)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async createPartai(req: Request, res: Response) {
        try {
          const data = {
            name: req.body.name,
            ketuaUmum: req.body.ketuaUmum,
            visiMisi: req.body.visiMisi,
            alamat: req.body.alamat,
            image: res.locals.filename
          }
          
          const { error, value } = createPartaiSchema.validate(data)
          if (error) return res.status(400).json(error.details[0].message)
          
          cloudinary.upload()
          const clouninaryRes = await cloudinary.destination(value.image)

          const obj = {
            name: value.name,
            ketuaUmum: value.ketuaUmum,
            visiMisi: value.visiMisi,
            alamat: value.alamat,
            image: clouninaryRes.secure_url
          }
          
          const response = await PartaiService.createPartai(obj);

          return res.status(201).json(response);
        } catch (error) {
          return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }
}