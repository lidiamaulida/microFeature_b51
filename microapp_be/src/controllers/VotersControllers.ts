import { Request, Response } from "express";
import { createVotersSchema } from "../utils/validator/VotersValidator";
import VotersService from "../services/VotersService";


export default new class voteController {
    async create(req: Request, res: Response) {
        try {
          const loginSessions = res.locals.loginSession
          const data = {
            paslonId: req.body.paslonId,
          }
          
          const { error, value } = createVotersSchema.validate(data)

          const obj = {
            ...value,
            user: {
              id: loginSessions.obj.id
            }
          }
    
          if(error) return res.status(400).json(error)
    
          const response = await VotersService.create(obj)
          return res.status(201).json(response);
        } catch (error) {
          return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async getAll(req: Request, res: Response) {
      try {
        const response = await VotersService.getAllVote();
        return res.status(200).json(response);
      } catch (error) {
        console.error('Error while getting all votes:', error);
          return res.status(500).json({ message: "Internal server error", error: error.message });
        }
      }

    async getOne(req: Request, res: Response) {
      try {
        const id = parseInt(req.params.id, 10);
        const response = await VotersService.getOne(id);
        return res.status(200).json(response);
      } catch (error) {
        console.error("Error getting a Vote:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}