import { Transform } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class GetCampaignByIdParams {
  @IsUUID()
  @Transform(({ value }) => value.trim())
  id: string;
}
