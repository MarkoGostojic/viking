<template>
  <nav>
    <router-link class="btn btn-light btn___main" :to="{ name: 'home' }"
      ><h2>VIKING</h2>
    </router-link>
  </nav>
</template>

<script></script>

<style lang="scss">
nav {
  background-color: rgb(139, 197, 197);
  width: 100%;
  height: 100px;
  text-align: center;
}
.btn___main {
  margin: 30px auto;
}
</style>
