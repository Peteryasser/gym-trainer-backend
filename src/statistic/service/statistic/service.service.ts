import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { config as dotenvConfig } from 'dotenv';
import { CreateMeasurementDto } from 'src/statistic/dtos/measurement.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { ConnectionManager } from 'src/config/connection_manager';
import { Measurements } from 'src/entity/measurements.entity';
import { Muscle } from 'src/entity/muscle';
import * as moment from 'moment';
import { WorkoutHistory } from 'src/entity/user-workout-history';
import { addHours } from 'date-fns';



dotenvConfig({ path: '.env' });
@Injectable()
export class StatisticService {
      constructor( 
      @InjectRepository(Measurements)
      private measurementRepository: Repository<Measurements>,
      @InjectRepository(Muscle)
      private  muscleRepository: Repository<Muscle>,
      @InjectRepository(WorkoutHistory)
    private readonly workoutHistoryRepository: Repository<WorkoutHistory>,
      ) {}

      async create(createMeasurementDto: CreateMeasurementDto, user: User): Promise<any> {
        const connection = await ConnectionManager.getConnection();
        let message = '';
        const measurement = new Measurements;
        measurement.user = user;
        measurement.date = new Date();
        measurement.weight = createMeasurementDto.weight;
        measurement.height = createMeasurementDto.height;
        measurement.body_fat = createMeasurementDto.bodyFat;
        measurement.weight_goal = createMeasurementDto.weightGoal;
        measurement.waist = createMeasurementDto.waist;
        measurement.neck = createMeasurementDto.neck;
        measurement.shoulders = createMeasurementDto.shoulders;
        measurement.chest = createMeasurementDto.chest;
        measurement.arm = createMeasurementDto.arm;
        measurement.forearm = createMeasurementDto.forearm;
        measurement.wrist = createMeasurementDto.wrist;
        measurement.hips = createMeasurementDto.hips;
        measurement.thighs = createMeasurementDto.thighs;
        measurement.calf = createMeasurementDto.calf;

        await connection.manager.save(measurement);
        message = 'measurement added successfully';

        return message;
      }

      async getUserWeightsByUserId(userId: number): Promise<{ weight: number; data: Date }[]> {
        const measurements = await this.measurementRepository.createQueryBuilder('measurement')
          .select(['measurement.weight', 'measurement.date'])
          .where('measurement.user_id = :userId', { userId })
          .orderBy('measurement.date', 'ASC')
          .getMany();

        if (!measurements) throw new NotFoundException('User have not weight measurements');
          
        return measurements.map(measurement => ({
          weight: measurement.weight,
          data: measurement.date,
        }));
      }

      async getUserHeightsByUserId(userId: number): Promise<{ height: number; data: Date }[]> {
        const measurements = await this.measurementRepository.createQueryBuilder('measurement')
          .select(['measurement.height', 'measurement.date'])
          .where('measurement.user_id = :userId', { userId })
          .orderBy('measurement.date', 'ASC')
          .getMany();

        if (!measurements) throw new NotFoundException('User have not height measurements');
          
        return measurements.map(measurement => ({
          height: measurement.height,
          data: measurement.date,
        }));
      }

      async getUserBodyFatsByUserId(userId: number): Promise<{ body_fat: number; data: Date }[]> {
        const measurements = await this.measurementRepository.createQueryBuilder('measurement')
          .select(['measurement.body_fat', 'measurement.date'])
          .where('measurement.user_id = :userId', { userId })
          .orderBy('measurement.date', 'ASC')
          .getMany();

        if (!measurements) throw new NotFoundException('User have not body_fat measurements');
          
        return measurements.map(measurement => ({
          body_fat: measurement.body_fat,
          data: measurement.date,
        }));
      }

