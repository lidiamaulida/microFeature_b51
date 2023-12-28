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
    
}