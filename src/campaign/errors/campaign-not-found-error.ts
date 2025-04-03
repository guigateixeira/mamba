import { HttpException, HttpStatus } from '@nestjs/common';

export class CampaignNotFoundError extends HttpException {
  constructor() {
    super(
      { success: false, message: 'Campaign not found.' },
      HttpStatus.NOT_FOUND,
    );
  }
}
