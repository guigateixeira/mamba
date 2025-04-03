import { Campaign } from 'src/models/campaign.entity';

export type CreateCampaignResponse = {
  success: boolean;
  message: string;
  data: Campaign;
};
