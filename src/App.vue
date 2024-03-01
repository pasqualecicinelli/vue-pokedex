<script>
import { ref } from "vue";
import Search from "./components/Search.vue";
import CardDetails from "./components/CardDetails.vue";
import BtnSaveRemove from "./components/BtnSaveRemove.vue";
import CardListPokemon from "./components/CardListPokemon.vue";

const searchTerm = ref("");

export default {
  data() {
    return {
      searchTerm: null,
      baseUrl: "https://pokeapi.co/api/v2/pokemon/",
      pokemonDetails: null,
      errorMessage: null,
      pokemonList: [],
      selectedPokemon: null,
      fromList: null,
    };
  },
  components: {
    Search,
    CardDetails,
    BtnSaveRemove,
    CardListPokemon,
  },
  mounted() {
    const storedList = localStorage.getItem("pokeList");
    if (storedList) {
      this.pokemonList = JSON.parse(storedList);
    }
  },
  methods: {
    async handlePokemonName(searchTerm) {
      this.searchTerm = searchTerm;
      await this.searchPokemon();
    },
    async searchPokemon() {
      try {
        if (!this.searchTerm.trim()) {
          throw new Error("Inserisci il nome del Pokémon prima di cercare.");
        }
        const response = await fetch(
          this.baseUrl + this.searchTerm.toLowerCase()
        );
        if (!response.ok) {
          throw new Error("Pokémon non trovato!");
        }
        const data = await response.json();
        const imageFront = data.sprites ? data.sprites.front_default : null;
        const imageBack = data.sprites ? data.sprites.back_default : null;

        const types = data.types
          ? data.types.map((type) => type.type.name)
          : [];
        const stats = {
          hp: data.stats.find((stat) => stat.stat.name === "hp").base_stat,
          attack: data.stats.find((stat) => stat.stat.name === "attack")
            .base_stat,
          defense: data.stats.find((stat) => stat.stat.name === "defense")
            .base_stat,
          specialAttack: data.stats.find(
            (stat) => stat.stat.name === "special-attack"
          ).base_stat,
          specialDefense: data.stats.find(
            (stat) => stat.stat.name === "special-defense"
          ).base_stat,
          speed: data.stats.find((stat) => stat.stat.name === "speed")
            .base_stat,
        };
        this.pokemonDetails = {
          name: data.name,
          height: data.height,
          weight: data.weight,
          types: types,
          imageFront: imageFront,
          imageBack: imageBack,
          stats: stats,
        };
        this.errorMessage = null;
      } catch (error) {
        console.error(error.message);
        this.pokemonDetails = null;
        this.errorMessage = error.message;
      }
    },
    async handleSave() {
      if (!this.pokemonList.includes(this.pokemonDetails.name)) {
        this.pokemonList.push(this.pokemonDetails.name);
        localStorage.setItem("pokeList", JSON.stringify(this.pokemonList));
        // this.searchTerm = "";
      }
    },
    handleSelectPokemon(pokemonName) {
      this.selectedPokemon = pokemonName;
      this.fromList = pokemonName;
      this.handlePokemonName(this.selectedPokemon);
    },
    handleRemove() {
      if (this.selectedPokemon) {
        const index = this.pokemonList.indexOf(this.selectedPokemon);
        if (index !== -1) {
          this.pokemonList.splice(index, 1);
          localStorage.setItem("pokeList", JSON.stringify(this.pokemonList));
          this.selectedPokemon = null; // Deseleziona il Pokémon dopo la rimozione
          // this.pokemonDetails = null; // Azzeramento dei dettagli del Pokémon
          // this.searchTerm = ""; // Reset della barra di ricerca
        }
      }
    },
  },
};
</script>

<template>
  <header>Pokedex</header>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <Search
            custom-text-input
            @update:searchTerm="handlePokemonName"
            v-model="searchTerm"
            v-model:fromList="fromList"
          />
          <BtnSaveRemove
            v-if="searchTerm !== null && pokemonDetails !== null"
            @save="handleSave"
            @remove="handleRemove"
            :searchTerm="searchTerm"
            :pokemonList="pokemonList"
          />
          <CardDetails
            :pokemonDetails="pokemonDetails"
            :errorMessage="errorMessage"
          />
        </div>
        <div class="col-6">
          <CardListPokemon
            :pokemonList="pokemonList"
            @select="handleSelectPokemon"
          />
        </div>
      </div>
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
