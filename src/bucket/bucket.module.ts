import { ClassProvider, DynamicModule, Module, Type } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { BucketService } from './bucket.service';
import { AwsService } from './strategy/aws.service.strategy';
import { StorageTypeEnum } from './strategy/bucket.enum';
import { LocalService } from './strategy/local.service.strategy';
import { BucketController } from './bucket.controller';

dotenv.config();

@Module({})
export class BucketModule {
  public static register(): DynamicModule {
    const BucketClassProvider = BucketModule.getClassProvider();
    return {
      module: BucketModule,
      controllers: [BucketController],
      providers: [BucketClassProvider],
      exports: [BucketService],
    };
  }

  public static getClassProvider(): ClassProvider<BucketService> {
    const bucketStrategy = process.env.BUCKET_STRATEGY as StorageTypeEnum;

    const BucketServiceClass =
      BucketModule.getClassFromStrategy(bucketStrategy);
    return {
      provide: BucketService,
      useClass: BucketServiceClass,
    };
  }

  private static getClassFromStrategy(
    strategy: StorageTypeEnum,
  ): Type<BucketService> {
    switch (strategy) {
      case StorageTypeEnum.AWS:
        return AwsService;
      case StorageTypeEnum.LOCAL_HOST:
        return LocalService;
      default:
        return LocalService;
    }
  }
}
