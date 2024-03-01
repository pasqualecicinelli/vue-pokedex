<script>
export default {
  props: {
    pokemonList: { type: Array },
  },
  methods: {
    selectPokemon(pokemonName) {
      this.$emit("select", pokemonName);
    },
  },
};
</script>

<template>
  <h2>I pokemon che hai catturato:</h2>
  <ol class="pokemon-list">
    <li v-for="poke of pokemonList" :key="poke">
      <span class="pokemon-style" @click="selectPokemon(poke)">{{ poke }}</span>
    </li>
  </ol>
</template>

<style>
.pokemon-list {
  color: rgb(250, 232, 215);
}
li {
  cursor: pointer;
  font-size: 1.5rem;
}
.pokemon-style {
  color: black;
}
</style>
