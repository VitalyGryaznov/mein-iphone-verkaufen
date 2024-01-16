import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ArticleService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import slugify from 'slugify';
import { Article } from './schemas/article.schema';
import { FormatResponseInterceptor } from './format-response.interceptor';
import { Public } from 'src/auth/decorators';

@UseInterceptors(FormatResponseInterceptor)
@Controller('/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @Post()
  createArticle(@Body() payload: CreateArticleDto) {
    return this.articleService.create({
      ...payload,
      url: slugify(payload.title),
    });
  }
}
