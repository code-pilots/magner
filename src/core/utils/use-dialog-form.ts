import useMobile from 'core/utils/is-mobile';
import { computed } from 'vue';
import { TranslateData, useTranslate } from 'core/utils/translate';

const useDialogForm = (title?: TranslateData) => {
  const isMobile = useMobile();
  const { customT } = useTranslate();

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
      title: customT(title || ''),
      width: '70%',
      top: '114px',
      customClass: 'form_dialog',
    },
  }));
};

export default useDialogForm;
