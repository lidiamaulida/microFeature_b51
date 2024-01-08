import { Repository } from "typeorm";
import { partai } from "../entities/Partai";
import { AppDataSource } from "../data-source";

export default new class PartaiService {
    private readonly PartaiRepository: Repository<partai> = AppDataSource.getRepository(partai)

    async getAllPartai() : Promise<object | string> {
     try {
       const partai = await this.PartaiRepository
        .createQueryBuilder('partai')
        .select()
        .getMany();

      return {
        message: 'success get all parties',
        data: partai,
      };
    } catch (error) {
        throw error
    }
  }

  async getOneById(partaiId: number): Promise<object | undefined> {
    try {
      const partai = await this.PartaiRepository
        .createQueryBuilder('partai')
        .select()
        .where('partai.id = :id', { id: partaiId })
        .getOne();

      if (!partai) {
        return {
          message: 'Data not found',
        };
      }

      return {
        message: 'success get partai',
        data: partai,
      };
    } catch (error) {
      throw error;
    }
  }

  async createPartai(data: any): Promise<object | string > {
    try {
      const savedPartai = await this.PartaiRepository.save(data)
      

      return {
        message: 'success create partai',
        data: savedPartai,
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
    const response = await this.PartaiRepository.update(numericId, data);

    return {
        message: "success updating a partai",
        data: response
    };
    } catch (error) {
    console.error('Error updating partai:', error);
    return {
        message: "something error while updating partai",
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
        const response = await this.PartaiRepository.delete(numericId);
        return {
            message: "success deleting a partai",
            data: response
        }
    } catch (error) {
        return "message: something error while deleting partai"
    }
  }

}