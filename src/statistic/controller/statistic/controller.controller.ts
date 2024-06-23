import { Controller,Get, Param } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { WorkoutHistory } from 'src/entity/user-workout-history';
import { User } from 'src/entity/user.entity';
import { StatisticService } from 'src/statistic/service/statistic/service.service';

@Controller('statistic')
export class StatisticController {
    constructor(private readonly statisticervice: StatisticService){    }
    @Get('get_user/:id')
    async findOneById(@Param('id')id:number):Promise<User>{
        try{
            return await this.statisticervice.findOneById(id)
        }catch{
            throw new Error("Error while loading ingredients");;
        }
    }
    @Get('get_his/:id')
    async getMyHistory (@Param('id')id:number):Promise<WorkoutHistory>{
        try{
            return await this.statisticervice.getMyHistory(id)
        }catch{
            throw new Error("Error while loading ingredients");;
        }
    }
    /*@Get('getHistory')
    async getMyHistory(@GetUser() user: User): Promise<WorkoutHistory[]> {
        console.log('getMyHistory');
        return this.statisticervice.getMyHistory(user);
    }*/
}
