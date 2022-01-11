import { ref } from 'vue';

export const useMobile = () => {
  const isMobile = ref<boolean>(false);

  const media = matchMedia('(max-width: 767px)');
  isMobile.value = media.matches;

  media.addEventListener('change', (e) => {
    isMobile.value = e.matches;
  });

  return isMobile;
};
