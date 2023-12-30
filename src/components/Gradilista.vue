<template>
  <div class="gradilista">
    <SpisakGradilista :handleUpdate="handleUpdate" />
    <div class="tabela">
      <!-- <SpisakGradilista :handleUpdate="handleUpdate" /> -->
    </div>

    <div>
      <div v-if="!addForm">
        <button class="btn btn-light" @click="addForm = !addForm">
          novo gradiliste
        </button>
      </div>
      <div v-if="addForm">
        <form
          class="bg-primary p-2 text-white"
          style="--bs-bg-opacity: 0.2"
          @submit.prevent="handleGradiliste"
        >
          <div class="fields">
            <input
              class="form-text"
              type="text"
              v-model="mesto"
              required
              placeholder="mesto izvođenja radova"
            />
            <input
              class="form-text"
              type="text"
              v-model="teren"
              required
              placeholder="vrednost terenskog dodatka"
            />
          </div>
          <button class="btn btn-light">dodaj gradilište</button>
        </form>
        <button @click="addForm = false" class="btn btn-light">odustani</button>
      </div>
    </div>
  </div>
</template>

<script>
import SpisakGradilista from "@/views/Tabele/SpisakGradilista.vue";
import { ref } from "vue";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
export default {
  components: { SpisakGradilista },
  setup() {
    const mesto = ref("");
    const aktivan = ref(true);
    const teren = ref(null);
    const addForm = ref(false);

    const handleGradiliste = async () => {
      const colRef = collection(db, "gradilista");

      await addDoc(colRef, {
        mesto: mesto.value,
        // plataChanges: plataChanges.value,
        // plataLastUpdated: timestamp,
        teren: teren.value,
        aktivan: aktivan.value,
      });
      addForm.value = false;
      mesto.value = "";
      teren.value = "";
    };
    const handleUpdate = async (gradiliste) => {
      const docRef = doc(db, "gradilista", gradiliste.id);

      await updateDoc(docRef, {
        aktivan: !gradiliste.aktivan,
      });
    };
    return {
      mesto,
      aktivan,
      teren,
      addForm,
      handleGradiliste,
      handleUpdate,
    };
  },
};
</script>

<style lang="scss">
.gradilista {
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
