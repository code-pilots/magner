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

export const patientGet = request(async ({ data }) => {
  try {
    const res = await api.get<{ result: { patient: Patient } }>(`patients/${data}`);
    return { data: res.result.patient, error: null };
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
