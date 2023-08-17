const scrollToErrorInput = (): void => {
  setTimeout(() => {
    const firstFormItemErrorElement = document.querySelector('.is-error');

    if (firstFormItemErrorElement) {
      const scrollContainer = document.querySelector('.js-main-layout') as HTMLDivElement;
      const headerHeight = (document.querySelector('.js-header') as HTMLHeadingElement).offsetHeight;

      const scrollTop = scrollContainer?.scrollTop ?? 0;
      const top = firstFormItemErrorElement.getBoundingClientRect()?.top ?? 0;

      scrollContainer.scrollTo({
        top: (scrollTop + top) - headerHeight,
        behavior: 'smooth',
      });
    }
  }, 100);
};

export default scrollToErrorInput;
