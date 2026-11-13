import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MIN,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  productName: string;

  @IsNumber()
  @Min(0)
  unitPrice: number;

  @IsInt()
  @Min(0)
  stockQty: number;

  @IsOptional()
  @IsString()
  description?: string;
}
