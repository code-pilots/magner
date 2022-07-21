import {
  DropzoneFile, DropzoneFileType, DropzoneValue, DropzoneField, DropzoneError,
} from 'lib/types/form/fields/dropzone';

export const fileToSrc = (file: File): Promise<string> => new Promise((resolve) => {
  const fileReader = new FileReader();
  fileReader.onload = () => resolve(fileReader.result as string || '');
  fileReader.readAsDataURL(file);
});

interface FileSrc {
  type: DropzoneFileType,
  src: string,
}

const IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'raw'];
const VIDEO_FORMATS = [
  'mp4', 'm4v', 'm4p', 'mpg', 'mpeg', 'avi', 'mov',
  'webm', 'mkv', 'qt', 'wmv', 'amv', 'svi',
];

export const getFileSrc = async (file: string | File): Promise<FileSrc> => {
  if (!file) return { type: 'file', src: '' };

  const isFile = file instanceof Blob;
  const name = isFile ? file.name : file;
  const extension = name.match(/\.([a-z0-9]+)$/i)?.[1];

  if (!extension) {
    return { type: 'file', src: isFile ? '' : file };
  }

  if (IMAGE_FORMATS.includes(extension)) {
    if (!isFile) return { type: 'image', src: file };
    return {
      type: 'image',
      src: await fileToSrc(file),
    };
  }

  if (VIDEO_FORMATS.includes(extension)) {
    if (!isFile) return { type: 'video', src: file };
    return {
      type: 'video',
      src: await fileToSrc(file),
    };
  }

  return { type: 'file', src: isFile ? '' : file };
};

export const getFileView = async (
  value: string | File | Record<string, unknown>,
  field: DropzoneField<any>,
): DropzoneFile['view'] => {
  const view = await getFileSrc(typeof value === 'object' && !(value instanceof Blob)
    ? value?.[field.props.srcKey || 'src'] as string || ''
    : value);

  let caption = '';
  if (value instanceof Blob) caption = value.name;
  else if (typeof value === 'object') caption = value?.[field.props.captionKey || 'caption'] as string || '';
  else caption = value;

  return {
    type: view.type,
    src: view.src,
    caption,
  };
};

export const prepareValue = (modelVal: DropzoneValue | null, field: DropzoneField<any>): DropzoneFile[] => {
  if (!modelVal) return [];

  const vals = Array.isArray(modelVal) ? modelVal : [modelVal];
  return vals.map((value) => ({
    view: getFileView(value, field),
    value: typeof value === 'object' ? value?.[field.props.valueKey || 'value'] as string || '' : value,
    loading: false,
    file: null,
    size: 0,
  } as DropzoneFile));
};

export const uploadFile = async (file: File, field: DropzoneField<any>, time?: number): Promise<DropzoneFile | null> => {
  if (!field.props.saveToBackend) {
    return {
      file,
      view: getFileView(file, field),
      value: field.props.saveToBackend ? '' : file,
      loading: false,
      size: file.size,
      key: time || Date.now(),
    };
  }

  const res = await field.props.saveToBackend(file);
  if (res.error) {
    return {
      file,
      view: getFileView(file, field),
      value: '',
      loading: false,
      size: file.size,
      key: time || Date.now(),
    };
  }

  return {
    file,
    view: getFileView(res.data as Record<string, unknown>, field),
    value: typeof res.data === 'object' && !(res.data instanceof Blob)
      ? res.data?.[field.props.valueKey || 'value'] as string || ''
      : res.data || '',
    loading: false,
    size: file.size,
    key: time || Date.now(),
  };
};

export const uploadValues = (files: File[], field: DropzoneField<any>): DropzoneFile[] => files.map((file) => {
  const time = Date.now();
  return {
    file,
    view: getFileView(file, field),
    value: field.props.saveToBackend ? '' : file,
    loading: true,
    size: 0,
    upload: uploadFile(file, field, time),
    key: time,
  };
});

interface CheckFileReturn {
  errors: DropzoneError[],
  passedFiles: File[],
}

export const checkFileErrors = (
  newFiles: File[],
  field: DropzoneField<any>,
  currentFileLength: number,
): CheckFileReturn => {
  const errors: DropzoneError[] = [];

  // Handle MaxAmountError and prevent all files from being uploaded if the
  // given amount of files is more than allowed
  if (field.props.multiple && field.props.maxAmount && currentFileLength + newFiles.length > field.props.maxAmount) {
    errors.push({
      type: 'MaxAmountError',
      value: currentFileLength + newFiles.length,
      allowed: field.props.maxAmount,
    });

    return { errors, passedFiles: [] };
  }

  const passedFiles: File[] = [];
  newFiles.forEach((file) => {
    // Handle FormatsError - when single file is not in the list of allowed formats
    const formats = field.props.formats || [];
    if (formats && formats.length) {
      const format = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
      if (formats.indexOf(format) === -1) {
        errors.push({
          type: 'FormatsError',
          value: format,
          name: file.name,
          allowed: formats,
        });
        return;
      }
    }

    // Handle MaxSizeError - when single file is too heavy
    if (field.props.maxSize && file.size >= field.props.maxSize * 1024 * 1024) {
      errors.push({
        type: 'MaxSizeError',
        value: file.size,
        name: file.name,
        allowed: field.props.maxSize,
      });
      return;
    }

    passedFiles.push(file);
  });

  return { errors, passedFiles };
};
