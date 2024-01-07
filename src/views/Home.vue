<template>
  <h1>Tabele</h1>
  <router-link class="btn btn-light" :to="{ name: 'Radnici' }"
    >Radnici</router-link
  >
  <router-link class="btn btn-light" :to="{ name: 'Gradilista' }"
    >Gradilista</router-link
  >
</template>

<script>
export default {};
</script>

<style lang="scss">
h1 {
  margin: 20px;
  text-align: center;
}
</style>
