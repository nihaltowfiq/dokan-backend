import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumberString, IsOptional } from 'class-validator';

export class GetAllBrandDto {
  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  per_page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort?: 'asc' | 'desc';
}
