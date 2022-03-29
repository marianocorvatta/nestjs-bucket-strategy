export class UploadImageDTO {
  base64: string;

  mimeType: string;

  user_id: string;

  setValues(userId: string, file: Express.Multer.File) {
    this.base64 = file.buffer.toString('base64');
    this.mimeType = file.mimetype;
    this.user_id = userId;
  }
}
