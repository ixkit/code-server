/**
 * Generated using theia-extension-generator
 */
import { LabelProviderContribution } from "@theia/core/lib/browser";
import { ContainerModule } from "@theia/core/shared/inversify";
import { File_classifyLabelProviderContribution,MainFile_classifyLabelProviderContribution } from './file_classify-contribution';
import '../../src/browser/style/example.css';

export default new ContainerModule(bind => {
    bind(LabelProviderContribution).to(File_classifyLabelProviderContribution);
    bind(LabelProviderContribution).to(MainFile_classifyLabelProviderContribution);
});
