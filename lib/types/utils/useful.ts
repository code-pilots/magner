import type { Component } from 'vue';

export type IconImport = (() => Component | string | Promise<typeof import('.svg') | Component | any>);
