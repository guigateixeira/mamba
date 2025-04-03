import { CampaignCategory, CampaignStatus } from 'src/constants/campaigns';
import { Campaign } from 'src/models/campaign.entity';

export interface ICampaignRepository {
  createCampaign(request: CreateCampaignRepoRequest): Promise<Campaign>;
  getCampaigns(page: number): Promise<Campaign[]>;
  findOneBy(request: FindOneByRepoRequest): Promise<Campaign | null>;
  updateCampaign(request: UpdateCampaignRepoRequest): Promise<Campaign>;
  deleteCampaign(id: string): Promise<void>;
}

export type CreateCampaignRepoRequest = {
  name: string;
  category: CampaignCategory;
  status: CampaignStatus;
  startDate: Date;
  endDate: Date;
};

export type FindOneByRepoRequest = {
  id: string;
};

export type UpdateCampaignRepoRequest = {
  campaign: Campaign;
  update: Partial<Campaign>;
};
