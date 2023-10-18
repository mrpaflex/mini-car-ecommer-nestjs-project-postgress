import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResportsDto } from './dto/report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserReports } from './entity/report.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entity/user.entity';
import { ApprovedReportDto } from './dto/approved.report.dto';
import { EstimatedDto } from './dto/get-estimate.dto';

@Injectable()
export class ReportService {
  
    constructor(@InjectRepository(UserReports)
    private reportRepository: Repository<UserReports>
    ){}
    async createReport(userId: UserEntity,  reportdto:ResportsDto ): Promise<UserReports> {
       
        const report = await this.reportRepository.create(reportdto)
        report.user = userId//this is amazing

        return await this.reportRepository.save(report)
    }

    async changeApproval(id: string, approvedreportdto: ApprovedReportDto) {
      const report = await this.reportRepository.findOne({where: {
        id: parseInt(id)
      }})
      if (!id) {
        throw new HttpException('report not found', HttpStatus.UNPROCESSABLE_ENTITY)
      }
      report.approved = approvedreportdto.approved

      return await this.reportRepository.save(report)
    }

   async getestimateCar(estimatecars: EstimatedDto){
        const query = this.reportRepository.createQueryBuilder()
        .select('AVG(price)', 'price')
        .where('make =:make', {make: estimatecars.make})
        .andWhere('model = :model', {model: estimatecars.model})
        .andWhere('lng-:lng BETWEEN -25 AND 25', {lng: estimatecars.lng})
        .andWhere('lat-:lat BETWEEN -20 AND 20', {lat: estimatecars.lat})
        .andWhere('year-:year BETWEEN -10 AND 10', {year: estimatecars.year})
        .andWhere('approved=:approved', {approved: true})
        .orderBy('ABS(mileage - :mileage)', 'DESC')
        .setParameters({mileage: estimatecars.mileage})
        .limit(3)
        .getRawOne()

        return query

    }
}


