import { Repository } from "typeorm";
import { voters } from "../entities/Voters";
import { AppDataSource } from "../data-source";

export default new class VotersService {
    private readonly VotersRepository: Repository<voters> = AppDataSource.getRepository(voters)

    async getAllVoters() : Promise<object | string> {
     try {
       const voters = await this.VotersRepository
        .createQueryBuilder('voters')
        .select()
        .getMany();

      return {
        message: 'success get all voters',
        data: voters,
      };
    } catch (error) {
        throw error
    }
  }

  async getOneById(votersId: number): Promise<object | undefined> {
    try {
      const voters = await this.VotersRepository
        .createQueryBuilder('voters')
        .select()
        .where('voters.id = :id', { id: votersId })
        .getOne();

      if (!voters) {
        return {
          message: 'Data not found',
        };
      }

      return {
        message: 'success get voters',
        data: voters
      };
    } catch (error) {
      throw error;
    }
  }

  async createVoter(data: any): Promise<object | string > {
    try {
      const newVoter = this.VotersRepository.create(data);
      const savedVoter = await this.VotersRepository.save(newVoter)
      

      return {
        message: 'success create Voter',
        data: savedVoter,
      };
    } catch (error) {
      throw error;
    }
  }
}  