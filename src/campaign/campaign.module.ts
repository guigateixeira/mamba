import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { IOC_TYPES } from 'src/constants';
import { CampaignRepository } from './campaign.repository';
import { Campaign } from 'src/models/campaign.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign])],
  providers: [
    {
      provide: IOC_TYPES.CAMPAIGN_SERVICE,
      useClass: CampaignService,
    },
    {
      provide: IOC_TYPES.CAMPAIGN_REPOSITORY,
      useClass: CampaignRepository,
    },
    {
      provide: IOC_TYPES.DATA_SOURCE,
      useFactory: (dataSource: DataSource) => dataSource,
      inject: [DataSource],
    },
  ],
  controllers: [CampaignController],
})
export class CampaignModule {}
