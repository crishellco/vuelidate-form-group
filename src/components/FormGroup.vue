<script>
import { get, template } from 'lodash';

export default {
  props: {
    label: {
      required: true,
      type: String
    },

    validations: {
      required: true,
      type: Object
    }
  },

  computed: {
    errors() {
      return this.failed.map(validator => {
        const compiled = template(get(this.$VuelidateFormGroup.templates, [validator], ''));

        return this.$VuelidateFormGroup.errorFormatter(
          compiled({ ...get(this.validations.$params, [validator], {}), label: this.label })
        );
      });
    },

    failed() {
      if (!this.invalid) {
        return [];
      }

      return Object.keys(this.validations.$params).filter(validator => {
        return this.validations[validator] === false;
      });
    },

    invalid() {
      return this.validations.$dirty && this.validations.$invalid;
    }
  },

  render() {
    return this.$scopedSlots.default({
      errors: this.errors,
      invalid: this.invalid
    });
  }
};
</script>
