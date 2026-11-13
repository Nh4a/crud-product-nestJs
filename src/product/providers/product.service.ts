import {
  ConflictException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '../product.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '../dtos/create-product.dto.js';
import { CloudinaryImageData } from '../interfaces/image-data.interface.js';
import { UploadImageProvider } from './upload-image.provider.js';
import { UpdateProductDto } from '../dtos/update-product.dto.js';

@Injectable()
export class ProductService {
  constructor(
    /**
     *inject product repository
     */
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    /**
     * inject upload provider
     */

    private readonly uploadProvider: UploadImageProvider,
  ) {}

  public async createOneProduct(
    createProductDto: CreateProductDto,
    file?: Express.Multer.File,
  ) {
    let imageUploaded: undefined | Partial<CloudinaryImageData> = undefined;
    if (file) {
      try {
        imageUploaded = await this.uploadProvider.upload(file);
      } catch (error) {
        console.log(error);
        throw new ConflictException('Upload image failed');
      }
    }

    try {
      const newProduct = this.productRepo.create({
        ...createProductDto,
        imageUrl: imageUploaded?.imageUrl,
        imagePublicId: imageUploaded?.imagePublicId,
      });
      return await this.productRepo.save(newProduct);
    } catch (error) {
      console.log(error);
      throw new ConflictException('Create product faild');
    }
  }

  public async getAllProduct() {
    try {
      const products = await this.productRepo.find({
        order: {
          id: 'desc',
        },
      });
      return products;
    } catch (error) {
      throw new RequestTimeoutException(
        "Can't fetch product now please try latter",
      );
    }
  }

  public async deleteProduct(id: number) {
    let deleteProduct: Product | null = null;

    try {
      deleteProduct = await this.productRepo.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Could not find the product please try later',
      );
    }

    if (!deleteProduct) {
      throw new NotFoundException('Product not found');
    }

    if (deleteProduct.imagePublicId) {
      try {
        await this.uploadProvider.delete(deleteProduct.imagePublicId);
      } catch (error) {
        throw new RequestTimeoutException(
          "can't proccess the request right now",
        );
      }
    }

    try {
      await this.productRepo.remove(deleteProduct);
      console.log('delete');
      return deleteProduct;
    } catch (error) {
      throw new RequestTimeoutException("Can't delete product now");
    }
  }

  public async updateProduct(
    updateProductDto: UpdateProductDto,
    id: number,
    file?: Express.Multer.File,
  ) {
    let productToUpdate: Product | null = null;
    try {
      productToUpdate = await this.productRepo.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        "Can't process the request please try later",
      );
    }

    if (!productToUpdate) {
      throw new NotFoundException('Product not found!');
    }

    let imageData: CloudinaryImageData | null = null;
    if (file) {
      try {
        imageData = await this.uploadProvider.upload(file);
      } catch (error) {
        throw new RequestTimeoutException(
          "Can't process the request please try later",
        );
      }
    }

    if (productToUpdate.imageUrl && productToUpdate.imagePublicId) {
      try {
        await this.uploadProvider.delete(productToUpdate.imagePublicId);
      } catch (error) {
        throw new RequestTimeoutException(
          "Can't process the request please try later",
        );
      }
    }

    // update product information

    productToUpdate.productName = updateProductDto.productName;
    productToUpdate.stockQty = updateProductDto.stockQty;
    productToUpdate.unitPrice = updateProductDto.unitPrice;
    productToUpdate.description = updateProductDto.description
      ? updateProductDto.description
      : undefined;
    productToUpdate.imageUrl = imageData?.imageUrl
      ? imageData.imageUrl
      : undefined;
    productToUpdate.imagePublicId = imageData?.imagePublicId
      ? imageData.imagePublicId
      : undefined;

    return await this.productRepo.save(productToUpdate);
  }
}
