<template>
  <input
    :value="value"
    @input="$emit('input', $event.target.value)"
    style="width: 25rem"
    class="border-2 rounded py-2 px-3 outline-none"
    :class="{
      'border-red-500 bg-red-100': invalid,
      'bg-gray-200 focus:border-green-500': !invalid
    }"
  />
</template>

<script>
export default {
  props: ['invalid', 'value']
};
</script>
