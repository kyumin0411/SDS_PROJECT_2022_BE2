import { ApiProperty } from '@nestjs/swagger';

export class GetCovidDataReqQueryDTO {
  @ApiProperty({
    description: '검색할 생성일 범위의 시작 (20200310)',
  })
  startCreateDt: string;
  @ApiProperty({
    description: '검색할 생성일 범위의 종료 (20200315)',
  })
  endCreateDt: string;
  @ApiProperty({ description: '페이지 번호', default: 1, required: false })
  pageNo?: number = 1;
  @ApiProperty({
    description: '한 페이지 결과 수',
    default: 10,
    required: false,
  })
  numOfRows?: number = 10;
}
