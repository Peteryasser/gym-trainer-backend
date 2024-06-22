import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from '../../entity/device.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private devicesRepository: Repository<Device>,
  ) {}

  async findOneByFcmToken(fcmToken: string): Promise<Device> {
    return await this.devicesRepository.findOneBy({ fcmToken });
  }

  async findOneById(id: number): Promise<Device> {
    return await this.devicesRepository.findOneBy({ id });
  }

  async findOneByFcmTokenAndUserId(
    fcmToken: string,
    userId: number,
  ): Promise<Device> {
    return await this.devicesRepository
      .createQueryBuilder('device')
      .where('device.fcmToken = :fcmToken', { fcmToken })
      .andWhere('device.user_id = :userId', { userId })
      .getOne();
  }

  async create(device: Device): Promise<Device> {
    return await this.devicesRepository.save(device);
  }

  async update(
    deviceId: number,
    deviceInformation: Partial<Device>,
  ): Promise<UpdateResult> {
    return await this.devicesRepository.update(deviceId, deviceInformation);
  }

  async delete(deviceId: number): Promise<void> {
    const result = await this.devicesRepository.delete(deviceId);
    if (result.affected == 0) throw new NotFoundException('Device not found');
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
