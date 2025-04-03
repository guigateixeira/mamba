import { IsString, IsNotEmpty, IsDate, IsEnum } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CampaignCategory } from 'src/constants/campaigns';

export class CreateCampaignBodyRequest {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  name: string;

  @IsEnum(CampaignCategory)
  @Transform(({ value }) => value.trim())
  category: CampaignCategory;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;
}
