<template>
  <form @submit.prevent="handleLogin">
    <input type="email" required placeholder="email" v-model="email" />
    <input type="password" required placeholder="password" v-model="password" />
    <button>Login</button>
    <div v-if="error">{{ error }}</div>
  </form>
</template>

<script>
import useLogin from "@/composables/useLogin";
import { ref } from "vue";
import router from "@/router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const { login, error } = useLogin();
    const handleLogin = async () => {
      await login(email.value, password.value);

      if (!error.value) {
        router.push("/");
      }
    };
    return { email, password, handleLogin, error };
  },
};
</script>

<style></style>
