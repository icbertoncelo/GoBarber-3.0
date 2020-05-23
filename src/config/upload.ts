import { diskStorage, StorageEngine } from 'multer';
import { resolve } from 'path';
import { randomBytes } from 'crypto';

const tmpDirectory = resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder: tmpDirectory,
  uploadsFolder: resolve(tmpDirectory, 'uploads'),

  multer: {
    storage: diskStorage({
      destination: tmpDirectory,
      filename(request, file, callback) {
        const hash = randomBytes(10).toString('HEX');
        const fileName = `${hash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },
  config: {
    aws: {
      bucket: process.env.AWS_BUCKET,
    },
  },
} as IUploadConfig;
