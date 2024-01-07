<template>
  <form @submit.prevent="handleSignup">
    <input type="text" placeholder="name" v-model="name" required />
    <input type="email" required placeholder="email" v-model="email" />
    <input type="password" required placeholder="password" v-model="password" />
    <button>SignuUp</button>
    <div v-if="error">{{ error }}</div>
  </form>
</template>

<script>
import useSignup from "@/composables/useSignup";
import { ref } from "vue";
import router from "@/router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const name = ref("");
    const { signup, error } = useSignup();

    const handleSignup = async () => {
      await signup(email.value, password.value, name.value);

      if (!error.value) {
        router.push("/");
      }
    };
    return { email, password, name, handleSignup, error };
  },
};
</script>

<style></style>
