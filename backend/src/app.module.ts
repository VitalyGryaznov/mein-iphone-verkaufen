import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Article } from './article/schemas/article.schema';
import { ArticleModule } from './article/atricles.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ArticleModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: 'env/.env.local',
      isGlobal: true,
      ignoreEnvFile: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
})
export class AppModule {}
