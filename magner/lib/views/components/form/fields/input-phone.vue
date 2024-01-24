<template>
  <ReadonlyWrap :field="field" :value="val" gray-block>
    <el-input
      ref="inputPhone"
      :model-value="val"
      :name="field.name"
      :autofocus="field.props.autofocus"
      :autocomplete="field.props.autocomplete"
      :disabled="disabled"
      :validate-event="false"
      @blur="$emit('blur', $event)"
      @focus="replaceMask"
      @input="changeVal"
    >
    </el-input>
  </ReadonlyWrap>
</template>

<script lang="ts">
import '../../../../assets/styles/components/input-phone.css';
import {
  defineComponent, onMounted,
  PropType,
  ref,
} from 'vue';
import { useChecks } from 'lib/utils';
import debounceOnInput from 'lib/utils/form/input-debounce';
import ReadonlyWrap from '../readonly-wrap.vue';
import { InputPhoneField } from 'lib/types/form/fields/input-phone';
import { create as Maska } from 'maska';
import { useI18n } from "vue-i18n";
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import 'intl-tel-input/build/js/intlTelInput.js';
import * as utils from '../../../../../public/js/intl-tel-input-utils.js';


export default defineComponent({
  name: 'FormInputPhone',
  components: { ReadonlyWrap },
  props: {
    field: {
      type: Object as PropType<InputPhoneField<any>>,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
  emits: ['update:modelValue', 'blur'],
  setup (props, context) {
    const val = ref<number|string>(props.modelValue);
    const telInputEl = ref<HTMLInputElement>();
    const iti = ref();

    const { t } = useI18n();
    const { disabled } = useChecks(props.field);

    const changeVal = debounceOnInput(props.field.props.inputDelay || 0, val, () => {
      context.emit('update:modelValue', iti.value.getNumber(intlTelInputUtils.numberFormat.E164));
    });

    onMounted(() => {
      telInputEl.value = document.querySelector(`input[name='${props.field.name as string}']`) as HTMLInputElement;

      iti.value = intlTelInput(telInputEl.value, {
        utilsScript: utils,
        preferredCountries: props.field.props.preferredCountries || [],
        onlyCountries: props.field.props.onlyCountries || [],
        excludeCountries: props.field.props.excludeCountries || [],
        customContainer: props.field.props.customContainer || '',
        initialCountry: props.field.props.initialCountry,
        separateDialCode: true,
        customPlaceholder: (selectedCountryPlaceholder: string) => {
          return selectedCountryPlaceholder.replace(/[0-9]/g, 'X');
        },
      });


      if (props.field.props.hasWithoutMaskOption) {
        const dropdown = document.getElementById('iti-0__country-listbox');
        const li = document.createElement("li");
        const span = document.createElement("span");
        const div = document.createElement("div");
        li.className = 'iti__country iti__standard iti__highlight';
        span.className = 'iti__country-name';
        div.className = 'iti__flag-box';
        span.appendChild(document.createTextNode(t('core.form.input_phone.without_mask')));
        li.append(div);
        li.append(span);
        dropdown?.prepend(li);
      }

      telInputEl.value?.addEventListener("countrychange", function(e: Event) {
        replaceMask(e)
      });
    });


    const replaceMask = (e: Event) => {
      const pl = (e?.target as HTMLInputElement)?.placeholder;
      const res = pl?.replace(/X/g, '#');
      if (res !== 'undefined') {
        Maska(e.target, { mask: res || '#*' });
      }
    };

    return {
      val,
      disabled,
      changeVal,
      replaceMask,
    };
  },
});
</script>
