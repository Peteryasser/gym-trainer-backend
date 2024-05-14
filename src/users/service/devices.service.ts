import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from 'src/entity/device.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private devicesRepository: Repository<Device>,
  ) {}

  findOneByFcmToken(fcmToken: string): Promise<Device | null> {
    return this.devicesRepository.findOneBy({ fcmToken });
  }

  async findOneByFcmTokenAndUserId(
    fcmToken: string,
    userId: number,
  ): Promise<Device> {
    return this.devicesRepository
      .createQueryBuilder('device')
      .where('device.fcmToken = :fcmToken', { fcmToken })
      .andWhere('device.user_id = :userId', { userId })
      .getOne();
  }

  create(device: Device): Promise<Device> {
    return this.devicesRepository.save(device);
  }

  update(
    deviceId: number,
    deviceInformation: Partial<Device>,
  ): Promise<UpdateResult> {
    return this.devicesRepository.update(deviceId, deviceInformation);
  }

  delete(deviceId: number): Promise<DeleteResult> {
    return this.devicesRepository.delete(deviceId);
  }

  async saveUserDevice(userId: number, fcmToken: string): Promise<Device> {
    let device = await this.findOneByFcmTokenAndUserId(fcmToken, userId);

    if (!device) {
      device = new Device();
      device.userId = userId;
      device.fcmToken = fcmToken;

      await this.create(device);
    } else {
      device.userId = userId;
      await this.devicesRepository.save(device);
    }

    return device;
  }
}
