# Universal Admin

Admin panel that can be used for literally any project. 

It supports authentication, role management, entity tables, entities creation and edition. Easily configurable with JSON highly-typed controllers. Describes proper backend integration.

## Installation

```bash
npm ci
```

And then use different commands for runs:
```dash
# For development
npm run dev

# For production build and start
npm run build
npm start
```

## File structure

Basically, this admin panel requires you to follow the structure of the project. 
The `src` directory consists of:
* `envs.ts` – File collects all environmental variables. You should provide at least 2 required variables for the project. To configure them, add `.env` or `.env.production` to the root of the app
* `main.ts` - Initial project setup. It collects important configuration files and initiates Magner setup. This is the best place to add your project-dependent styles
* `core` – Directory with useful controllers, types, views. Just like a library of tools that you'll need.
* `configs` – Directory collects JSON configurations for the projects. Use controllers for better Developer Experience (DX).
* `app` – Add your own logic there: requests, views, styles

## Configuration

Usually, the entry file for the project configuration is `src/configs/index.ts`. It is imported from the `main.ts` and exports
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
* [Manifest](./src/core/controllers/manifest/readme.md) – Set of the project descriptors like name and icons. Also used in PWA mode
* [Routing](./src/core/controllers/router/readme.md) – Controller that wraps the Vue-router allowing more flexibility with different presets
* [i18n](./src/core/controllers/i18n/readme.md) – Internationalization controller. Configures project languages and their translations
* [Development](./src/core/controllers/development/readme.md) – Development controller. Sets up important functions for interactions with the backend

To understand different core functionality, follow other README links:
* [Requests](./src/core/utils/api/readme.md)
* [Generic Forms](./src/core/views/components/form/readme.md)

## Problems and troubleshooting

> What is this feature for? How should I use this property in the config? 

If you ask yourself similar questions while using Magner, please, check the structured documentation links
from above. It explains main concepts and shows the usage of different configurations.

If you need to dive deeper than the documentation, check the TypeScript interfaces: hover over the
property in the config and do "Go to definition" in your IDE: CMD+Click in Webstorm, Ctrl+Click in VS Code.

As a last resort, you can open an issue (or discussion) in the repo or contact [the maintainer](https://t.me/vanishmax) 
with your problem or proposal.
