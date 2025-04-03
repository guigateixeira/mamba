import { ApiProperty } from '@nestjs/swagger';
import { CampaignStatus, CampaignCategory } from 'src/constants/campaigns';

export class CampaignModelResponse {
  @ApiProperty({
    description: 'Unique identifier of the campaign',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the campaign',
    example: 'Summer Giveaway',
  })
  name: string;

  @ApiProperty({
    description: 'Status of the campaign',
    enum: CampaignStatus,
    example: CampaignStatus.ACTIVE,
  })
  status: CampaignStatus;

  @ApiProperty({
    description: 'Start date of the campaign',
    type: Date,
    example: '2024-07-01T00:00:00.000Z',
  })
  startDate: Date;

  @ApiProperty({
    description: 'End date of the campaign',
    type: Date,
    example: '2024-07-31T23:59:59.999Z',
  })
  endDate: Date;

  @ApiProperty({
    description: 'Category of the campaign',
    enum: CampaignCategory,
    example: CampaignCategory.EMAIL,
  })
  category: CampaignCategory;

  @ApiProperty({
    description: 'Timestamp when the campaign was created',
    type: Date,
    example: '2024-06-10T12:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the campaign was last updated',
    type: Date,
    example: '2024-06-15T15:30:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description:
      'Timestamp when the campaign was deleted (null if not deleted)',
    type: Date,
    nullable: true,
    example: null,
  })
  deletedAt: Date | null;
}

export class CreateCampaignAPIResponse {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: CampaignModelResponse;
}

export class GetCampaignAPIResponse {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: CampaignModelResponse;
}

export class GetCampaignsAPIResponse {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty({ isArray: true })
  data: CampaignModelResponse;
}
