# Router

We provide you with the router controller that transforms the specially made configuration structure
to acceptable by the Vue router settings.

There are different types of routes. Here are they:

## Custom route

```ts
route = {
  /** Simple vue-router route config except that the 'component' is a path-string from 'views' directory */
  route: {
    /** Required name property as a unique route identifier  */
    name: 'dashboard',

    path: '/',

    /** Component is a view laying in the app/pages directory,
     *  or the imported (or lazy imported with () => import()) component */
    component: 'home',

    /** Additional information about the route */
    meta: {},
  },

  /** Name displayed in the sidebar menu and in the header when active */
  title: 'Главная',
  
  /** An array of role Enums. If 'roles' === null, no authorization needed */
  roles: [ROLE.DOCTOR, ROLE.ADMIN, ROLE.SUPER_ADMIN],

  /** Path-string (.vue file from layouts folder) that specifies page layout */
  layout: 'main',

  /** Views accept configs as page props to display everything according to those configs */
  config: {},

  /** Show the route in the sidebar or not */
  visible: true,
  
  /** Icon to be displayed in the sidebar */
  icon: 'home',
}
```

This example route shows how to create a page from scratch. You just define the route's
name, path and a custom vue component. For easiness, paths are .vue files laying in the specified directory
(remember the structure of the app). Then you give the page a title, icon and visibility – the info is used
in the sidebar. Layout specifies the header and a sidebar itself (it's better to always put layout: 'main' if you
require authorization in the route).

## Preset route

Presets are templates of the routes that make it easier to work with usual things like tables or creation pages.
For now, there are only several presets:
* **login** – used for auth page
* **table** – used for page with data table, pagination and filtering
* **card** – Create, Update and Delete the entity data

You add a preset like so:
```ts
route = {
  preset: 'login',
  config: loginPageConfig,
  roles: null,
}
```

Or with the table:

```ts
route = {
  preset: 'table',
  config: patientsConfig,
  roles: [ROLE.SUPER_ADMIN, ROLE.DOCTOR, ROLE.DOCTOR],

  /** Sidebar settings */
  visible: true,
  title: 'Пациенты',
  icon: 'users',

  route: {
    name: 'patients',
    path: '/patients',
  },
}
```

As always, `config` property is passed to the page as a property. But with presets you don't manage those page –
the core will do everything for you.

## Group route

Groups are used in the sidebar to add the visual nesting of routes. Simply write:

```ts
group = {
  group: true,
  name: 'dicts',
  title: 'Справочники',
  icon: 'grid',
  routes: [
    { ...route1 },
    { ...route2 }
  ]
}
```

## Roles

You can restrict the access of some routes to different types of authenticated users. To do so, you need to firstly
set up the ROLES enum and then add the role to a user when he/she passes the authorization.

1) Go to `src/configs/roles.ts` and add properties to the enum
2) In the `src/app/requests/login.ts`, after the requests to the backend, dispatch an action 'changeRole' to the store
3) Create a request (it's `src/app/requests/profile.ts` now) to the backend. It must return the type:

```ts
interface Profile {
  role: ROLE | null,
  token: string,
  user: User,
}
```

It will be used every time used enters the website to check if he/she is authorized. And then it redirects to the
proper route specified in the `routerConfig.global` configuration.

After Roles are all set up, you can add them to the routing configuration, in the `roles` property as an array of
what roles are allowed. If `null` is passed, no authorization is needed at all.
