import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsEnum, IsDate } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { CampaignCategory, CampaignStatus } from 'src/constants/campaigns';

export class UpdateCampaignBodyRequest {
  @ApiPropertyOptional({ description: 'The name of the campaign', example: 'Summer Giveaway' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  name?: string;

  @ApiPropertyOptional({ enum: CampaignCategory, description: 'The category of the campaign' })
  @IsOptional()
  @IsEnum(CampaignCategory)
  category?: CampaignCategory;

  @ApiPropertyOptional({ enum: CampaignStatus, description: 'The status of the campaign' })
  @IsOptional()
  @IsEnum(CampaignStatus)
  status?: CampaignStatus;

  @ApiPropertyOptional({ type: Date, description: 'The start date of the campaign', example: '2024-07-01T00:00:00.000Z' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @ApiPropertyOptional({ type: Date, description: 'The end date of the campaign', example: '2024-07-31T23:59:59.999Z' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;
}
