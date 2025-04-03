import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignModule } from './campaign/campaign.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST') || 'localhost',
        port: configService.get('DATABASE_PORT') || 5432,
        username: configService.get('DATABASE_USERNAME') || 'user',
        password: configService.get('DATABASE_PASSWORD') || 'password',
        database: configService.get('DATABASE_NAME') || 'postgres',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    CampaignModule,
  ],
})
export class AppModule {}
