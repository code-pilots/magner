import useMobile from 'core/utils/is-mobile';
import { computed } from 'vue';

const useDialogForm = (title?: string) => {
  const isMobile = useMobile();

  return computed(() => (isMobile.value ? {
    component: 'el-drawer',
    props: {
      direction: 'btt',
      size: 'auto',
      withHeader: false,
      customClass: 'form_drawer',
    },
  } : {
    component: 'el-dialog',
    props: {
      title: title || '',
      width: '70%',
      top: '114px',
      customClass: 'form_dialog',
    },
  }));
};

export default useDialogForm;
