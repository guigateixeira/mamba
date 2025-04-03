import { IsInt, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetCampaignsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Page must be an integer' })
  @Min(1, { message: 'Page must be a positive number' })
  page: number = 1;
}
