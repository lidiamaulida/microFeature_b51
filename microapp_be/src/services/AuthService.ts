import { Repository } from "typeorm"
import { User } from "../entities/User"
import { AppDataSource } from "../data-source"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

export default new class AuthServices {
    private readonly AuthRepository: Repository<User> = AppDataSource.getRepository(User)

    async register(reqBody: any): Promise<object | string > {
        try {
          const { role, ...userData } = reqBody;
          const checkUsername = await this.AuthRepository.count({ where: { username: reqBody.username}})
          if(checkUsername > 0) return `Username : ${reqBody.username} is already registered`

          const hashPassword = await bcrypt.hash(reqBody.password, 10)

          const obj = this.AuthRepository.create({
            ...userData,
            role: role || "user",
            password : hashPassword
          })

          const resRegist = await this.AuthRepository.save(obj)
          return {
            message: 'success create User',
            data: resRegist,
          };
        } catch (error) {
          throw error;
        }
    }

    async login(reqBody: any): Promise<object | string > {
      try {
        const checkUsername = await this.AuthRepository.findOne({ where: { username: reqBody.username }})
        if(!checkUsername) return `Username : ${reqBody.username} is not ready registered`

        
        const comparePassword = await bcrypt.compare(reqBody.password, checkUsername.password)
        if(!comparePassword) return `password is wrong!`

        const obj = this.AuthRepository.create({
          id: checkUsername.id,
          fullname: checkUsername.fullname,
          username: checkUsername.username,
        })

        const token = jwt.sign({ obj }, "NEPOBABY", { expiresIn: "5h"})

        return{
          message: "login succes",
          token,
        }
      } catch (error) {
        return "something error whille loggedin"
      }
    }

    async getAll(): Promise<object | string> {
      try {
          const response = await this.AuthRepository.find()
          return {
              message: "success get all users",
              data: response
          }
      } catch (error) {
          return "message: something error while get all user"
      }
  }

  async getOne(id: number): Promise<object | string> {
      try {
          const response = await this.AuthRepository.findOneBy({ id })
          return {
              message: "success get one user",
              data: response
          }
      } catch (error) {
          return "message: something error while get one user"
      }
  }

  async update(id: string, data: any): Promise<object | string> {
    try {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
        return {
        message: "Invalid ID provided",
        error: "Invalid input for type integer"
        };
    }
    const response = await this.AuthRepository.update(numericId, data);

    return {
        message: "success updating a user",
        data: response
    };
    } catch (error) {
    console.error('Error updating user:', error);
    return {
        message: "something error while updating user",
        error: error.message
    };
    }
  }

  async delete(id: string): Promise<object | string> {
    try {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            return {
                message: "Invalid ID provided",
                error: "Invalid input for type integer"
            };
        }
        const response = await this.AuthRepository.delete(numericId);
        return {
            message: "success deleting a user",
            data: response
        }
    } catch (error) {
      console.error('Error deleting user:', error);
        return "message: something error while deleting user"
    }
}

}