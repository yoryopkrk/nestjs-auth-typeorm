import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's description` })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: `product's price` })
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: `product's stock` })
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: `product's image` })
  readonly image: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly brandId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @Min(0)
  offset?: number;

  @IsOptional()
  @IsPositive()
  minPrice?: number;

  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  maxPrice?: number;
}
