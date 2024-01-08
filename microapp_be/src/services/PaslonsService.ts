import { Repository } from "typeorm";
import { paslons } from "../entities/Paslon";
import { AppDataSource } from "../data-source";

export default new class PaslonsService {
    private readonly PaslonsRepository: Repository<paslons> = AppDataSource.getRepository(paslons)

    async getAllPaslons() : Promise<object | string> {
     try {
        const response = await this.PaslonsRepository.find({
          relations: ["partai"],
          select: {
              partai: {
                  name: true
              }
          }
      });

      return {
        message: 'success get all paslons',
        data: response,
      };
    } catch (error) {
        throw error
    }
  }

  async getOneById(id : number): Promise<object | undefined> {
    try {
      const response = await this.PaslonsRepository.findOne({
        where: { id },
        relations: ["partai"],
        select: {
            partai: {
                name: true
            }
        }
      });

      if (!response) {
        return {
          message: 'Data not found',
        };
      }

      return {
        message: 'success get paslon',
        data: response
      };
    } catch (error) {
      throw error;
    }
  }

  async createPaslon(data: any): Promise<object | string > {
    try {
      const paslon = this.PaslonsRepository.create(data);
      const savedPaslon = await this.PaslonsRepository.save(paslon)
      

      return {
        message: 'success create article',
        data: savedPaslon,
      };
    } catch (error) {
      throw error;
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
    const response = await this.PaslonsRepository.update(numericId, data);

    return {
        message: "success updating a paslon",
        data: response
    };
    } catch (error) {
    console.error('Error updating paslon:', error);
    return {
        message: "something error while updating paslon",
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
        const response = await this.PaslonsRepository.delete(numericId);
        return {
            message: "success deleting a paslon",
            data: response
        }
    } catch (error) {
        console.error('Error deleting paslon:', error);
        return "message: something error while deleting paslon"
    }
  }

}