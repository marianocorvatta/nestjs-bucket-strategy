import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BucketModule } from './bucket/bucket.module';

@Module({
  imports: [BucketModule.register()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
