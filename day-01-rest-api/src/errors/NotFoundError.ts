import { AppError } from "./AppError.js";

export class NotFoundError extends AppError {
  constructor(
    message = "Resource not found",
    data ?: unknown,
    details?: unknown
  ) {
    super(message, {
      status: 404,
      code: "NOT_FOUND",
      data,
      details,
    });
  }
}