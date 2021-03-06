import { CardConfig, LoginConfig, TableConfig } from 'lib/types';
import { Route, RouteBase } from 'lib/types/configs/routing/routing';

export type SupportedRoutePresets = 'login'|'table'|'card'|'404';

export interface RoutePresetBase {
  preset: SupportedRoutePresets,
}

/**
 * Login page route preset. You define the form in the page and a request to the backend,
 * Magner handles the authorization and role management.
 */
export interface LoginPreset<ENTITY extends {} = any> extends RoutePresetBase {
  preset: 'login',
  config: LoginConfig<ENTITY>,
}

/**
 * Table page route preset. Depending on the config, displays the table of data, filters and pagination
 */
export interface TablePreset<ENTITY extends {} = any> extends RoutePresetBase {
  preset: 'table',
  config: TableConfig<ENTITY>,
}

/**
 * Card page route preset. Displays the form or a read-only card for management of the entity card
 */
export interface CardPreset<ENTITY extends {} = any> extends RoutePresetBase {
  preset: 'card',
  config: CardConfig<ENTITY>,
}

/**
 * 404 error page preset.
 */
export interface ErrorPreset extends RoutePresetBase {
  preset: '404',
  config: {},
}

export interface RoutePreset<ROUTE extends Route = Route> extends RouteBase {
  type: 'preset',
  route: ROUTE,
  preset:
    | LoginPreset
    | CardPreset
    | TablePreset
    | ErrorPreset,
}
