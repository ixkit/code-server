/**
 * Generated using theia-extension-generator
 */
import { LabelProviderContribution } from "@theia/core/lib/browser";
import { ContainerModule } from "@theia/core/shared/inversify";
import { FileClassifyLabelProviderContribution,MainFile_classifyLabelProviderContribution } from './file-classify-contribution';
import '../../src/browser/style/file-classify.css';

export default new ContainerModule(bind => {
    bind(LabelProviderContribution).to(FileClassifyLabelProviderContribution);
    bind(LabelProviderContribution).to(MainFile_classifyLabelProviderContribution);
});
