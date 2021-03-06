# Entry point

Usually, the entry file for the project configuration is `src/configs/analyzers.ts`. It is imported from the `main.ts` and exports
the project controller – a function which only argument is the project configuration:

```ts
export default projectController({
  manifest,
  routing,
  i18n,
  development,
});
```

In here, each object key is another controller. It is categorized in a way that each key is responsible for its own important logic in the app.
To understand more about them, follow the provided links below:
* [Manifest](./manifest.md) – Set of the project descriptors like name and icons. Also used in PWA mode
* [Routing](./routing.md) – Controller that wraps the Vue-router allowing more flexibility with different presets
* [i18n](./i18n.md) – Internationalization controller. Configures project languages and their translations
* [Development](./development.md) – Development controller. Sets up important functions for interactions with the backend

To understand different core functionality, follow other README links:
* [Requests](../docs/requests.md)
* [Generic Forms](../docs/form.md)
