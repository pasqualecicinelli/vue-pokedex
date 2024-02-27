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
  <ul>
    <li v-for="poke of pokemonList" :key="poke">
      <span @click="selectPokemon(poke)">{{ poke }}</span>
    </li>
  </ul>
</template>

<style>
ul {
  list-style: none;
}
li {
  cursor: pointer;
}
</style>
