import { CardConfig, LoginConfig, TableConfig } from 'lib/types';
import { Route, RouteBase } from 'lib/types/configs/new-routing';

export type SupportedRoutePresets = 'login'|'table'|'card'|'404'|'empty';

export interface RoutePresetBase {
  route: Route,
  preset: SupportedRoutePresets,
}

export interface LoginPreset extends RoutePresetBase {
  preset: 'login',
  config: LoginConfig,
}
export interface TablePreset extends RoutePresetBase {
  preset: 'table',
  config: TableConfig,
}
export interface CardPreset extends RoutePresetBase {
  preset: 'card',
  config: CardConfig,
}
export interface ErrorPreset extends RoutePresetBase {
  preset: '404',
  config: {},
}
export interface EmptyPreset extends RoutePresetBase {
  preset: 'empty',
  config: {},
}

export interface PresetRoute extends RouteBase {
  view: 'preset',
  preset:
    | LoginPreset
    | CardPreset
    | TablePreset
    | ErrorPreset
    | EmptyPreset,
}
