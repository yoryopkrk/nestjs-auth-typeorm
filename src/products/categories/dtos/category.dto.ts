import { IsString, IsNotEmpty, IsNumber, IsPositive, IsArray } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `category's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `category's description` })
  readonly description: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
