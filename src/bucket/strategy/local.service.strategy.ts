import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

import { randomName } from '../../utils/random-value';
import { BucketService } from '../bucket.service';
import { UploadImageResponseDTO } from '../dto/upload-image-response';
import { UploadImageDTO } from '../dto/upload-image.dto';
import { StorageTypeEnum } from './bucket.enum';

@Injectable()
export class LocalService implements BucketService {
  private readonly logger = new Logger('LocalService');

  async put(uploadImageDTO: UploadImageDTO): Promise<UploadImageResponseDTO> {
    const mimeType = uploadImageDTO.mimeType;
    const fileExtension = mimeType.split('/')[1];
    const fileName = `${randomName()}.${fileExtension}`;
    const base64Buffer = Buffer.from(
      uploadImageDTO.base64.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );
    await fs.writeFile(
      join(process.cwd(), 'images', fileName),
      base64Buffer,
      (err) => {
        err && this.logger.error(err);
      },
    );

    return { fileName, storage: StorageTypeEnum.LOCAL_HOST };
  }
}
