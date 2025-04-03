import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsEnum } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CampaignCategory } from 'src/constants/campaigns';

export class CreateCampaignBodyRequest {
  @ApiProperty({
    description: 'Name of the campaign',
    example: 'Summer Giveaway',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  name: string;

  @ApiProperty({
    description: 'Category of the campaign',
    enum: CampaignCategory,
    example: CampaignCategory.EMAIL,
  })
  @IsEnum(CampaignCategory)
  category: CampaignCategory;

  @ApiProperty({
    description: 'Start date of the campaign',
    type: String,
    example: '2024-07-01T00:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    description: 'End date of the campaign',
    type: String,
    example: '2024-07-31T23:59:59.999Z',
  })
  @IsDate()
  @Type(() => Date)
  endDate: Date;
}
