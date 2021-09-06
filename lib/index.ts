/**
 * This file collects all named exports of the Magner library.
 * All of the exports are explained in the 'API' section in documentation.
 *
 * Distinguish between different exports by its name:
 * • **camelCased** exports are logical functions and controllers like 'initMagner'
 * • Names in PascalCase starting with 'Magner' are Vue components like 'MagnerForm'
 * • **PascalCased** exports are TypeScript types like 'TablePageConfig'
 */

export * from './controllers';
export * from './types';
export * from './views';
export * from './utils';
