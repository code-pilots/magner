import request from 'core/utils/request';
import type { DropzoneUploadReturn } from 'core/types/form/fields/dropzone';

type RequestBody = { image: File };
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
    const res = await api.post<RequestBody, RequestResponse>('images', { image: file }, {
      isFormdata: true,
    });

    return { error: null, data: res.result.image };
  } catch (e) {
    return { error: 'Error', data: null };
  }
});

export default imageUploadRequest;
