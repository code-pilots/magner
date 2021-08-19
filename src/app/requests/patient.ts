import { request } from 'core/utils';

export interface Patient {
  id: number,
  phone: string,
  email: string,
  firstname: string,
  surname: string,
  patronimic: string,
  fullName: string,
  birthDate: string,
  gender: {
    label: string,
    value: 'female'|'male',
  },
  address: string,
  apartment: string,
  lat: number,
  long: number,
  photo: {
    src: string,
    id: number,
  },
  city: {
    name: string,
    timezone: string,
    id: number,
  },
  children: Patient[],
}

export interface PatientProxy {
  firstname: string,
  surname: string,
  patronimic: string,
  phone: string,
  email: string,
  birthDate: string,
  gender: 'female'|'male',
  address: string,
  apartment: string,
  photo: string|null,
  cityId: string|null,
}

const patientProxy = (data: Patient): PatientProxy => ({
  firstname: data.firstname,
  surname: data.surname,
  patronimic: data.patronimic,
  phone: data.phone,
  email: data.email,
  birthDate: data.birthDate,
  gender: data.gender.value,
  address: data.address,
  apartment: data.apartment,
  cityId: data.city?.name || null,
  photo: data.photo?.src || null,
});

export const patientGet = request(async ({
  data, router, api, errorParser,
}) => {
  try {
    const res = await api.get<{ result: { patient: Patient } }>(`patients/${data}`);
    const proxied = patientProxy(res.result.patient);

    return { data: proxied, error: null };
  } catch (e) {
    await router.push({ name: 'patients' });
    return { error: errorParser(e), data: null };
  }
});

export const patientCreate = request(async ({ data, api, errorParser }) => {
  try {
    const res = await api.post('patients', data, {
      isFormdata: true,
    });
    return { data: res, error: null };
  } catch (e) {
    return { error: errorParser(e), data: null };
  }
});

export const patientUpdate = request<any, { id: number, data: any }>(async ({ data, api, errorParser }) => {
  try {
    const res = await api.post(`patients/${data.id}/update`, data, {
      isFormdata: true,
    });
    return { data: res, error: null };
  } catch (e) {
    return { error: errorParser(e), data: null };
  }
});

export const patientDelete = request<any, number>(async ({
  data, router, api, errorParser,
}) => {
  try {
    const res = await api.delete(`patients/${data}`);
    await router.push({ name: 'patients' });
    return { data: res, error: null };
  } catch (e) {
    return { error: errorParser(e), data: null };
  }
});
