import { ManifestConfig } from '../../types/configs';

export type ManifestController = () => ManifestConfig;

export const manifestController = (config: ManifestConfig): ManifestController => () => config;
