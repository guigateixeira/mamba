import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CampaignCategory, CampaignStatus } from 'src/constants/campaigns';

export class UpdateCampaignBodyRequest {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  name?: string;

  @IsOptional()
  @IsEnum(CampaignCategory)
  category?: CampaignCategory;

  @IsOptional()
  @IsEnum(CampaignStatus)
  status?: CampaignStatus;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;
}
