import { Request, Response } from "express"
import VotersService from "../services/VotersService"
import { createVotersSchema } from "../utils/validator/VotersValidator"

export default new class VotersControllers {
    async getAll(req: Request, res: Response){
        try {
            const response = await VotersService.getAllVoters()

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

            const response = await VotersService.getOneById(id)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async createVoters(req: Request, res: Response) {
        try {
          const data = {
            name: req.body.name,
            alamat: req.body.alamat,
            jenisKelamin: req.body.jenisKelamin,
            paslon: req.body.paslon,
          }
          
          const { error, value } = createVotersSchema.validate(data)
          if (error) return res.status(400).json(error.details[0].message)
          
          
          const response = await VotersService.createVoter(value);

          return res.status(201).json(response);
        } catch (error) {
          return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }
}