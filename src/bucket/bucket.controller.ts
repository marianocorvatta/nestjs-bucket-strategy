import { Controller, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BucketService } from './bucket.service';
import { imageFileFilter } from '../utils/image-uploading.utils';
import { UploadImageResponseDTO } from './dto/upload-image-response';
import { UploadImageDTO } from './dto/upload-image.dto';

@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  @Post(':userId/images')
  @UseInterceptors(
    FileInterceptor(
      'image',
      {
        fileFilter: imageFileFilter,
      }
    ),
  )
  async uploadImages(
    @Param('userId') userId: string,
    @UploadedFiles() file: Express.Multer.File,
  ): Promise<UploadImageResponseDTO> {
    const uploadImageDTO = new UploadImageDTO;
    uploadImageDTO.setValues(userId, file);
    return await this.bucketService.put(uploadImageDTO);
  }
}
