/* eslint-disable prettier/prettier */
export default class ApiResponse {
  status: 'error' | 'success';
  statusCode: number;
  message: string;

  constructor(
    status: 'error' | 'success',
    statusCode: number,
    message: string | null = null,
  ) {
    this.status = status;
    this.statusCode = statusCode;
    this.message = message;
  }
}
