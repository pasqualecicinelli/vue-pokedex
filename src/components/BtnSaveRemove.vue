<script>
export default {
  emits: ["save", "remove"],
  data() {
    return {};
  },
  props: {
    searchTerm: {
      type: String,
    },
    pokemonList: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <div class="d-flex">
    <div class="m-2" v-if="!pokemonList.includes(searchTerm)">
      <button @click="$emit('save')">Salva</button>
    </div>
    <div class="m-2" v-else>
      <button @click="$emit('remove')">Rimuovi</button>
    </div>
  </div>
</template>

<style></style>
