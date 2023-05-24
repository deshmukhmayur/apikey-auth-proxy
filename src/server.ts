import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import apiKeyRouter from './resolvers/apikeys';
import { ENABLE_API_KEY_AUTH, ROUTE_CONFIG_PATH } from './setup/env';
import logger, { pinoMiddleware } from './setup/logger';
import { auth } from './middlewares/auth';
import getProxyResolver from './resolvers/proxy';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { parse } from 'yaml';

const server = express();

server.use(cors());
server.use(pinoMiddleware);

server.get('/__ping', (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    ok: true,
  });
});

if (ENABLE_API_KEY_AUTH) {
  /* Setting up routes for API Key management */
  /** 
   * Body parser middleware added only to this route as it has a tendency to break the http-proxy-middleware 
   * Ref: https://github.com/chimurai/http-proxy-middleware/issues/40#issuecomment-163398924
  */
  server.use('/_api/apikeys', bodyParser.json(), apiKeyRouter);
}

/* Creating proxy handlers for all the routes defined in config.routes */
logger.info('Loading route config from ' + ROUTE_CONFIG_PATH);
const config: YamlConfig = parse(
  readFileSync(resolve(ROUTE_CONFIG_PATH)).toString()
);
Object.entries(config.routes).forEach((route) => {
  const [path, options] = route;
  logger.info('Registered path: ' + path + ' -> ' + options.target);
  server.use(path, [auth], getProxyResolver(options));
});

server.use('*', (_: Request, res: Response) => {
  return res.status(404).json({
    error: 'Requested resource not found',
  });
});

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({
    error: err.message,
  });
});

export default server;
