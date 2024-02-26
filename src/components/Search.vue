<script>
export default {
  data() {
    return {
      searchTerm: "",
      baseUrl: "https://pokeapi.co/api/v2/pokemon/",
    };
  },
  methods: {
    async searchPokemon() {
      try {
        // const response = await fetch(
        //   `https://pokeapi.co/api/v2/pokemon/${this.searchTerm.toLowerCase()}`
        //   );
        const response = await fetch(
          this.baseUrl + this.searchTerm.toLowerCase()
        );

        if (!response.ok) {
          throw new Error("Pokémon non trovato!");
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error.message);
      }
    },
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
      />
      <button @click="searchPokemon">Cerca</button>
    </div>

    <div class="card mt-5" style="width: 18rem; height: 18rem">
      <!-- <img class="card-img-top" :src="xx" alt="" /> -->
    </div>
  </main>
</template>

<style scoped>
input {
  width: 300px;
}
</style>
