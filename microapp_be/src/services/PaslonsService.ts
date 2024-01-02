import { Repository } from "typeorm";
import { paslons } from "../entities/Paslon";
import { AppDataSource } from "../data-source";

export default new class PaslonsService {
    private readonly PaslonsRepository: Repository<paslons> = AppDataSource.getRepository(paslons)

    async getAllPaslons() : Promise<object | string> {
     try {
       const paslons = await this.PaslonsRepository
        .createQueryBuilder('paslons')
        .select()
        .getMany();

      return {
        message: 'success get all paslons',
        data: paslons,
      };
    } catch (error) {
        throw error
    }
  }

  async getOneById(paslonsId : number): Promise<object | undefined> {
    try {
      const paslons = await this.PaslonsRepository
        .createQueryBuilder('paslons')
        .select()
        .where('paslons.id = :id', { id: paslonsId })
        .getOne();

      if (!paslons) {
        return {
          message: 'Data not found',
        };
      }

      return {
        message: 'success get paslon',
        data: paslons
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

}