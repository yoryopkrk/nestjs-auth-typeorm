import { IsString, IsNotEmpty, IsPhoneNumber, IsOptional, IsPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `customer's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `customer's lastName` })
  readonly lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  @ApiProperty({ description: `customer's phone` })
  readonly phone: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