      async getUserTrainedMuscles(userId: number, timeFilter: string): Promise<any> {
        try {
          const { startDate, endDate } = this.getDateRange(timeFilter);
        
          const mainMusclesQuery = this.muscleRepository.createQueryBuilder('muscle')
            .leftJoin('muscle.mainFocusExercises', 'mainExercises')
            .leftJoin('mainExercises.workoutExercises', 'workoutExercise')
            .leftJoin('workoutExercise.workout', 'workout')
            .leftJoin('workout.userHistory', 'workoutHistory')
            .leftJoin('workoutHistory.user', 'user')
            .where('user.id = :userId', { userId })
            .andWhere('workoutHistory.date BETWEEN :startDate AND :endDate', { startDate, endDate })
            .select('muscle.id', 'id')
            .addSelect('muscle.name', 'name')
            .addSelect('COUNT(workoutHistory.id)', 'mainCount')
            .groupBy('muscle.id');
        
          const secondaryMusclesQuery = this.muscleRepository.createQueryBuilder('muscle')
            .leftJoin('muscle.secondaryFocusExercises', 'secondaryExercises')
            .leftJoin('secondaryExercises.workoutExercises', 'secondaryWorkoutExercise')
            .leftJoin('secondaryWorkoutExercise.workout', 'secondaryWorkout')
            .leftJoin('secondaryWorkout.userHistory', 'secondaryWorkoutHistory')
            .leftJoin('secondaryWorkoutHistory.user', 'secondaryUser')
            .where('secondaryUser.id = :userId', { userId })
            .andWhere('secondaryWorkoutHistory.date BETWEEN :startDate AND :endDate', { startDate, endDate })
            .select('muscle.id', 'id')
            .addSelect('muscle.name', 'name')
            .addSelect('COUNT(secondaryWorkoutHistory.id)', 'secondaryCount')
            .groupBy('muscle.id');
        
          const mainMuscles = await mainMusclesQuery.getRawMany();
          const secondaryMuscles = await secondaryMusclesQuery.getRawMany();
        
          const muscleCounts = mainMuscles.map(main => {
            const secondary = secondaryMuscles.find(sec => sec.id === main.id) || { secondaryCount: 0 };
            return {
              id: main.id,
              name: main.name,
              mainCount: parseInt(main.mainCount, 10),
              secondaryCount: parseInt(secondary.secondaryCount, 10),
              totalCount: parseInt(main.mainCount, 10) + parseInt(secondary.secondaryCount, 10)
            };
          });
        
          const secondaryOnlyMuscles = secondaryMuscles.filter(sec => !mainMuscles.some(main => main.id === sec.id)).map(sec => ({
            id: sec.id,
            name: sec.name,
            mainCount: 0,
            secondaryCount: parseInt(sec.secondaryCount, 10),
            totalCount: parseInt(sec.secondaryCount, 10)
          }));
        
          return [...muscleCounts, ...secondaryOnlyMuscles];
        } catch (error) {
          throw new Error('Error while loading muscle counts');
        }
      }
    
      private getDateRange(timeFilter: string) {
        let startDate: string;
        let endDate: string;
    
        switch (timeFilter) {
          case 'thisDay':
            startDate = moment().startOf('day').toISOString();
            endDate = moment().endOf('day').toISOString();
            break;
          case 'thisWeek':
            startDate = moment().startOf('week').toISOString();
            endDate = moment().endOf('week').toISOString();
            break;
          case 'thisMonth':
            startDate = moment().startOf('month').toISOString();
            endDate = moment().endOf('month').toISOString();
            break;
          case 'thisYear':
            startDate = moment().startOf('year').toISOString();
            endDate = moment().endOf('year').toISOString();
            break;
          case 'allTime':
          default:
            startDate = '1900-01-01T00:00:00.000Z';
            endDate = moment().toISOString();
            break;
          }
        
        return { startDate, endDate };
      }

      async getLastMeasurementsForUser(userId: number): Promise<Omit<Measurements, 'date'>> {
        const columns = [
          'weight', 'height', 'body_fat', 'weight_goal', 'waist', 'neck', 'shoulders', 
          'chest', 'arm', 'forearm', 'wrist', 'hips', 'thighs', 'calf'
        ];
        
        const latestMeasurement: Partial<Measurements> = {};
    
        for (const column of columns) {
          const latestRecord = await this.measurementRepository
            .createQueryBuilder('measurement')
            .select([`measurement.${column}`])
            .where('measurement.user_id = :userId', { userId })
            .andWhere(`measurement.${column} IS NOT NULL`)
            .orderBy('measurement.date', 'DESC')
            .getOne();
    
          if (latestRecord) {
            latestMeasurement[column] = latestRecord[column];
          }
        }
    
        return latestMeasurement as Omit<Measurements, 'date'>;
      }

      async getUserTrainingDays(userId: number, year: number, month: number): Promise<string[]> {
        try {
          const queryBuilder = this.workoutHistoryRepository
            .createQueryBuilder('workoutHistory')
            .select('DISTINCT DATE("workoutHistory"."date")', 'date')
            .where('workoutHistory.user_id = :userId', { userId })
            .andWhere('DATE_PART(\'year\', "workoutHistory"."date") = :year', { year })
            .andWhere('DATE_PART(\'month\', "workoutHistory"."date") = :month', { month })
            .orderBy('DATE("workoutHistory"."date")', 'ASC');
    
          const queryResult = await queryBuilder.getRawMany();
          const dates = queryResult.map(result => new Date(result.date));
          
          // Adjusting dates to ensure they are correct
          const adjustedDates = dates.map(date => addHours(date, 24));
          const uniqueDates = adjustedDates.map(date => date.toISOString().split('T')[0]);
    
          return uniqueDates;
        } catch (error) {
          console.error('Error in getUserTrainingDays:', error);
          throw new InternalServerErrorException('Failed to fetch training days');
        }
      }
}
