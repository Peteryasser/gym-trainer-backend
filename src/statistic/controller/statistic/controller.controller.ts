import { Body, Controller,Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { GetUser } from '../../../auth/decorators/get-user.decorator';
import { WorkoutHistory } from '../../../entity/user-workout-history.entity';
import { JwtAuthGuard } from '../../../auth/guards/jwt.auth.guard';
import { User } from '../../../entity/user.entity';
import { StatisticService } from '../../../statistic/service/statistic/service.service';
import { CreateMeasurementDto } from '../../../statistic/dtos/measurement.dto';
import { Measurements } from '../../../entity/measurements.entity';
import { Coach } from '../../../entity/coach.entity';

@Controller('statistic')
@UseGuards(JwtAuthGuard)
export class StatisticController {
    constructor(private readonly statisticService: StatisticService){}

    @Post('measurements')
    create(@Body() createMeasurementDto: CreateMeasurementDto, @GetUser() user: User): Promise<Measurements> {
        return this.statisticService.create(createMeasurementDto, user);
    }

    @Get('getUserStatisticsByCoach/:userId/:timeId/:year/:month')
    async getUserStatisticsByCoach(@Param('userId') userId: number, @GetUser() coach: Coach, @Param('timeId') timeId: number, @Param('year', ParseIntPipe) year: number, @Param('month', ParseIntPipe) month: number){
        try{
            switch (timeId) {
                case 1:  
                    return await this.statisticService.getUserStatisticsByCoach(userId,coach,'thisDay',year,month);
                case 2:
                    return await this.statisticService.getUserStatisticsByCoach(userId,coach,'thisWeek',year,month);
                case 3:
                    return await this.statisticService.getUserStatisticsByCoach(userId,coach,'thisMonth',year,month);
                case 4:
                    return await this.statisticService.getUserStatisticsByCoach(userId,coach,'thisYear',year,month)
                case 5: 
                default:   
                    return await this.statisticService.getUserStatisticsByCoach(userId,coach,'allTime',year,month)
            }
        }catch(error){
            throw new Error(error);
        }
    }

    @Get('userWeights')
    async getUserWeights(@GetUser() user: User):Promise<{ weight: number; data: Date }[]> {
        try{
            return await this.statisticService.getUserWeightsByUserId(user.id)
        }catch{
            throw new Error("Error while loading weight measurements");
        }
    }

    @Get('userHeights')
    async getUserHeights(@GetUser() user: User):Promise<{ height: number; data: Date }[]> {
        try{
            return await this.statisticService.getUserHeightsByUserId(user.id)
        }catch{
            throw new Error("Error while loading height measurements");
        }
    }

    @Get('userBodyFats')
    async getUserBodyFats(@GetUser() user: User):Promise<{ body_fat: number; data: Date }[]> {
        try{
            return await this.statisticService.getUserBodyFatsByUserId(user.id)
        }catch{
            throw new Error("Error while loading body_fat measurements");
        }
    }

    @Get('TrainedMusclesCounts/:timeId')
    async getUserTrainedMusclesCounts(@GetUser() user: User,@Param('timeId') timeId: number){
        try {
            switch (timeId) {
                case 1:  
                    const muscleCountsThisDay = await this.statisticService.getUserTrainedMuscles(user.id, 'thisDay');
                    return muscleCountsThisDay;
                case 2:
                    const muscleCountsThisWeek = await this.statisticService.getUserTrainedMuscles(user.id, 'thisWeek');
                    return muscleCountsThisWeek;
                case 3:
                    const muscleCountsThisMonth = await this.statisticService.getUserTrainedMuscles(user.id, 'thisMonth');
                    return muscleCountsThisMonth;
                case 4:
                    const muscleCountsThisYear = await this.statisticService.getUserTrainedMuscles(user.id, 'thisYear');
                    return muscleCountsThisYear;
                case 5: 
                default:   
                    const muscleCountsAllTime = await this.statisticService.getUserTrainedMuscles(user.id, 'allTime');
                    return muscleCountsAllTime;
            }
        } catch (error) {
            console.error('Error while loading muscle counts', error);
            throw error;
        } 
    }

    @Get('lastMeasurement')
    async getLastMeasurements(@GetUser() user: User): Promise<Omit<Measurements, 'date'>> {
      return this.statisticService.getLastMeasurementsForUser(user.id);
    }

    @Get('trainingDays/:year/:month')
    async getUserTrainingDays(@GetUser() user: User, @Param('year', ParseIntPipe) year: number, @Param('month', ParseIntPipe) month: number,): Promise<string[]> {
        return this.statisticService.getUserTrainingDays(user.id, year, month);
    }
}
