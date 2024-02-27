<script>
export default {
  data() {
    return {
      searchTerm: "",
      baseUrl: "https://pokeapi.co/api/v2/pokemon/",
      pokemonDetails: null,
      errorMessage: null,
    };
  },
  methods: {
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
  <main>
    <div class="mt-5">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Inserisci il nome del Pokémon"
        @keydown.enter="searchPokemon"
      />
      <button @click="searchPokemon">Cerca</button>
    </div>

    <div
      v-if="pokemonDetails"
      class="mt-5"
      style="display: flex; flex-direction: column; align-items: center"
    >
      <!-- Prima card con l'immagine -->
      <div class="card" style="width: 18rem; text-align: center">
        <img
          class="card-img-fluid"
          :src="pokemonDetails.image"
          alt="Pokemon Image"
        />
        <h2 style="margin-top: 10px">{{ pokemonDetails.name }}</h2>
      </div>

      <!-- Seconda card con le caratteristiche -->
      <div class="card mt-3" style="width: 18rem; text-align: center">
        <div style="margin-top: 10px">
          <p><strong>Height:</strong> {{ pokemonDetails.height }}</p>
          <p><strong>Weight:</strong> {{ pokemonDetails.weight }}</p>
          <p><strong>Type:</strong> {{ pokemonDetails.types.join(", ") }}</p>
          <p><strong>HP:</strong> {{ pokemonDetails.stats.hp }}</p>
          <p><strong>Attack:</strong> {{ pokemonDetails.stats.attack }}</p>
          <p><strong>Defense:</strong> {{ pokemonDetails.stats.defense }}</p>
          <p>
            <strong>Special Attack:</strong>
            {{ pokemonDetails.stats.specialAttack }}
          </p>
          <p>
            <strong>Special Defense:</strong>
            {{ pokemonDetails.stats.specialDefense }}
          </p>
          <p><strong>Speed:</strong> {{ pokemonDetails.stats.speed }}</p>
        </div>
      </div>
    </div>

    <div
      v-else
      class="card mt-5"
      style="width: 18rem; height: 6rem; text-align: center"
    >
      <p style="margin-top: 10px">
        {{ errorMessage || "Cattura il tuo Pokémon!" }}
      </p>
    </div>
  </main>
</template>

<style scoped>
input {
  width: 300px;
}
</style>
