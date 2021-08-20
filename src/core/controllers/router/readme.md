# Router controller

Router controller is a wrapper around usual vue router configuration. It is meant to be
flexible by providing you with different presets such as 'cards', 'tables' etc.

## Roles

You can restrict the access tp some routes for different types of authenticated users. To do so, you need to firstly
set up the ROLE enum like so:

```ts
export enum ROLE {
  SUPER_ADMIN = 'ROLE_SUPER_ADMIN',
  ADMIN = 'ROLE_ADMINISTRATOR',
  DOCTOR = 'ROLE_DOCTOR',
}
```

Every value in the enum is the role string coming from the backend when the profile request is initiated. It
means that you have to know what type of roles does backend support. In our case, there are three types:
* SUPER_ADMIN – User with all possible privileges 
* ADMIN – Administrator, has write access to limited set of entities
* DOCTOR – User with limited write and read privileges to entities related to this particular user. 

You should set up how the role is taken from the backend request in [the development project config](../development/readme.md) 
Profile section. Make sure to read and understand mentioned topic.

To assign the roles to a route, use the roles array:

```ts
route = {
  roles: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
  ...
}
```

In the example, user role will be checked every time he/she enters the app. If the authentication is not passed
or the role is not applicable for a specific route, user will be redirected.

## Controller

After roles configuration, apply the controller itself (notice the ROLE enum passed as the controller's generic):

```ts
const router = routerController<ROLE>({
  /** Properties used inside the core for redirecting */
  global: {
    /** Name of the route to which should we redirect unauthenticated user from protected route */
    homeNoAuthName: 'login',
    /** Name of the route to which should we redirect authenticated user from unprotected route */
    homeHasAuthName: 'dashboard',
  },

  routes: []
});
```

Now it's time to configure the routes:

## Custom route

```ts
route = {
  /** Vue-router properties are encapsulated into the 'route' prop */
  route: {
    /** Required name property as a unique route identifier  */
    name: 'dashboard',

    path: '/',

    /** Custom component that is passed to the vue router */
    component: () => import('app/pages/home.vue'),

    /** Additional information about the route */
    meta: {},
  },

  /** Name displayed in the sidebar menu and in the header when active */
  title: 'Home',
  
  /** An array of role Enums. If 'roles' === null, no authorization needed */
  roles: [ROLE.DOCTOR, ROLE.ADMIN, ROLE.SUPER_ADMIN],

  /** 'main', 'empty' or your own layout component */
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
name, path and a custom vue component. Then you give the page a title, icon and visibility – the info is used
in the sidebar. Layout specifies the header and a sidebar itself (it's better to always put layout: 'main' if you
require authorization in the route).

## Preset route

Presets are templates of the routes that make it easier to work with usual things like tables or creation pages.
For now, there are only several presets:
* **login** – used for auth page
* **table** – used for page with data table, pagination and filtering
* **card** – Create, Update and Delete the entity data

Add a preset like so:

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
  title: 'Patients',
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
  title: 'Dictionaries',
  icon: 'grid',
  routes: [
    { ...route1 },
    { ...route2 }
  ]
}
```
