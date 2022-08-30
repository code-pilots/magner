import { onMounted, onUnmounted } from 'vue';
import { isInWhiteList } from 'lib/utils/helpers/white-list';

/**
 * Function adds a click-event listener, checks event target and fires callback function if needed
 *
 * @param contentId
 * @param targetSelector
 * @param callback
 */
export const useClickOutside = (contentId: string, targetSelector: string, callback: () => void) => {
  const clickedOutside = (e: MouseEvent) => {
    const content = document.getElementById(contentId) || undefined;

    if (
      e.target
      && !(e.target as HTMLElement).closest(targetSelector)
      && !isInWhiteList(e.target, content)
    ) {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener('click', clickedOutside);
  });
  onUnmounted(() => {
    document.removeEventListener('click', clickedOutside);
  });
};
