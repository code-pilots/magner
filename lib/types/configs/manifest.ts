interface ManifestIcon {
  src: string,
  sizes: string,
  type: string,
}

export interface ManifestConfig {
  name: string,
  short_name: string,
  description?: string,
  background_color: string,
  theme_color: string,
  display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser',
  start_url: string,
  icons: ManifestIcon[],
  [key: string]: any,
}
