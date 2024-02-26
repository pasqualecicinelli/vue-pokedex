<script>
import Search from "./components/Search.vue";

export default {
  data() {
    return {};
  },
  components: { Search },
};
</script>

<template>
  <header>pokedex</header>

  <main>
    <div class="container">
      <Search />
    </div>
  </main>
</template>

<style scoped>
header {
  height: 80px;
  border: 1px solid black;
  text-align: center;
  line-height: 80px;
}
</style>
