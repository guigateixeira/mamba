import { Test, TestingModule } from '@nestjs/testing';
import { Mocked } from 'jest-mock';
import { Campaign } from 'src/models/campaign.entity';
import { CampaignCategory, CampaignStatus } from 'src/constants/campaigns';
import { CampaignService } from 'src/campaign/campaign.service';
import {
  CampaignCreationError,
  CampaignNotFoundError,
} from 'src/campaign/errors';
import { ICampaignRepository } from 'src/campaign/interfaces';

const mockCampaignRepository = (): ICampaignRepository => ({
  createCampaign: jest.fn(),
  getCampaigns: jest.fn(),
  findOneBy: jest.fn(),
  updateCampaign: jest.fn(),
  deleteCampaign: jest.fn(),
});

describe('CampaignService', () => {
  let service: CampaignService;

  let repository: Mocked<ICampaignRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampaignService,
        { provide: 'ICampaignRepository', useFactory: mockCampaignRepository },
      ],
    }).compile();

    service = module.get<CampaignService>(CampaignService);
    repository = module.get<ICampaignRepository>(
      'ICampaignRepository',
    ) as Mocked<ICampaignRepository>;
  });

  describe('createCampaign', () => {
    it('should create a campaign', async () => {
      const request = {
        name: 'Test Campaign',
        category: CampaignCategory.EMAIL,
        startDate: new Date(Date.now() + 1000),
        endDate: new Date(Date.now() + 100000),
      };

      const createdCampaign = {
        ...request,
        id: '1',
        status: CampaignStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      repository.createCampaign.mockResolvedValue(createdCampaign);

      await expect(service.createCampaign(request)).resolves.toEqual(
        createdCampaign,
      );
    });

    it('should throw error if endDate is before startDate', async () => {
      const request = {
        name: 'Invalid Campaign',
        category: CampaignCategory.EMAIL,
        startDate: new Date(),
        endDate: new Date(Date.now() - 1000),
      };

      await expect(service.createCampaign(request)).rejects.toThrow(
        CampaignCreationError,
      );
    });

    it('should throw error if startDate is before now', async () => {
      const request = {
        name: 'Invalid Campaign',
        category: CampaignCategory.EMAIL,
        startDate: new Date(2010, 0, 1),
        endDate: new Date(),
      };

      await expect(service.createCampaign(request)).rejects.toThrow(
        CampaignCreationError,
      );
    });
  });

  describe('getCampaign', () => {
    it('should return a campaign if found', async () => {
      const campaign = { id: '1', name: 'Test Campaign' } as Campaign;
      repository.findOneBy.mockResolvedValue(campaign);

      await expect(service.getCampaign({ id: '1' })).resolves.toEqual(campaign);
    });

    it('should throw error if campaign not found', async () => {
      repository.findOneBy.mockResolvedValue(null);

      await expect(service.getCampaign({ id: '1' })).rejects.toThrow(
        CampaignNotFoundError,
      );
    });
  });

  describe('updateCampaign', () => {
    it('should update a campaign', async () => {
      const existingCampaign = {
        id: '1',
        name: 'Old Campaign',
        status: CampaignStatus.ACTIVE,
      } as Campaign;
      repository.findOneBy.mockResolvedValue(existingCampaign);

      const updateRequest = { id: '1', name: 'Updated Campaign' };
      const updatedCampaign = { ...existingCampaign, ...updateRequest };
      repository.updateCampaign.mockResolvedValue(updatedCampaign);

      await expect(service.updateCampaign(updateRequest)).resolves.toEqual(
        updatedCampaign,
      );
    });

    it('should throw error if campaign not found', async () => {
      repository.findOneBy.mockResolvedValue(null);
      await expect(
        service.updateCampaign({ id: '1', name: 'New Name' }),
      ).rejects.toThrow(CampaignNotFoundError);
    });
  });

  describe('deleteCampaign', () => {
    it('should delete a campaign if it exists', async () => {
      repository.findOneBy.mockResolvedValue({ id: '1' } as Campaign);
      repository.deleteCampaign.mockResolvedValue(undefined);
      await expect(service.deleteCampaign('1')).resolves.toBeUndefined();
    });

    it('should throw error if campaign not found', async () => {
      repository.findOneBy.mockResolvedValue(null);
      await expect(service.deleteCampaign('1')).rejects.toThrow(
        CampaignNotFoundError,
      );
    });
  });
});
