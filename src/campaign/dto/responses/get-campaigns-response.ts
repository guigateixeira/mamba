import { Campaign } from 'src/models/campaign.entity';

export type GetCampaignsResponse = {
  success: boolean;
  message: string;
  data: Campaign[];
};

export type GetCampaignResponse = {
  success: boolean;
  message: string;
  data: Campaign;
};
