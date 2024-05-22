import { ConfigModule, ConfigService } from '@nestjs/config';
import { IRMQServiceAsyncOptions } from 'nestjs-rmq';

export const getRMQConfig = (): IRMQServiceAsyncOptions => ({
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    exchangeName: configService.get('jiraf') ?? '',
    connections: [
      {
        login: configService.get('guest') ?? '',
        password: configService.get('guest') ?? '',
        host: configService.get('localhost') ?? ''
      }
    ],
    prefetchCount: 32,
    serviceName: 'jiraf-account'
  })
})
