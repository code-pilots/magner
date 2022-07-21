import type {
  DevelopmentConfig,
} from 'lib/types/configs/development';

export type DevelopmentController = () => DevelopmentConfig;

export const developmentController = (config: DevelopmentConfig): DevelopmentController => () => config;

export { validationController } from '../validation';
