import { Module } from '@nestjs/common';
import { ProductController } from './product.controller.js';
import { ProductService } from './providers/product.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity.js';
import { UploadImageProvider } from './providers/upload-image.provider.js';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import cloudinaryConfig from '../config/cloudinary.config.js';

@Module({
  controllers: [ProductController],
  providers: [ProductService, UploadImageProvider],
  imports: [
    TypeOrmModule.forFeature([Product]),
    ConfigModule.forFeature(cloudinaryConfig),
  ],
})
export class ProductModule {}
