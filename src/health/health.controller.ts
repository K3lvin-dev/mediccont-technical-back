import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, TypeOrmHealthIndicator, HealthCheck } from '@nestjs/terminus';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('health')  // Categoria para o Swagger
@Controller('health')
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly db: TypeOrmHealthIndicator,
    ) { }

    @Get('readiness')
    @ApiOperation({ summary: 'Verifica a prontidão do serviço (readiness)' })
    @ApiResponse({ status: 200, description: 'Serviço pronto para receber tráfego.' })
    @ApiResponse({ status: 503, description: 'Serviço não está pronto.' })
    @HealthCheck()
    readiness() {
        return this.health.check([
            async () => this.db.pingCheck('database'),
        ]);
    }

    @Get('writeness')
    @ApiOperation({ summary: 'Verifica a capacidade de escrita do serviço (writeness)' })
    @ApiResponse({ status: 200, description: 'Serviço pode gravar dados.' })
    @ApiResponse({ status: 503, description: 'Serviço não pode gravar dados.' })
    @HealthCheck()
    writeness() {
        return this.health.check([
            async () => this.db.pingCheck('database', { timeout: 1000 }),
        ]);
    }
}
