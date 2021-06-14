import request from 'core/utils/request';
import type { DropzoneUploadReturn } from 'core/types/form/dropzone';

type RequestResponse = {result: { image: { src: string, id: null }}};

/**
 * A request that is initiated when, in the form with the field of type === 'dropzone'
 * the parameter 'saveToBackend' is passed and the file is chosen.
 *
 * The data in the argument set is a File.
 */
const imageUploadRequest = request<DropzoneUploadReturn>(async ({ data, api }) => {
  try {
    const file: File = data;
    const fd = new FormData();
    fd.append('image', file);

    const res = await api.post<null, RequestResponse>('images', null, {
      isFormdata: true,
      body: fd,
    });

    return { error: null, data: res.result.image };
  } catch (e) {
    return { error: 'Error', data: null };
  }
});

export default imageUploadRequest;
