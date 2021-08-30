import { ManifestConfig } from '../../types/configs';
import globalValues from '../../global';

export type ManifestController = () => ManifestConfig;

export const manifestController = (config: ManifestConfig): ManifestController => () => config;
