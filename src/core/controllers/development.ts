import type {
  DevelopmentConfig, UrlParsers, ErrorParser, ProfileRequest,
} from 'core/types/configs';

export type DevelopmentController = () => DevelopmentConfig;

export const developmentController = (config: DevelopmentConfig): DevelopmentController => () => config;

export const urlParsersController = (config: UrlParsers): UrlParsers => config;
export const errorParserController = (parser: ErrorParser): ErrorParser => parser;
export const profileRequestController = (request: ProfileRequest): ProfileRequest => request;
