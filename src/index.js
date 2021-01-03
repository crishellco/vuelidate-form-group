import { templateSettings, upperFirst } from 'lodash';

import { INTERPOLATE_REGEX } from './support/constants';
import FormGroup from './components/FormGroup.vue';

let installed = false;

const defaultOptions = {
  componentName: 'v-form-group',
  errorFormatter: upperFirst,
  interpolateRegex: INTERPOLATE_REGEX,
  templates: {}
};

const install = (Vue, options = {}) => {
  if (installed) return;

  const mergedOptions = { ...defaultOptions, ...options };

  Vue.prototype.$VuelidateFormGroup = Vue.observable({
    errorFormatter: mergedOptions.errorFormatter,
    templates: mergedOptions.templates
  });

  Vue.component(mergedOptions.componentName, FormGroup);

  templateSettings.interpolate = mergedOptions.interpolateRegex;

  installed = true;
};

const plugin = {
  install
};

export default plugin;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}
