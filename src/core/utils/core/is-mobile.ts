import { ref } from 'vue';

export const useMobile = () => {
  const isMobile = ref<boolean>(false);

  const changeIsMobile = () => {
    isMobile.value = window.matchMedia('(max-width: 767px)').matches;
  };

  changeIsMobile();
  window.addEventListener('resize', changeIsMobile);

  return isMobile;
};
