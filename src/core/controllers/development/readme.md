# Development controller

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
