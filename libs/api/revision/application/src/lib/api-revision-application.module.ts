import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TrackProgressUseCase } from './use-cases/track-progress.use-case';
import { RevisionFacade } from './boundaries/revision.facade';

@Module({
  imports: [CqrsModule],
  providers: [RevisionFacade, TrackProgressUseCase],
  exports: [RevisionFacade],
})
export class ApiRevisionApplicationModule {
  static withInfrastructure(
    infrastructure: ModuleMetadata['imports'] = []
  ): DynamicModule {
    return {
      module: ApiRevisionApplicationModule,
      imports: [...infrastructure],
    };
  }
}
