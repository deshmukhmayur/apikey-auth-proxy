import { NextFunction, Request, Response } from 'express';
import { generateHash, isValidToken } from '../utils/api-token';
import APIKeys from '../models/apikeys';
import { ENABLE_API_KEY_AUTH } from '../setup/env';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  /* Skip this middleware if API Key auth is disabled */
  if (!ENABLE_API_KEY_AUTH) {
    return next();
  }
  /* Skip if the request is for /_api endpoint */
  if (req.path.startsWith('/_api')) {
    return next();
  }

  /* Get the API Key from the header */
  const apiKey = req.header('x-api-key');

  try {
    if (!apiKey) {
      throw new Error('API Key not found. Please proide a key in the `X-API-Key` header.');
    }
    if (!isValidToken(apiKey)) {
      throw new Error('Invalid API Key');
    }
    /* lookup apikey in database */
    const hashKey = generateHash(apiKey);
    const existingKey = await APIKeys.findOne({ hashKey }).exec();
    if (!existingKey) {
      throw new Error('Invalid API Key');
    }

    /* Store the user details from the api key in the response */
    res.locals.userId = existingKey.createdBy;

    next();
  } catch (error: any) {
    res.status(401).json({
      error: error.message,
    });
  }
};
