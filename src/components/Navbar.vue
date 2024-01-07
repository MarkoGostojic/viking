<template>
  <nav>
    <div class="logo">
      <router-link class="btn btn-light btn___main" :to="{ name: 'home' }"
        ><h2>VIKING</h2>
      </router-link>
    </div>
    <div class="auth">
      <div v-if="!user">
        <router-link class="btn btn-light" :to="{ name: 'Signup' }"
          >Signup</router-link
        >
        <span>or</span>
        <router-link class="btn btn-light" :to="{ name: 'Login' }"
          >Login</router-link
        >
      </div>
      <div v-if="user">
        <span>Zdravo, </span>
        {{ user.displayName }}
        <button class="btn btn-light" @click="handleLogout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import router from "@/router";
import getUser from "@/composables/getUser";
import { ref, watchEffect } from "vue";
export default {
  setup() {
    const handleLogout = async () => {
      await signOut(auth);
    };
    const { user } = getUser();

    watchEffect(() => {
      if (!user.value) {
        router.push({ name: "Login" });
      }
    });
    return { handleLogout, user };
  },
};
</script>

<style lang="scss">
nav {
  background-color: rgb(139, 197, 197);
  width: 100%;
  height: 100px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn {
  margin: 10px;
}
</style>
