import { Controller, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BucketService } from './bucket.service';
import { imageFileFilter } from '../utils/image-uploading.utils';
import { UploadImageResponseDTO } from './dto/upload-image-response';

@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  // TODO
  // @Post(':userId/images')
  // @UseInterceptors(
  //   FilesInterceptor('images', null, {
  //     fileFilter: imageFileFilter,
  //   }),
  // )
  // async uploadImages(
  //   @Param('userId') userId: string,
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  // ): Promise<UploadImageResponseDTO> {
  //   return await this.bucketService.put(userId, files);
  // }
}
