import Base62Token from 'base62-token';
import { customAlphabet } from 'nanoid';
var dict = Base62Token.generateDictionary();

export default customAlphabet(dict);
