import { Request, Response, Router } from 'express';
import { generateHash, generateToken } from '../utils/api-token';
import APIKeys from '../models/apikeys';

const getKey = async (req: Request, res: Response) => {
  const { keyId } = req.params;

  const apiKey = await APIKeys.findOne({ keyId }, { hashKey: 0, __v: 0, _id: 0 }).lean();

  if (!apiKey) {
    return res.status(404).json({
      error: 'Key does not exist',
    });
  }

  return res.status(200).json(apiKey);
};

const createKey = async (req: Request, res: Response) => {
  /* Generate a new key */
  const key = generateToken('opp_');
  const hashKey = generateHash(key);
  const body = req.body;

  try {
    const apiKey = await new APIKeys({
      ...body,
      hashKey,
      createdBy: res.locals.userId ?? 'test',
    }).save();

    return res.status(201).json({
      ...apiKey.toJSON(),
      apiKey: key,
    });
  } catch (error: any) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const renewKey = async (req: Request, res: Response) => {
  const { keyId } = req.params;

  const existingKey = await APIKeys.findOne({ keyId }).exec();

  if (!existingKey) {
    return res.status(404).json({
      error: 'Key does not exist',
    });
  }

  /* Generate a new key */
  const key = generateToken('opp_');
  const hashKey = generateHash(key);

  try {
    const apiKey = await APIKeys.findOneAndUpdate(
      { keyId },
      {
        apiKey: key,
        hashKey,
      },
      { new: true }
    ).exec();

    return res.status(200).json({
      ...apiKey!.toJSON(),
      apiKey: key,
    });
  } catch (error: any) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const deleteKey = async (req: Request, res: Response) => {
  const { keyId } = req.params;

  try {
    await APIKeys.findOneAndRemove({ keyId }).exec();

    return res.sendStatus(200);
  } catch (error: any) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const router = Router();
router.get('/:keyId', getKey);
router.post('/', createKey);
router.patch('/:keyId', renewKey);
router.delete('/:keyId', deleteKey);

export default router;
