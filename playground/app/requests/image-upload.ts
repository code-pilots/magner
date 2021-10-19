import { request } from 'lib/index';
import type { DropzoneUploadReturn } from 'lib/types/form/fields/dropzone';

const imageUploadRequest = request<DropzoneUploadReturn>(async () => new Promise((resolve) => {
  setTimeout(() => resolve({
    data: {
      id: 'https://picsum.photos/500',
      photo: 'https://picsum.photos/500',
    },
  }), 1500);
}));

export default imageUploadRequest;
