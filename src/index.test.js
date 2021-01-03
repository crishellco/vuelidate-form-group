import { createLocalVue, mount } from '@vue/test-utils';
import Vuelidate from 'vuelidate';
import { email, required, between } from 'vuelidate/lib/validators';

import VuelidateFormGroup from './index';

const Component = {
  data() {
    return {
      email: '',
      luckyNumber: 0
    };
  },

  template: `
  <section>
    <v-form-group label="email" :validations="$v.email" ref="emailFormGroup">
      <div slot-scope="{ errors, invalid }">
        <input
          v-model="$v.email.$model"
          type="email"
          placeholder="Email"
          :class="{ invalid }"
        />
        <span class="email-errors" v-for="(error, index) in errors" :key="index">{{ error }}</span>
      </div>
    </v-form-group>

    <v-form-group label="lucky number" :validations="$v.luckyNumber" ref="luckyNumberFormGroup">
      <div slot-scope="{ errors, invalid }">
        <input
          v-model="$v.luckyNumber.$model"
          type="number"
          placeholder="Lucky Number"
          :class="{ invalid }"
        />
        <span class="lucky-number-errors" v-for="(error, index) in errors" :key="index">{{ error }}</span>
      </div>
    </v-form-group>
  </section>
  `,

  validations: {
    email: {
      email,
      required
    },

    luckyNumber: {
      between: between(1, 10),
      required
    }
  }
};

const localVue = createLocalVue();

localVue.use(Vuelidate);
localVue.use(VuelidateFormGroup, {
  templates: {
    between: '{label} must be between {min} and {max}.',
    email: '{label} must be a valid email address.',
    required: '{label} is required.'
  }
});

describe('FormGroup.vue', () => {
  let emailInput;
  let luckNumberInput;
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Component, { localVue, sync: false });
    wrapper.vm.$v.$reset();

    emailInput = wrapper.find('input[type="email"]');
    luckNumberInput = wrapper.find('input[type="number"]');
  });

  describe('computed', () => {
    it('should compute errors', async () => {
      expect(wrapper.vm.$refs.emailFormGroup.errors).toEqual([]);
      expect(wrapper.vm.$refs.luckyNumberFormGroup.errors).toEqual([]);

      emailInput.setValue('notvalid');
      luckNumberInput.setValue('12');
      await wrapper.vm.$forceUpdate();

      expect(wrapper.vm.$refs.emailFormGroup.errors).toEqual([
        'Email must be a valid email address.'
      ]);
      expect(wrapper.vm.$refs.luckyNumberFormGroup.errors).toEqual([
        'Lucky number must be between 1 and 10.'
      ]);
    });

    it('should compute failed', async () => {
      expect(wrapper.vm.$refs.emailFormGroup.errors).toEqual([]);
      expect(wrapper.vm.$refs.luckyNumberFormGroup.errors).toEqual([]);

      emailInput.setValue('notvalid');
      luckNumberInput.setValue('12');
      await wrapper.vm.$forceUpdate();

      expect(wrapper.vm.$refs.emailFormGroup.failed).toEqual(['email']);
      expect(wrapper.vm.$refs.luckyNumberFormGroup.failed).toEqual(['between']);
    });

    it('should compute invalid', async () => {
      expect(wrapper.vm.$refs.emailFormGroup.invalid).toBeFalsy();
      expect(wrapper.vm.$refs.luckyNumberFormGroup.invalid).toBeFalsy();

      emailInput.setValue('cmitchell@crishell.co');
      luckNumberInput.setValue('5');
      await wrapper.vm.$forceUpdate();

      expect(wrapper.vm.$refs.emailFormGroup.invalid).toBeFalsy();
      expect(wrapper.vm.$refs.luckyNumberFormGroup.invalid).toBeFalsy();

      emailInput.setValue('notvalid');
      luckNumberInput.setValue('12');
      await wrapper.vm.$forceUpdate();

      expect(wrapper.vm.$refs.emailFormGroup.invalid).toBeTruthy();
      expect(wrapper.vm.$refs.luckyNumberFormGroup.invalid).toBeTruthy();
    });
  });

  describe('validators', () => {
    it('should show required validation errors', async () => {
      emailInput.setValue('');
      luckNumberInput.setValue('');
      await wrapper.vm.$forceUpdate();

      expect(emailInput.classes().includes('invalid')).toBe(true);
      expect(luckNumberInput.classes().includes('invalid')).toBe(true);
      expect(wrapper.find('.email-errors').text()).toBe('Email is required.');
      expect(wrapper.find('.lucky-number-errors').text()).toBe('Lucky number is required.');
    });

    it('should show email validation errors', async () => {
      emailInput.setValue('asdf');
      await wrapper.vm.$forceUpdate();

      expect(emailInput.classes().includes('invalid')).toBe(true);
      expect(wrapper.find('.email-errors').text()).toBe('Email must be a valid email address.');
    });

    it('should show between validation errors', async () => {
      luckNumberInput.setValue('25');
      await wrapper.vm.$forceUpdate();

      expect(luckNumberInput.classes().includes('invalid')).toBe(true);
      expect(wrapper.find('.lucky-number-errors').text()).toBe(
        'Lucky number must be between 1 and 10.'
      );
    });
  });
});
