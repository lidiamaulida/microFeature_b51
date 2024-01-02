import { Repository } from "typeorm";
import { articles } from "../entities/Articles";
import { AppDataSource } from "../data-source";


export default new class ArticlesService {
    private readonly ArticlesRepository: Repository<articles> = AppDataSource.getRepository(articles)

    async gettAllARticle() : Promise<object | string> {
     try {
       const articles = await this.ArticlesRepository
        .createQueryBuilder('articles')
        .select([
          'articles.id',
          'articles.title',
          'articles.date',
          'articles.author',
          'articles.image',
        ])
        .getMany();

      return {
        message: 'success get all articles',
        data: articles,
      };
    } catch (error) {
        throw error
    }
  }

  async getOneById(articleId: number): Promise<object | undefined> {
    try {
      const article = await this.ArticlesRepository
        .createQueryBuilder('articles')
        .select()
        .where('articles.id = :id', { id: articleId })
        .getOne();

      if (!article) {
        return {
          message: 'Data not found',
        };
      }

      return {
        message: 'success get article',
        data: article
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
    
}