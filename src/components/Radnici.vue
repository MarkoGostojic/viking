<template>
  <div class="radnici">
    <div class="tabela">
      <SpisakRadnika
        :handleUpdate="handleUpdate"
        :handleUpdatePlata="handleUpdatePlata"
      />
    </div>

    <div>
      <div v-if="!addForm">
        <button class="btn btn-light" @click="addForm = !addForm">
          novi radnik
        </button>
      </div>
      <form
        class="bg-primary p-2 text-white"
        style="--bs-bg-opacity: 0.2"
        v-else
        @submit.prevent="handleRadnik"
      >
        <div class="fields">
          <input
            class="form-text"
            type="text"
            v-model="ime"
            required
            placeholder="ime"
          />
          <input
            class="form-text"
            type="text"
            required
            v-model="prezime"
            placeholder="prezime"
          />
          <input
            class="form-text"
            type="number"
            required
            v-model="plata"
            placeholder="početna plata"
          />
        </div>
        <button class="btn btn-light">dodaj radnika</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { db, serverTimestamp } from "../firebase/config";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import router from "@/router";

import SpisakRadnika from "../views/Tabele/SpisakRadnika.vue";
export default {
  components: { SpisakRadnika },
  setup() {
    const ime = ref("");
    const prezime = ref("");
    const plata = ref(null);
    const aktivan = ref(true);
    const addForm = ref(false);

    const handleRadnik = async () => {
      const colRef = collection(db, "radnici");
      await addDoc(colRef, {
        ime: ime.value,
        prezime: prezime.value,
        plata: plata.value,
        aktivan: aktivan.value,
      });
      addForm.value = false;
      ime.value = "";
      prezime.value = "";
    };
    const handleUpdate = async (radnik) => {
      const docRef = doc(db, "radnici", radnik.id);

      await updateDoc(docRef, {
        aktivan: !radnik.aktivan,
      });
    };

    return {
      ime,
      prezime,
      plata,
      aktivan,
      addForm,
      handleRadnik,
      handleUpdate,
    };
  },
};
</script>

<style lang="scss">
.radnici {
  display: flex;
  margin: 10px;
  align-items: start;
  justify-content: space-around;
  text-align: center;
}
.table {
  width: 70%;
  // margin: 5px;
}
form {
  // background-color: rgba(30, 180, 30, 0.307);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  padding: 20px;
}
.fields {
  margin: 5px;
  display: flex;
  flex-direction: column;
}
.form-text {
  text-align: center;
  border: none;
  border-radius: 5px;
}
</style>
