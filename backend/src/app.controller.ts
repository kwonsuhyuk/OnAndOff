import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from './auth/decorators/public.decorator';

@ApiTags('system')
@Controller()
export class AppController {
  @Public()
  @Get('health')
  @ApiOperation({ summary: 'API 상태 확인' })
  health() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
