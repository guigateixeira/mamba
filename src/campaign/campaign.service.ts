import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  CampaignCreationError,
  CampaignNotFoundError,
  CampaignUpdateError,
} from './errors';
import { IOC_TYPES } from 'src/constants';
import {
  ICampaignService,
  ICampaignRepository,
  CreateCampaignRequest,
  GetCampaign,
  UpdateCampaignRequest,
} from './interfaces';
import { CampaignStatus } from 'src/constants/campaigns';
import { Campaign } from 'src/models/campaign.entity';

@Injectable()
export class CampaignService implements ICampaignService {
  private readonly _logger = new Logger(CampaignService.name);

  constructor(
    @Inject(IOC_TYPES.CAMPAIGN_REPOSITORY)
    private readonly _campaignRepository: ICampaignRepository,
  ) {}

  async createCampaign(request: CreateCampaignRequest): Promise<Campaign> {
    if (request.endDate < request.startDate) {
      this._logger.warn('End date must be greater than start date.', request);
      throw new CampaignCreationError(
        'End date must be greater than start date.',
      );
    }
    if (request.startDate < new Date()) {
      this._logger.warn(
        'Start date must be greater than current date.',
        request,
      );
      throw new CampaignCreationError(
        'Start date must be greater than current date.',
      );
    }

    const campaign = await this._campaignRepository.createCampaign({
      name: request.name,
      category: request.category,
      status: CampaignStatus.ACTIVE,
      startDate: request.startDate,
      endDate: request.endDate,
    });

    return campaign;
  }

  async getCampaigns(page: number): Promise<Campaign[]> {
    return this._campaignRepository.getCampaigns(page);
  }

  async getCampaign(request: GetCampaign): Promise<Campaign> {
    const campaign = await this._campaignRepository.findOneBy({
      id: request.id,
    });
    if (!campaign) {
      this._logger.warn('Campaign not found.', request);
      throw new CampaignNotFoundError();
    }
    return campaign;
  }

  async updateCampaign(request: UpdateCampaignRequest): Promise<Campaign> {
    if (
      request.name === undefined &&
      request.category === undefined &&
      request.startDate === undefined &&
      request.endDate === undefined &&
      request.status === undefined
    ) {
      this._logger.warn('No fields to update.', request);
      throw new CampaignUpdateError('No fields to update.');
    }
    const campaign = await this._campaignRepository.findOneBy({
      id: request.id,
    });
    if (!campaign) {
      this._logger.warn('Campaign not found.', request);
      throw new CampaignNotFoundError();
    }
    let status = request.status || campaign.status;
    if (
      request.endDate &&
      request.startDate &&
      request.endDate < request.startDate
    ) {
      this._logger.error('End date must be greater than start date.', request);
      throw new CampaignCreationError(
        'End date must be greater than start date.',
      );
    }
    if (request.endDate && request.endDate < new Date()) {
      status = CampaignStatus.EXPIRED;
    }

    return this._campaignRepository.updateCampaign({
      campaign,
      update: {
        ...request,
        status,
      },
    });
  }

  async deleteCampaign(id: string): Promise<void> {
    const campaign = await this._campaignRepository.findOneBy({ id });
    if (!campaign) {
      this._logger.warn('Campaign not found.', { id });
      throw new CampaignNotFoundError();
    }
    await this._campaignRepository.deleteCampaign(id);
  }
}
