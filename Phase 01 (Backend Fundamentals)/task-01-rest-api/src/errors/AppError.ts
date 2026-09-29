export class AppError extends Error {
  status: number;
  code: string;
  details: unknown;
  data: unknown;

  constructor(
    message: string,
    {
      status = 500,
      code = "INTERNAL_ERROR",
      details = null,
      data = null,
    }: {
      status?: number;
      code?: string;
      details?: unknown;
      data?: unknown;
    } = {}
  ) {
    super(message);

    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
    this.details = details;
    this.data = data;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}