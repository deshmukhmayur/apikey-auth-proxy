import pino from 'pino';
import pinoHttp from 'pino-http';

const logger = pino();

export const pinoMiddleware = pinoHttp({
  logger: pino(),
});

export default logger;
