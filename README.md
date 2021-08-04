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

# For linting
npm run lint

# For unit testing
npm run test:unit

# For E2E testing
npm run test:e2e-open

# For production build and start
npm run build
npm start
```

## Documentation

Basically, this admin panel requires you to follow the structure of the project. 
The `src` directory consists of:
* `envs.ts` – File collects all environmental variables. You should provide at least 2 required variables for the project
* `main.ts` - Initial project setup. It collects important configuration files and puts everything together. This is the best place to add your project-dependent styles
* `core` – Directory with useful controllers, types, views. Just like a library of tools that you'll need.
* `configs` – Directory JSON configurations for the projects. Use controllers for better Developer Experience (DX).
* `app` – Add your own logic there: requests and proxies

To understand different core functionality, follow other README links:
* [Router](./src/core/controllers/router/readme.md)
* [Requests](./src/core/utils/api/readme.md)
* [Generic Forms](./src/core/views/components/form/readme.md)
