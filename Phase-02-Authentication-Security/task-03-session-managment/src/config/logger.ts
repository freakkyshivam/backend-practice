import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",

  redact: [
    "req.headers.authorization",
    "req.headers.cookie",
    "password",
    "passwordHash",
    "otp",
    "sessionToken",
  ],

  ...(process.env.NODE_ENV === "development" && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
      },
    },
  }),
});
