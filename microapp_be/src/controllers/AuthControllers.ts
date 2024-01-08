import { Request, Response } from "express"
import { getOneUserValidation, loginSchema, registerSchema } from "../utils/validator/AuthValidator"
import AuthService from "../services/AuthService"
import Auth from "../middlewares/Auth"

export default new class AuthControllers {
    async register(req: Request, res: Response) {
      try {
        const data = req.body
          
        const { error, value } = registerSchema.validate(data)
        if (error) return res.status(400).json(error.details[0].message)
          
          
        const response = await AuthService.register(value);

        return res.status(201).json(response);
      }catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
    }

    async login(req: Request, res: Response) {
      try {
        const data = req.body

        const { error, value } = loginSchema.validate(data)
        if (error) return res.status(400).json(error.details[0].message)

        const response = await AuthService.login(value);
        return res.status(201).json(response);
      } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
    }

    async getAll(req: Request, res: Response) {
      try {
          const response = await AuthService.getAll();
          return res.status(201).json(response);
      } catch (error) {
          return res.status(500).json(error);
      }
  }

  async getOne(req: Request, res: Response) {
      try {
          const id = parseInt(req.params.id, 10);
          
          const {error, value} = getOneUserValidation.validate({id});
          
          if (error) {
              return res.status(400).json({
                  message: "Invalid ID provided",
                  error: "Invalid input for type number"
              })
          }
          
          const response = await AuthService.getOne(value.id);
          return res.status(201).json(response);
      } catch (error) {
          return res.status(500).json(error);
      }
  }

  async update(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const data = req.body;
        const response = await AuthService.update(id, data);
        return res.status(200).json(response);
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const response = await AuthService.delete(id);
        return res.status(200).json(response);
    } catch (error) {
        console.error('Error deleting province:', error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }


}