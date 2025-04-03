import { HttpException, HttpStatus } from '@nestjs/common';

export class FailedToGetCampaignError extends HttpException {
  constructor() {
    super(
      { success: false, message: 'Failed to get campaings.' },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
