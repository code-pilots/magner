import { addressEn } from 'features/addresses/en';
import { loginEn } from 'features/login/en';

const enCustom = {
  login: loginEn,
  address: addressEn,
};

export type CustomTranslationSchema = typeof enCustom;
export default enCustom;
