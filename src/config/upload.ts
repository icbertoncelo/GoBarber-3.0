import { diskStorage } from 'multer';
import { resolve } from 'path';
import { randomBytes } from 'crypto';

const tmpDirectory = resolve(__dirname, '..', '..', 'tmp');

export default {
  derectory: tmpDirectory,
  storage: diskStorage({
    destination: tmpDirectory,
    filename(request, file, callback) {
      const hash = randomBytes(10).toString('HEX');
      const fileName = `${hash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
