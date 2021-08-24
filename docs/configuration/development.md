# Development controller

This is how development controller looks like from far away:

```ts
import { developmentController } from 'core/controllers';

const development = developmentController({
  noBackendMode: false,
  urlParsers,
  errorParser,
  profileRequest,
  validation,
});
```

## noBackendMode

The flag is showing whether your app is ready to connect with backend or not.
If set to `true`, login page will automatically authenticate you with any
data passed to it, and the function checking your authentication and user role,
would always allow you to any protected route.

## urlParsers

The property await the controller to be passed:

```ts
import { urlParsersController } from 'core/controllers';

const urlParsers = urlParsersController({
  dataToUrl: (data: Record<string, any>): string => {
    return '?query=value';
  },
  urlToData: (query: Record<string, any> = {}): Record<string, any> => {
    return {};
  },
});
```

There are two functions which do opposite work: `dataToUrl` accepts any [form data](../form.md)
and returns query string that will be passed to the GET request for some data from backend.

`urlToData` takes the query object and proxies it to the form data. Query string, in this case, is parsed by
the Vue router.

## errorParser

This function is responsible for handling any error incoming from the backend requests:

```ts
import { errorParserController } from 'core/controllers';

const errorParser = errorParserController((err) => ({
  fields: err?.data?.errors?.fields || {},
  message: err?.data?.message || '',
}));
```

`errorParser` should return the object with `message` property explaining the error and the `fields`
property. It is an object where key is the name of a form field (check [generic forms explanation](../form.md)) 
and value is a string explaining the error in the field.

## profileRequest

Function used every time user enters the app to check his/her authentication status and role:

```ts
import { dataToProxy, Response } from 'app/requests/login';
import { profileRequestController } from 'core/controllers';

export interface Response {
  result: {
    user: {
      id: number,
      login: string,
      phone: string,
      roleTitle: string,
      roles: string[],
    },
  },
  token: string,
}

const profileRequest = profileRequestController(async ({ api }) => {
  try {
    const res: Response = await api.get('auth/profile');
    const proxied = {
      token: res.token,
      role: res.result.user.roles?.length ? res.result.user.roles[0] : null,
      user: res.result.user,
    }

    return { error: null, data: proxied };
  } catch (e) {
    return { error: 'Error', data: null };
  }
});
```

Function must return the object of restricted type wrapped in `RequestCallback` (read about it [in "requests"](../requests.md)):

```ts
interface ProfileRequestResponse {
  role: string | null,
  token: string,
  user: any,
}
```

After all, the `used` is saved in the store, `token` is kept in local storage and `role` is used to check any route change.
How roles affect the routing [is explained here](routing.md).

## Validators

Validators is an object that extends the pre-defined validators from the core of Magner.

To understand, let's see how validation is used over any field in any form:

```ts
const phoneField = {
  type: 'input',
  name: 'phone',
  validation: {
    type: 'phone',
    trigger: 'blur',
  },
  props: {
    type: 'tel',
    placeholder: '+7-000-000-00-00',
    mask: {
      mask: '+7-###-###-##-##',
    },
  },
};
```

Therefore, `validation` property is used always in the same way: it specifies on which event it will fire (possible
are `blur` or `change`), and which type of validator to run.

The list of pre-defined validators is very limited:
* `empty` - Special function. Works as a 'required' field and is disabled when editing the entity form (to allow PATCH method)
* `password` – Check if a field is longer than 6 symbols
* `email` – Check if email is valid

Validation can be easily customized. Just define the controller:

```ts
import { validationController } from 'core/controllers';

const validation = validationController({
  passwordConfirm: ({ value, form }, callback) => {
    if (value && form.password !== value) {
      callback(new Error('Passwords do not match!'));
    } else if (!value) {
      callback(new Error('Type password confirmation'));
    } else {
      callback();
    }
  },
});
```

First argument of the custom validator is a data you can use to check field's value. 
Second argument is callback. If callback argument is `new Error("message")`, the error will be shown over the field.
