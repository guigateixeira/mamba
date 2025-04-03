import { HttpException, HttpStatus } from '@nestjs/common';

export class CampaignCreationError extends HttpException {
  constructor(
    message: string,
    httpStatus: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super({ success: false, message }, httpStatus);
  }
}

export class CampaignDeletionError extends HttpException {
  constructor(
    message: string,
    httpStatus: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super({ success: false, message }, httpStatus);
  }
}
