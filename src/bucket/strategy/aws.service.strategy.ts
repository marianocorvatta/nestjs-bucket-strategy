import { Injectable, Logger } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

import { randomName } from '../../utils/random-value';
import { BucketService } from '../bucket.service';
import { UploadImageDTO } from '../dto/upload-image.dto';
import { UploadImageResponseDTO } from '../dto/upload-image-response';
import { StorageTypeEnum } from './bucket.enum';

export const s3Client = new S3Client({ region: process.env.AWS_REGION });

@Injectable()
export class AwsService implements BucketService {
  private readonly logger = new Logger('AwsService');

  async put(uploadImageDTO: UploadImageDTO): Promise<UploadImageResponseDTO> {
    const mimeType = uploadImageDTO.mimeType;
    const fileExtension = mimeType.split('/')[1];
    const fileName = `${randomName()}.${fileExtension}`;
    const base64Buffer = Buffer.from(
      uploadImageDTO.base64.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME || 'nest-api-template',
      Key: `images/${uploadImageDTO.user_id}/${fileName}`,
      Body: base64Buffer,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: mimeType,
    };

    try {
      await s3Client.send(new PutObjectCommand(params));
      this.logger.log(
        'Successfully created ' +
          params.Key +
          ' and uploaded it to ' +
          params.Bucket +
          '/' +
          params.Key,
      );
    } catch (err) {
      this.logger.error(
        `Error trying to upload image to AWS. Key: ${params.Key} ${err}`,
      );
    }

    return { fileName: params.Key, storage: StorageTypeEnum.AWS };
  }
}
