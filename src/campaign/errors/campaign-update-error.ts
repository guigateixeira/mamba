import { HttpException, HttpStatus } from '@nestjs/common';

export class CampaignUpdateError extends HttpException {
  constructor(
    message: string,
    httpStatus: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super({ success: false, message }, httpStatus);
  }
}
