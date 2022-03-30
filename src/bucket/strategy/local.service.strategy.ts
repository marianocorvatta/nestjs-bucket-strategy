import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

import { randomName } from '../../utils/random-value';
import { BucketService } from '../bucket.service';
import { UploadImageResponseDTO } from '../dto/upload-image-response';
import { UploadImageDTO } from '../dto/upload-image.dto';
import { StorageTypeEnum } from './bucket.enum';

@Injectable()
export class LocalService extends BucketService {
  private readonly logger = new Logger('LocalServiceStrategy');

  async put(uploadImageDTO: UploadImageDTO): Promise<UploadImageResponseDTO> {
    const { fileName, base64Buffer } = this.dtoToStrategy(uploadImageDTO);

    try {
      await fs.writeFile(
        join(process.cwd(), 'images', fileName),
        base64Buffer,
        (err) => {
          err && this.logger.error(err);
        },
      );
    } catch (error) {
      this.logger.error(error);
      throw new ServiceUnavailableException(
        'The file upload service is having problems, please try again later.',
      );
    }

    return { fileName, storage: StorageTypeEnum.LOCAL_HOST };
  }
}
