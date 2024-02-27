<script>
export default {
  data() {
    return {};
  },
  props: {
    pokemonList: { type: Array },
  },
};
</script>

<template>
  <ul v-for="poke of pokemonList">
    <li>{{ poke }}</li>
  </ul>
</template>

<style>
ul {
  list-style: none;
}
</style>
