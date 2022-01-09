import { addressEn } from 'features/addresses/en';
import { loginEn } from 'features/login/en';
import { homeEn } from 'features/home/en';
import { layoutExampleEn } from 'features/forms/layout-example/en';
import { formExampleEn } from 'features/forms/form-example/en';

const enCustom = {
  login: loginEn,
  address: addressEn,
  home: homeEn,
  layout_example: layoutExampleEn,
  form_example: formExampleEn,
};

export type CustomTranslationSchema = typeof enCustom;
export default enCustom;
