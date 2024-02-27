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
};
</script>

<template>
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
</template>

<style lang="scss" scoped></style>
