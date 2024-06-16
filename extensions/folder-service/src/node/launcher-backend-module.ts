/********************************************************************************
 * Copyright (C) 2022 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the MIT License, which is available in the project root.
 *
 * SPDX-License-Identifier: MIT
 ********************************************************************************/

import { ContainerModule } from '@theia/core/shared/inversify';
import { TheiaLauncherServiceEndpoint } from './launcher-endpoint';
import { BackendApplicationContribution } from '@theia/core/lib/node/backend-application';

import { EchoApiEndpoint } from './echo-endpoint';
import { MemoryTracker } from './runtime-endpoint';

 
export default new ContainerModule(bind => {
    bind(TheiaLauncherServiceEndpoint).toSelf().inSingletonScope();
    bind(BackendApplicationContribution).toService(TheiaLauncherServiceEndpoint);

    bind(EchoApiEndpoint).toSelf().inSingletonScope();
    bind(BackendApplicationContribution).toService(EchoApiEndpoint);

    bind(MemoryTracker).toSelf().inSingletonScope();
    bind(BackendApplicationContribution).toService(MemoryTracker);

    console.log('🪝 EchoApiEndpoint & MemoryTracker')
});
