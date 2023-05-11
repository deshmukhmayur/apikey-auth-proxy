import crypto from 'crypto';
import Base62Token from 'base62-token';

var dict = Base62Token.generateDictionary();
var b62Token = Base62Token.create(dict);

/**
 * Creates a new token with a 6 digit crc32 + base62 encoded checksum
 * 
 * Inspired by GitHub's auth token format:
 * https://github.blog/2021-04-05-behind-githubs-new-authentication-token-formats/
 * 
 * @param prefix prefix the token with `prefix`
 */
export const generateToken = (prefix: string) => {
  return b62Token.generate(prefix, 30);
}

/**
 * Verify if the API Token is a valid using by checking it's checksum
 * @param token api token as a string
 * @returns true/false
 */
export const isValidToken = (token: string) => {
  return b62Token.verify(token);
}

/**
 * Generate a hash for the input string
 * @param token string to hash
 * @returns `sha256` hash in `hex` format
 */
export const generateHash = (token: string) => {
  return crypto.createHash('sha256').update(token).digest('hex');
}
