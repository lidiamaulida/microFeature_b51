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
      const newPartai = this.PartaiRepository.create(data);
      const savedPartai = await this.PartaiRepository.save(newPartai)
      

      return {
        message: 'success create partai',
        data: savedPartai,
      };
    } catch (error) {
      throw error;
    }
  }
}