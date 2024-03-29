/**
 * Function checks if provided target element is a child of wrapper element
 *
 * @param el
 * @param wrapper
 */
export const isInWhiteList = (el: EventTarget, wrapper?: HTMLElement) => {
  if (el === wrapper) {
    return true;
  }

  if (wrapper) {
    const children = wrapper.querySelectorAll('*');
    /* eslint-disable-next-line */
    for (const child of children as any) {
      if (el === child) {
        return true;
      }
    }
  }
  return false;
};
