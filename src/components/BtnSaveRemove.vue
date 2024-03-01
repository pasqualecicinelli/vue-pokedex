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
    <div v-if="!pokemonList.includes(searchTerm)">
      <button @click="$emit('save')" class="m-2 btn btn-success">Salva</button>
    </div>
    <div v-else>
      <button @click="$emit('remove')" class="m-2 btn btn-warning">
        Rimuovi
      </button>
    </div>
  </div>
</template>

<style></style>
