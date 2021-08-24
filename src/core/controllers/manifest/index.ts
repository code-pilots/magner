import { ManifestConfig } from 'core/types/configs';
import globalValues from 'core/global';

export type ManifestController = () => ManifestConfig;

export const manifestController = (config: ManifestConfig): ManifestController => () => config;
