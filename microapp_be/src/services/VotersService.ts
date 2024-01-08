import { Repository } from "typeorm";
import { voters } from "../entities/Voters";
import { AppDataSource } from "../data-source";

export default new class VotersService {
  private readonly VoteRepository: Repository<voters> = AppDataSource.getRepository(voters)

  async create(data: any): Promise<object | string> {
      try {
          const response = await this.VoteRepository.save(data)
          return {
              message: "success create vote",
              data: response
          }
      } catch (error) {
          return "message: something error while create vote"
      }
  }

  async getAllVote(): Promise<object | string> {
      try {
          const response = await this.VoteRepository.find({
              relations: ["user", "paslonId"],
              select: {
                  user: {
                      fullname: true,
                      address: true,
                      gender: true
                  },
                  paslonId: {
                      name: true
                  }
              }
          });
          
          const countVoters = await this.VoteRepository.count()
          return {
              message: "success get all vote",
              countVoters: countVoters,
              data: response
          };
      } catch (error) {
          console.error('Error while getting all votes:', error);
          return "message: something error while get all vote";
      }
  }

  async getOne(id: number): Promise<object | string> {
      try {
      const response = await this.VoteRepository.findOne({
          where: { id },
          relations: ["user", "paslonId"],
          select: {
              user: {
                  fullname: true,
                  address: true,
                  gender: true,
              },
              paslonId: {
                  name: true,
              },
          },
      });

      const countVoters = await this.VoteRepository.count()
          return {
              message: "success get a vote",
              countVoters: countVoters,
              data: response
          };
  
      } catch (error) {
        return "message: something error while getting a Vote";
      }
  }
}