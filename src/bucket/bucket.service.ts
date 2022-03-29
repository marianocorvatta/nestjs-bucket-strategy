import { Injectable } from '@nestjs/common';

import { UploadImageResponseDTO } from './dto/upload-image-response';
import { UploadImageDTO } from './dto/upload-image.dto';
import { StorageTypeEnum } from './strategy/bucket.enum';

@Injectable()
export class BucketService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async put(uploadImageDTO: UploadImageDTO): Promise<UploadImageResponseDTO> {
    return { fileName: null, storage: StorageTypeEnum.LOCAL_HOST };
  }
}
