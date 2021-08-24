import { request } from 'core/index';

const loginRequest = request<true>(async () => ({ error: null, data: true }));

export default loginRequest;
