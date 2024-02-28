<script>
export default {
  emits: ["save", "remove"],
  data() {
    return {};
  },
};
</script>

<template>
  <div class="d-flex">
    <div class="m-2">
      <button @click="$emit('save')">Salva</button>
    </div>
    <div class="m-2">
      <button @click="$emit('remove')">Rimuovi</button>
    </div>
  </div>
</template>

<style></style>
