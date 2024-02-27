<script>
import Search from "./components/Search.vue";
import CardDetails from "./components/CardDetails.vue";

export default {
  data() {
    return {
      searchTerm: null,
      baseUrl: "https://pokeapi.co/api/v2/pokemon/",
      pokemonDetails: null,
      errorMessage: null,
    };
  },

  components: {
    Search,
    CardDetails,
  },

  methods: {
    async handlePokemonName(searchTerm) {
      // Assicurati di aggiornare il nome del Pokémon selezionato
      this.searchTerm = searchTerm;

      // Esegui la ricerca del Pokémon dopo aver impostato il termine di ricerca
      await this.searchPokemon();
    },

    // chiamata API per ricerca pokemon
    async searchPokemon() {
      try {
        // Verifica se il campo di ricerca è vuoto
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

        // Verifica se data.sprites esiste prima di utilizzare front_default
        const image = data.sprites ? data.sprites.front_default : null;

        // Verifica se data.types esiste prima di utilizzare map
        const types = data.types
          ? data.types.map((type) => type.type.name)
          : [];

        // Estrai le statistiche
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
          // Aggiungi altre statistiche se necessario
        };

        this.pokemonDetails = {
          name: data.name,
          height: data.height,
          weight: data.weight,
          types: types,
          image: image,
          stats: stats,
        };

        // Resetta il messaggio di errore se la ricerca ha successo
        this.errorMessage = null;
      } catch (error) {
        console.error(error.message);
        // Azzera i dettagli del Pokemon quando non viene trovato
        this.pokemonDetails = null;
        // Imposta il messaggio di errore
        this.errorMessage = error.message;
      }
    },
  },
};
</script>

<template>
  <header>pokedex</header>

  <main>
    <div class="container">
      <Search @pokemon-name="handlePokemonName" />
      <CardDetails
        :pokemonDetails="pokemonDetails"
        :errorMessage="errorMessage"
      />
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
