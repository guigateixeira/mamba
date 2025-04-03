import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import {
  CreateCampaignRepoRequest,
  FindOneByRepoRequest,
  ICampaignRepository,
  UpdateCampaignRepoRequest,
} from './interfaces';
import { Campaign } from 'src/models/campaign.entity';
import { DataSource, Repository } from 'typeorm';
import { IOC_TYPES } from 'src/constants';
import {
  CampaignCreationError,
  CampaignDeletionError,
  FailedToGetCampaignError,
} from './errors';

@Injectable()
export class CampaignRepository
  extends Repository<Campaign>
  implements ICampaignRepository
{
  private readonly _logger = new Logger(CampaignRepository.name);
  PAGE_SIZE = 10;
  constructor(
    @Inject(IOC_TYPES.DATA_SOURCE) private readonly _dataSource: DataSource,
  ) {
    super(Campaign, _dataSource.createEntityManager());
  }

  async createCampaign(request: CreateCampaignRepoRequest): Promise<Campaign> {
    try {
      const campaign = this.create({
        name: request.name,
        category: request.category,
        status: request.status,
        startDate: request.startDate,
        endDate: request.endDate,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return this.save(campaign);
    } catch (error) {
      this._logger.error('Error creating campaign', error, request);
      throw new CampaignCreationError(
        'Error creating campaign',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCampaigns(page: number): Promise<Campaign[]> {
    try {
      return this.find({
        take: this.PAGE_SIZE,
        skip: (page - 1) * this.PAGE_SIZE,
        order: {
          createdAt: 'DESC',
        },
      });
    } catch (error) {
      this._logger.error('Error getting campaigns', error, { page });
      throw new FailedToGetCampaignError();
    }
  }

  async findOneBy(request: FindOneByRepoRequest): Promise<Campaign | null> {
    try {
      return this.findOne({
        where: { id: request.id },
      });
    } catch (error) {
      this._logger.error('Error getting campaign by id', error, request);
      throw new FailedToGetCampaignError();
    }
  }

  async updateCampaign(request: UpdateCampaignRepoRequest): Promise<Campaign> {
    try {
      return this.save({
        ...request.campaign,
        ...request.update,
        updatedAt: new Date(),
      });
    } catch (error) {
      this._logger.error('Error updating campaign', error, request);
      throw new CampaignCreationError(
        'Error updating campaign',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteCampaign(id: string): Promise<void> {
    try {
      await this.update({ id }, { deletedAt: new Date() });
    } catch (error) {
      this._logger.error('Error deleting campaign', error, { id });
      throw new CampaignDeletionError(
        'Error deleting campaign',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
