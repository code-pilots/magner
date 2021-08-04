import parseError from 'app/utils/parse-error';
import request from 'core/utils/request';

export interface SpecializationPrice {
  id: number
  price: number,
  haveDegreePrice?: number,
  medicalServiceTypeId: number,
  medicalServiceTypeTitle: string,
}

export interface Specialization {
  id: number,
  title: string
  prices: SpecializationPrice[],
  type: {
    label: string,
    slug: 'adult'|'child'|'all',
  },
}

export interface SpecializationProxy {
  id: number,
  title: string
  prices: SpecializationPrice[],
  type: {
    label: string,
    slug: 'adult'|'child'|'all',
  },
}

const patientProxy = (data: Specialization): SpecializationProxy => ({
  ...data,
});

export const specializationGet = request(async ({ data, router, api }) => {
  try {
    const res = await api.get<{ result: Specialization[] }>(`specializations/${data}`);
    const proxied = res.result?.[0] ? patientProxy(res.result[0]) : null;

    if (!proxied) {
      await router.push({ name: 'specializations' });
    }

    return { data: proxied, error: null };
  } catch (e) {
    await router.push({ name: 'specializations' });
    return { error: parseError(e), data: null };
  }
});

export const specializationCreate = request(async ({ data, api }) => {
  try {
    const res = await api.post('specializations', data, {
      isFormdata: true,
    });
    return { data: res, error: null };
  } catch (e) {
    return { error: parseError(e), data: null };
  }
});

export const specializationUpdate = request<any, { id: number, data: any }>(async ({ data, api }) => {
  try {
    const res = await api.post(`specializations/${data.id}/update`, data, {
      isFormdata: true,
    });
    return { data: res, error: null };
  } catch (e) {
    return { error: parseError(e), data: null };
  }
});
