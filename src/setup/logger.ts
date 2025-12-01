import pino from 'pino';
import pinoHttp from 'pino-http';

const logger = pino();

export const pinoMiddleware = pinoHttp({
  logger: pino(),
  redact: {
    paths: ['req.headers.x-api-key', 'req.headers.authorization'],
    censor: '[REDACTED]',
  },
});

export default logger;
