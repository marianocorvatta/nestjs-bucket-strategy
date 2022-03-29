import { StorageTypeEnum } from '../strategy/bucket.enum';

export class UploadImageResponseDTO {
  fileName: string;
  storage: StorageTypeEnum;
}
