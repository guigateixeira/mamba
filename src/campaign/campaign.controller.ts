import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateCampaignBodyRequest,
  GetCampaignByIdParams,
  GetCampaignsQueryDto,
  UpdateCampaignBodyRequest,
} from './dto/requests';
import { IOC_TYPES } from 'src/constants';
import { ICampaignService } from './interfaces';
import {
  CreateCampaignResponse,
  GetCampaignResponse,
  GetCampaignsResponse,
} from './dto/responses';

@Controller('campaigns')
export class CampaignController {
  constructor(
    @Inject(IOC_TYPES.CAMPAIGN_SERVICE)
    private readonly _campaignService: ICampaignService,
  ) {}

  @Post()
  @HttpCode(201)
  async createCampaign(
    @Body() body: CreateCampaignBodyRequest,
  ): Promise<CreateCampaignResponse> {
    const campaign = await this._campaignService.createCampaign({
      name: body.name,
      category: body.category,
      startDate: body.startDate,
      endDate: body.endDate,
    });

    return {
      success: true,
      message: 'Campaign created successfully.',
      data: campaign,
    };
  }

  @Get()
  async getCampaigns(
    @Query() query: GetCampaignsQueryDto,
  ): Promise<GetCampaignsResponse> {
    const campaigns = await this._campaignService.getCampaigns(query.page);
    return {
      success: true,
      message: 'Campaigns retrieved successfully.',
      data: campaigns,
    };
  }

  @Get(':id')
  async getCampaignById(
    @Param() params: GetCampaignByIdParams,
  ): Promise<GetCampaignResponse> {
    const campaign = await this._campaignService.getCampaign({ id: params.id });

    return {
      success: true,
      message: 'Campaign retrieved successfully.',
      data: campaign,
    };
  }

  @Patch(':id')
  async updateCampaign(
    @Param() params: GetCampaignByIdParams,
    @Body(new ValidationPipe({ transform: true }))
    body: UpdateCampaignBodyRequest,
  ): Promise<GetCampaignResponse> {
    const campaign = await this._campaignService.updateCampaign({
      id: params.id,
      ...body,
    });

    return {
      success: true,
      message: 'Campaign updated successfully.',
      data: campaign,
    };
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteCampaign(@Param() params: GetCampaignByIdParams): Promise<void> {
    await this._campaignService.deleteCampaign(params.id);
  }
}
