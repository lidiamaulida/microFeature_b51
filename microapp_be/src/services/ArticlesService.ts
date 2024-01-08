import { Repository } from "typeorm";
import { articles } from "../entities/Articles";
import { AppDataSource } from "../data-source";


export default new class ArticlesService {
    private readonly ArticlesRepository: Repository<articles> = AppDataSource.getRepository(articles)

    async gettAllARticle() : Promise<object | string> {
     try {
      const response = await this.ArticlesRepository.find({
        relations: ["user"],
        select: {
            user: {
                fullname: true
            }
        }
    })

      return {
        message: 'success get all articles',
        data: response,
      };
    } catch (error) {
        throw error
    }
  }

  async getOneById(id: number): Promise<object | undefined> {
    try {
      const response = await this.ArticlesRepository.findOne({
        where: { id },
        relations: ["user"],
        select: {
            user: {
                fullname: true
            }
        }
    })

      if (!response) {
        return {
          message: 'Data not found',
        };
      }

      return {
        message: 'success get article',
        data: response
      };
    } catch (error) {
      throw error;
    }
  }

  async createArticle(data: any): Promise<object | string > {
    try {
      const newArticle = this.ArticlesRepository.create(data);
      const savedArticle = await this.ArticlesRepository.save(newArticle)
      

      return {
        message: 'success create article',
        data: savedArticle,
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
    const response = await this.ArticlesRepository.update(numericId, data);

    return {
        message: "success updating article",
        data: response
    };
    } catch (error) {
    console.error('Error updating article:', error);
    return {
        message: "something error while updating article",
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
        const response = await this.ArticlesRepository.delete(numericId);
        return {
            message: "success deleting a article",
            data: response
        }
    } catch (error) {
        return "message: something error while deleting article"
    }
}
    
}