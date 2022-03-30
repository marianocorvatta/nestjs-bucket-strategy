import { Injectable } from '@nestjs/common';
import { randomName } from 'src/utils/random-value';

import { UploadImageResponseDTO } from './dto/upload-image-response';
import { UploadImageDTO } from './dto/upload-image.dto';
import { StorageTypeEnum } from './strategy/bucket.enum';

@Injectable()
export class BucketService {
  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async put(uploadImageDTO: UploadImageDTO): Promise<UploadImageResponseDTO> {
    return { fileName: null, storage: StorageTypeEnum.LOCAL_HOST };
  }

  dtoToStrategy(uploadImageDTO: UploadImageDTO) {
    const mimeType = uploadImageDTO.mimeType;
    const fileExtension = mimeType.split('/')[1];
    const fileName = `${randomName()}.${fileExtension}`;
    const base64Buffer = Buffer.from(
      uploadImageDTO.base64.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );
    return { mimeType, fileName, base64Buffer };
  }

}
