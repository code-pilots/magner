import useMobile from 'core/utils/is-mobile';
import { computed } from 'vue';
import { TranslateData, useTranslate } from 'core/utils/translate';

const useDialogForm = (title?: TranslateData, dialogOnMobile?: boolean) => {
  const isMobile = useMobile();
  const { customT } = useTranslate();

  return computed(() => ((isMobile.value && !dialogOnMobile) ? {
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
      width: isMobile.value ? '90%' : '70%',
      top: '114px',
      customClass: 'form_dialog',
    },
  }));
};

export default useDialogForm;
