import api from 'core/utils/api';
import parseError from 'app/utils/parse-error';
import request from 'core/utils/request';

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
  // photo: {
  //   src: string,
  //   id: number,
  // },
  city: number,
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
  city: data.city.id,
});

export const patientGet = request(async ({ data }) => {
  try {
    const res = await api.get<{ result: { patient: Patient } }>(`patients/${data}`);
    const proxied = patientProxy(res.result.patient);

    return { data: proxied, error: null };
  } catch (e) {
    return { error: parseError(e), data: null };
  }
});

export const patientCreate = request(async ({ data }) => {
  try {
    const res = await api.post('patients', data, {
      isFormdata: true,
    });
    return { data: res, error: null };
  } catch (e) {
    return { error: parseError(e), data: null };
  }
});
