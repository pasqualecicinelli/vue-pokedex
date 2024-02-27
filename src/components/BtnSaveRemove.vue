<script>
export default {
  data() {
    return {};
  },
};
</script>

<template>
  <button @click="$emit('save')">Salva</button>

  <button @click="$emit('remove')">Rimuovi</button>
</template>

<style></style>
