import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  async create(
    createArticleDto: CreateArticleDto & { url: string },
  ): Promise<Article> {
    const createdCat = new this.articleModel(createArticleDto);
    return createdCat.save();
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  findOne(id: string) {
    return this.articleModel.findById(id).exec();
  }
}
