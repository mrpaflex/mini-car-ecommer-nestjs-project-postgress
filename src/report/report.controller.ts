import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ResportsDto } from './dto/report.dto';
import { ReportService } from './report.service';
import { AuthGuards } from 'src/guards/auth.guards';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { UserEntity } from 'src/users/entity/user.entity';
import { Serialized } from 'src/interceptors/user.interceptor';
import { ReportSerilizedDto } from './dto/report.serilized.dto';
import { ApprovedReportDto } from './dto/approved.report.dto';
import { AdminGuards } from 'src/guards/admin.guards';
import { EstimatedDto } from './dto/get-estimate.dto';

@Controller('car')
export class ReportController {
    constructor(private reportService: ReportService){}

    
   
    @Post('postcar')
    @UseGuards(AuthGuards)
    @Serialized(ReportSerilizedDto)
  async  createReport(@CurrentUser() userId: UserEntity, @Body() reportdto: ResportsDto){
        return await this.reportService.createReport(userId, reportdto)
    }

    
    @Patch('approval/:id')
    @UseGuards(AdminGuards)
    async approvedAreport(@Param('id') id: string, @Body() approvedreportdto: ApprovedReportDto){
        return await this.reportService.changeApproval(id, approvedreportdto)
    }

    @Get()
    async getcarEstimate(@Query() query: EstimatedDto){
        return await this.reportService.getestimateCar(query)
    }
}
