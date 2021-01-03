<template>
  <section class="p-24 flex justify-center">
    {{ $VuelidateFormGroup.hello }}
    <div>
      <v-form-group :validations="$v.name" label="name">
        <div slot-scope="{ errors, invalid }">
          <div>
            <text-input
              v-model="$v.name.$model"
              :invalid="invalid"
              type="text"
              placeholder="Full name"
            />
          </div>
          <error v-for="(error, index) in errors" :key="index">{{ error }}</error>
        </div>
      </v-form-group>

      <v-form-group :validations="$v.email" class="mt-4" label="email">
        <div slot-scope="{ errors, invalid }">
          <div>
            <text-input
              v-model="$v.email.$model"
              :invalid="invalid"
              type="email"
              placeholder="Email"
            />
          </div>
          <error v-for="(error, index) in errors" :key="index">{{ error }}</error>
        </div>
      </v-form-group>

      <div class="mt-4">
        <button
          class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded block w-full outline-none focus:outline-none focus:border-green-600 border-2 border-transparent"
          :class="{ 'opacity-50 cursor-not-allowed': $v.$anyError }"
          :disabled="$v.$anyError"
        >
          Submit
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { email, helpers, required, minLength } from 'vuelidate/lib/validators';
import Error from './Error';
import TextInput from './TextInput';

const alpha = helpers.regex('alpha', /^[a-zA-Z\s]*$/);

export default {
  components: { Error, TextInput },
  data() {
    return {
      email: '',
      name: ''
    };
  },

  validations: {
    email: {
      email,
      required
    },
    name: {
      alpha,
      minLength: minLength(10),
      required
    }
  }
};
</script>
