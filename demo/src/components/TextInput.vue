<template>
  <input
    :value="value"
    @input="$emit('input', $event.target.value)"
    class="border-2 rounded px-2 py-1 w-64 outline-none"
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
