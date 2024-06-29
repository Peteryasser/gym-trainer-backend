import { Body, Controller,Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { WorkoutHistory } from 'src/entity/user-workout-history';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { User } from 'src/entity/user.entity';
import { StatisticService } from 'src/statistic/service/statistic/service.service';
import { CreateMeasurementDto } from 'src/statistic/dtos/measurement.dto';
import { Measurements } from 'src/entity/measurements.entity';

@Controller('statistic')
@UseGuards(JwtAuthGuard)
export class StatisticController {
    constructor(private readonly statisticervice: StatisticService){}

    @Post('measurements')
    create(@Body() createMeasurementDto: CreateMeasurementDto, @GetUser() user: User): Promise<Measurements> {
        return this.statisticervice.create(createMeasurementDto, user);
    }

    @Get('userWeights')
    async getUserWeights(@GetUser() user: User):Promise<{ weight: number; data: Date }[]> {
        try{
            return await this.statisticervice.getUserWeightsByUserId(user.id)
        }catch{
            throw new Error("Error while loading weight measurements");
        }
    }

    @Get('userHeights')
    async getUserHeights(@GetUser() user: User):Promise<{ height: number; data: Date }[]> {
        try{
            return await this.statisticervice.getUserHeightsByUserId(user.id)
        }catch{
            throw new Error("Error while loading height measurements");
        }
    }

    @Get('userBodyFats')
    async getUserBodyFats(@GetUser() user: User):Promise<{ body_fat: number; data: Date }[]> {
        try{
            return await this.statisticervice.getUserBodyFatsByUserId(user.id)
        }catch{
            throw new Error("Error while loading body_fat measurements");
        }
    }

    @Get('TrainedMusclesCounts/:timeId')
    async getUserTrainedMusclesCounts(@GetUser() user: User,@Param('timeId') timeId: number){
        try {
            switch (timeId) {
                case 1:  
                    const muscleCountsThisDay = await this.statisticervice.getUserTrainedMuscles(user.id, 'thisDay');
                    return muscleCountsThisDay;
                case 2:
                    const muscleCountsThisWeek = await this.statisticervice.getUserTrainedMuscles(user.id, 'thisWeek');
                    return muscleCountsThisWeek;
                case 3:
                    const muscleCountsThisMonth = await this.statisticervice.getUserTrainedMuscles(user.id, 'thisMonth');
                    return muscleCountsThisMonth;
                case 4:
                    const muscleCountsThisYear = await this.statisticervice.getUserTrainedMuscles(user.id, 'thisYear');
                    return muscleCountsThisYear;
                case 5: 
                default:   
                    const muscleCountsAllTime = await this.statisticervice.getUserTrainedMuscles(user.id, 'allTime');
                    return muscleCountsAllTime;
            }
        } catch (error) {
            console.error('Error while loading muscle counts', error);
            throw error;
        } 
    }

    /*@Get('getMaxWeight/:userId')
    async getMaxWeight(@Param('userId') userId: number) {
        try{
            return await this.statisticervice.getMaxWeightPerWorkout(userId);
        }catch{
            throw new Error("Error while loading max weight per workout");
        }
    }*/
}
