import { Controller, Get, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import * as DTO from 'src/dto/dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('/covid-19')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: '코로나 19 감염 현황 데이터 조회',
    description: 'https://www.data.go.kr/index.do',
  })
  async getCovidData(
    @Query() query: DTO.GetCovidDataReqQueryDTO,
    @Res() res: Response,
  ) {
    const result = await this.appService.getCovidData(query);
    res.status(result.code).json(result);
  }
}
