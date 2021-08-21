# Requests

When you work on the configuration of different pages, you have to add the requests. As you may have seen,
those properties require you to pass the `RequestCallback` type. It is defined as:

```ts
export type RequestCallback<RESULT = any, DATA = any> = (info: {
  data: DATA,
  api: ApiType,
  store: StoreType,
  router: Router,
  errorParser: ErrorParser,
  urlParsers: UrlParsers,
}) => Promise<BaseResponse<RESULT>>;
```

And is used in request files as:

```ts
import { request } from 'core/utils';

export interface City {
  id: number,
  name: string,
}

const citiesRequest = request(async ({ data, api, store, router }) => {
  try {
    const res = await api.get<{ result: City[] }>(`cities/search?q=${data || ''}`);
    return { error: null, data: res.result };
  } catch (e) {
    console.error(e);
    return { error: null, data: [] };
  }
});

export default citiesRequest;
```

Therefore, this `request` util function is a helper for you to write better and easier requests.
Use the argument of the function by taking the `api` helper, `store` and `router` object out there.

Usually, these requests are initiated from the core views, and they pass the `data` as an argument.
It can be form data (`Record<string,any>`) or any other object important to your logic.

Notice that `request` requires the object of form `{ error: null, data: any }` to be returned if there's no error,
and `{ error: any, data: any }` if there's an error. But request doesn't parse the error. Instead, it allows
using defined [in "development" controller](../../controllers/development/readme.md) `errorParser` function:

```ts
export const citiesCreate = request(async ({ data, api, errorParser }) => {
  try {
    const res = await api.post('cities', data);
    return { data: res, error: null };
  } catch (e) {
    return { error: errorParser(e), data: null };
  }
});
```

And one more important argument coming from [the "development" controller](../../controllers/development/readme.md) is
`urlParsers`. It creates the query string for the GET request to the backend:

```ts
const patientsRequest: TableRequest<Patient> = request(async ({ data, api, urlParsers }) => {
  try {
    const query = urlParsers.dataToUrl(data);
    const res: Response = await api.get(`patients${query}`);
    return { error: null, data: proxied };
  } catch (e) {
    return { error: null, data: { rows: [], pagination: null, total: 0 } };
  }
});
```
