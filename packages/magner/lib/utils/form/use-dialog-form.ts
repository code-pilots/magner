import { computed } from 'vue';
import { TranslateData, useTranslate } from 'lib/utils/core/translate';
import { useMobile } from 'lib/utils/core/is-mobile';

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
      width: isMobile.value ? '95%' : '70%',
      top: '114px',
      customClass: 'form_dialog',
    },
  }));
};

export default useDialogForm;
