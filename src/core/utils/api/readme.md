# Requests

When you work on the configuration of different pages, you have to add the requests. As you may have seen,
those properties require you to pass the `RequestCallback` type. It is defined as:

```ts
type RequestCallback<RESULT = any, DATA = any> = (info: {
  data: DATA,
  api: ApiType,
  store: StoreType,
  router: Router,
}) => Promise<BaseResponse<RESULT>>
```

And is used in request files as:

```ts
import request from 'core/utils/request';

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

Whatever data is passed from the view (which uses the configuration with your request) to the request
is kept in the `data`. You can proxy it to any other object and send the request with the `api`.
It encapsulates the auth token, sets all needed headers and works with possible errors, so you are
left only to work with the response data.

Notice that `request` requires the object of form `{ error: null, data: any }` to be returned if there's no error,
and `{ error: any, data: any }` if there's an error.
