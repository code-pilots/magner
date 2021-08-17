import { Ref } from 'vue';

const debounceOnInput = (wait: number|undefined, val: Ref<number|string>, cb: (arg1: string|number) => void) => {
  let timer: ReturnType<typeof setTimeout>;

  return (newVal: string|number) => {
    val.value = newVal;

    if (typeof wait === 'undefined') {
      cb(newVal);
      return;
    }

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(newVal);
    }, wait);
  };
};

export default debounceOnInput;
