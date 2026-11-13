import { CreateProductDto } from './create-product.dto.js';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateProductDto extends CreateProductDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
