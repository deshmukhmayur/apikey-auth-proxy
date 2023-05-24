import { NextFunction, Request, Response } from 'express';
import { Options, createProxyMiddleware } from 'http-proxy-middleware';

export default function getProxyResolver(options: Options) {
  const resolver = (req: Request, res: Response, next: NextFunction) => {
    const proxy = createProxyMiddleware({
      ...options,
      headers: {
        ...options.headers,
        'x-forwarded-user': res.locals.userId,
      },
    });

    proxy(req, res, next);
  };

  return resolver;
}
