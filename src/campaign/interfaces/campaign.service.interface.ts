import { CampaignCategory, CampaignStatus } from 'src/constants/campaigns';
import { Campaign } from 'src/models/campaign.entity';

export interface ICampaignService {
  createCampaign(request: CreateCampaignRequest): Promise<Campaign>;
  getCampaigns(page: number): Promise<Campaign[]>;
  getCampaign(request: GetCampaign): Promise<Campaign>;
  updateCampaign(request: UpdateCampaignRequest): Promise<Campaign>;
  deleteCampaign(id: string): Promise<void>;
}

export type CreateCampaignRequest = {
  name: string;
  category: CampaignCategory;
  startDate: Date;
  endDate: Date;
};

export type GetCampaign = {
  id: string;
};

export type UpdateCampaignRequest = {
  id: string;
  name?: string;
  category?: CampaignCategory;
  startDate?: Date;
  endDate?: Date;
  status?: CampaignStatus;
};
