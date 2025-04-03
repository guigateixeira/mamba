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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import {
  CreateCampaignBodyRequest,
  GetCampaignByIdParams,
  GetCampaignsQueryDto,
  UpdateCampaignBodyRequest,
} from './dto/requests';
import { IOC_TYPES } from 'src/constants';
import { ICampaignService } from './interfaces';
import {
  CreateCampaignAPIResponse,
  CreateCampaignResponse,
  GetCampaignAPIResponse,
  GetCampaignResponse,
  GetCampaignsAPIResponse,
  GetCampaignsResponse,
} from './dto/responses';

@ApiTags('Campaigns')
@Controller('campaigns')
export class CampaignController {
  constructor(
    @Inject(IOC_TYPES.CAMPAIGN_SERVICE)
    private readonly _campaignService: ICampaignService,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new campaign' })
  @ApiResponse({ status: 201, description: 'Campaign created successfully.', type: CreateCampaignAPIResponse })
  @ApiBody({ type: CreateCampaignBodyRequest })
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
  @ApiOperation({ summary: 'Retrieve all campaigns' })
  @ApiResponse({ status: 200, description: 'Campaigns retrieved successfully.', type: GetCampaignsAPIResponse })
  @ApiQuery({ name: 'page', required: false, type: Number })
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
  @ApiOperation({ summary: 'Retrieve a campaign by ID' })
  @ApiResponse({ status: 200, description: 'Campaign retrieved successfully.', type: GetCampaignAPIResponse })
  @ApiParam({ name: 'id', required: true, type: String })
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
  @ApiOperation({ summary: 'Update a campaign' })
  @ApiResponse({ status: 200, description: 'Campaign updated successfully.', type: GetCampaignAPIResponse })
  @ApiParam({ name: 'id', required: true, type: String })
  @ApiBody({ type: UpdateCampaignBodyRequest })
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
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a campaign' })
  @ApiResponse({ status: 204, description: 'Campaign deleted successfully.' })
  @ApiParam({ name: 'id', required: true, type: String })
  async deleteCampaign(@Param() params: GetCampaignByIdParams): Promise<void> {
    await this._campaignService.deleteCampaign(params.id);
  }
}
