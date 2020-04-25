import { diskStorage } from 'multer';
import { resolve } from 'path';
import { randomBytes } from 'crypto';

export default {
  storage: diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp'),
    filename(request, file, callback) {
      const hash = randomBytes(10).toString('HEX');
      const fileName = `${hash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
