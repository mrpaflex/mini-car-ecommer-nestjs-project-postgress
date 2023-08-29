import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserReports } from './entity/report.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([UserReports]) ],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}
