import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import * as DTO from 'src/dto/dto';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  async getCovidData(query: DTO.GetCovidDataReqQueryDTO) {
    try {
      const urlParams = new URLSearchParams(
        `serviceKey=${encodeURI(process.env.OPEN_API_KEY)}`,
      );

      for (const key of Object.keys(query)) {
        urlParams.set(key, encodeURIComponent(query[key]));
      }

      const url = process.env.OPEN_API_END_POINT + '?' + urlParams;
      const openAPIResult = await this.httpService.get(url);
      const result = await lastValueFrom(openAPIResult);

      if (result?.data && result.data?.response?.header?.resultCode == 0) {
        return {
          data: result.data,
          code: HttpStatus.OK,
          message: 'Open API 데이터 조회 성공',
        };
      }

      return {
        data: null,
        code: HttpStatus.CONFLICT,
        message:
          result?.data?.response?.header?.resultMsg ??
          'Open API 데이터 조회 실패',
      };
    } catch (error) {
      throw { code: HttpStatus.CONFLICT, message: error };
    }
  }
}
