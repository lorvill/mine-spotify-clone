import pino from "pino";

const logger = pino({
  level: process.env.LOG_LEVEL || "debug",
  transport: process.env.NODE_ENV !== "production" ? {
    target: "pino-pretty",
    options: {
      translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
    }
  }
  : undefined
})

export default logger
