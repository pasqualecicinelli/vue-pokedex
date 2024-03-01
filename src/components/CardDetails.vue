<script>
export default {
  props: {
    pokemonDetails: {
      type: Object,
    },
    errorMessage: {
      type: String,
    },
  },
  data() {
    return {
      intervalId: null,
      showFrontImage: true,
    };
  },
  mounted() {
    // Avvia l'intervallo al montaggio del componente
    this.intervalId = setInterval(() => {
      // Cambia lo stato dell'immagine tra front e back
      this.showFrontImage = !this.showFrontImage;
    }, 2000); // Ogni due secondi (2000 millisecondi)
  },
  beforeDestroy() {
    // Assicurati di cancellare l'intervallo prima di distruggere il componente
    clearInterval(this.intervalId);
  },
};
</script>

<template>
  <div v-if="pokemonDetails" class="my-5 general-card">
    <!-- Prima card con l'immagine -->
    <div class="card card-top">
      <img
        v-if="showFrontImage"
        class="card-img-fluid"
        :src="pokemonDetails.imageFront"
        alt="Pokemon Image Front"
      />

      <img
        v-else
        class="card-img-fluid"
        :src="pokemonDetails.imageBack"
        alt="Pokemon Image Back"
      />
      <h2 class="mt-2">{{ pokemonDetails.name }}</h2>
    </div>

    <!-- Seconda card con le caratteristiche -->
    <div class="card card-top mt-3 px-2">
      <div class="mt-2">
        <p><strong>Height:</strong> {{ pokemonDetails.height }}</p>

        <p><strong>Weight:</strong> {{ pokemonDetails.weight }}</p>
        <p><strong>Type:</strong> {{ pokemonDetails.types.join(", ") }}</p>

        <span><strong>Stats</strong></span>

        <div class="flex-center">
          <p><strong>HP:</strong> {{ pokemonDetails.stats.hp }}</p>
          <div class="progression-bar">
            <span
              class="dimension-bar"
              :style="{
                width: pokemonDetails.stats.hp + 'px',
              }"
            ></span>
          </div>
        </div>
        <div class="flex-center">
          <p><strong>Attack:</strong> {{ pokemonDetails.stats.attack }}</p>
          <div class="progression-bar">
            <span
              class="dimension-bar"
              :style="{
                width: pokemonDetails.stats.attack + 'px',
              }"
            ></span>
          </div>
        </div>
        <div class="flex-center">
          <p><strong>Defense:</strong> {{ pokemonDetails.stats.defense }}</p>
          <div class="progression-bar">
            <span
              class="dimension-bar"
              :style="{
                width: pokemonDetails.stats.defense + 'px',
              }"
            ></span>
          </div>
        </div>
        <div class="flex-center">
          <p>
            <strong>Special Attack:</strong>
            {{ pokemonDetails.stats.specialAttack }}
          </p>
          <div class="progression-bar">
            <span
              class="dimension-bar"
              :style="{
                width: pokemonDetails.stats.specialAttack + 'px',
              }"
            ></span>
          </div>
        </div>
        <div class="flex-center">
          <p>
            <strong>Special Defense:</strong>
            {{ pokemonDetails.stats.specialDefense }}
          </p>
          <div class="progression-bar">
            <span
              class="dimension-bar"
              :style="{
                width: pokemonDetails.stats.specialDefense + 'px',
              }"
            ></span>
          </div>
        </div>
        <div class="flex-center">
          <p><strong>Speed:</strong> {{ pokemonDetails.stats.speed }}</p>
          <div class="progression-bar">
            <span
              class="dimension-bar"
              :style="{
                width: pokemonDetails.stats.speed + 'px',
              }"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="card card-empty mt-5">
    <p class="mt-2">
      {{ errorMessage || "Cattura il tuo Pokémon!" }}
    </p>
  </div>
</template>

<style scoped>
.general-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-top {
  text-align: center;
}
div.flex-center {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
p {
  margin: 0;
  padding: 0;
}
div.progression-bar {
  display: flex;
  width: 200px;
  height: 6px;
  border: 1px solid black;
}
span.dimension-bar {
  height: 5px;
  background-color: red;
  display: inline-block;
}
.card-empty {
  width: 18rem;
  height: 6rem;
  text-align: center;
}
</style>
