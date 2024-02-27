<script>
export default {
  data() {
    return {
      searchTerm: "",
    };
  },
};
</script>

<template>
  <main>
    <div class="mt-5">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Inserisci il nome del Pokémon"
        @keydown.enter="$emit('pokemon-name', this.searchTerm)"
      />
      <button @click="$emit('pokemon-name', this.searchTerm)">Cerca</button>
    </div>
  </main>
</template>

<style scoped>
input {
  width: 300px;
}
</style>
