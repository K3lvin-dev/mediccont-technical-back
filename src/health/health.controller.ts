import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, TypeOrmHealthIndicator, HealthCheck } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly db: TypeOrmHealthIndicator,
    ) { }

    @Get('readiness')
    @HealthCheck()
    readiness() {
        return this.health.check([
            async () => this.db.pingCheck('database'),
        ]);
    }

    @Get('writeness')
    @HealthCheck()
    writeness() {
        return this.health.check([
            async () => this.db.pingCheck('database', { timeout: 1000 }),
        ]);
    }
}
