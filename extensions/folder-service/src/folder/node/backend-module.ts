 
import { ContainerModule } from '@theia/core/shared/inversify'; 
import { BackendApplicationContribution } from '@theia/core/lib/node/backend-application';
import { ServiceApiEndpoint } from './service-endpoint';
 
export default new ContainerModule(bind => {
    bind(ServiceApiEndpoint).toSelf().inSingletonScope();
    bind(BackendApplicationContribution).toService(ServiceApiEndpoint);
  
    console.log('🪝 ServiceApiEndpoint')
});
