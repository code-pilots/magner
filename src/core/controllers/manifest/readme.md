# Manifest controller

Manifest is a simple JSON file that you could see when creating a PWA application.
Here are the typings for it:

```ts
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
```

Read more about [the manifest here](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json)
