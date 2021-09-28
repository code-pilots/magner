import type {
  DevelopmentConfig, UrlParsers, ErrorParser, ProfileRequest,
} from '../../types/configs';

export type DevelopmentController = () => DevelopmentConfig;

export const developmentController = (config: DevelopmentConfig): DevelopmentController => () => config;

export const urlParsersController = (config: UrlParsers): UrlParsers => config;
export const errorParserController = <ERR = Record<string, unknown>>(parser: ErrorParser<ERR>)
  : ErrorParser<ERR> => parser;
export const profileRequestController = (request: ProfileRequest): ProfileRequest => request;
export { validationController } from '../validation';
