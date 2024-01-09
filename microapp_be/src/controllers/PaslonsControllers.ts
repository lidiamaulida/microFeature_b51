import { Request, Response } from "express"
import PaslonsService from "../services/PaslonsService"
import { createPaslonSchema } from "../utils/validator/PalonsValidator"
import cloudinary from "../libs/cloudinary"

export default new class PaslonsControllers {
    async getAll(req: Request, res: Response){
        try {
            const response = await PaslonsService.getAllPaslons()

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

            const response = await PaslonsService.getOneById(id)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async createPaslon(req: Request, res: Response) {
        try {
          const data = {
            name: req.body.name,
            nomorUrut: req.body.nomorUrut,
            visionAndMission: req.body.visionAndMission,
            koalisi: req.body.koalisi,
            image: res.locals.filename
          }
          
          const { error, value } = createPaslonSchema.validate(data)
          if (error) return res.status(400).json(error.details[0].message)
          
          cloudinary.upload()
          const clouninaryRes = await cloudinary.destination(value.image)
          

          const obj = {
            name: value.name,
            nomorUrut: value.nomorUrut,
            visionAndMission: value.visionAndMission,
            koalisi: value.koalisi,
            image: clouninaryRes.secure_url
          }
          
          const response = await PaslonsService.createPaslon(obj);

          return res.status(201).json(response);
        } catch (error) {
          return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }

    async update(req: Request, res: Response) {
      try {
          const id = req.params.id;
          const data = {
            name: req.body.name,
            nomorUrut: req.body.nomorUrut,
            visionAndMission: req.body.visionAndMission,
            koalisi: req.body.koalisi,
            image: res.locals.filename
          }
          
          const response = await PaslonsService.update(id, data);
          return res.status(200).json(response);
      } catch (error) {
          console.error('Error updating province:', error);
          return res.status(500).json({ message: "Internal server error", error: error.message });
      }
    }

    async delete(req: Request, res: Response) {
      try {
          const id = req.params.id;
          const response = await PaslonsService.delete(id);
          return res.status(200).json(response);
      } catch (error) {
          console.error('Error deleting paslon:', error);
          return res.status(500).json({ message: "Internal server error", error: error.message });
      }
  }
}