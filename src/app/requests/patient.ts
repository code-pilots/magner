import api from 'core/utils/api';
import parseError from 'app/utils/parse-error';
import request from 'core/utils/request';

const patientRequest = request(async ({ data }) => {
  try {
    const res = await api.post('patients', data);
    return { data: res, error: null };
  } catch (e) {
    return { error: parseError(e), data: null };
  }
});

export default patientRequest;
