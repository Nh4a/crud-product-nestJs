import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto.js';
import { ProductService } from './providers/product.service.js';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import {
  MulterLimits,
  MulterOptions,
} from '@nestjs/platform-express/multer/interfaces/multer-options.interface.js';
import { memoryStorage } from 'multer';
import { UpdateProductDto } from './dtos/update-product.dto.js';

const multerLimit: MulterLimits = {
  fileSize: 1024 * 1024 * 5,
};
const multerOption: MulterOptions = {
  storage: memoryStorage(),
  limits: multerLimit,
  fileFilter: (req, file, cb) => {
    const allowFile = ['image/png', 'image/jpg', 'image/webp'];
    if (!allowFile.includes(file.mimetype)) {
      throw cb(new Error('Only JPG, PNG and WEBP images are allowed'), false);
    }
    return cb(null, true);
  },
};

@Controller('api/product')
export class ProductController {
  constructor(
    /**
     *inject product service
     */
    private readonly productService: ProductService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOption))
  public createOneProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    console.log();
    return this.productService.createOneProduct(createProductDto, file);
  }

  @Get()
  public getAllProduct() {
    return this.productService.getAllProduct();
  }

  @Delete(':id')
  public deleteProduct(@Param('id', ParseIntPipe) id: number) {
    console.log('dlete');
    return this.productService.deleteProduct(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file', multerOption))
  public updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile('file') file?: Express.Multer.File,
  ) {
    return this.productService.updateProduct(updateProductDto, id, file);
  }
}
