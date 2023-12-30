<template>
  <div>
    <table class="table table-primary table-striped-columns">
      <thead>
        <tr>
          <th scope="col">red.br</th>
          <th scope="col">ID</th>
          <th scope="col">MESTO</th>
          <th scope="col">AKTIVNO</th>
          <th scope="col">TERENSKI DODATAK</th>
        </tr>
      </thead>
      <tbody
        v-for="(gradiliste, index) in gradilista"
        :key="gradiliste.id"
        class="table-group-divider"
      >
        <tr>
          <td>{{ n + index }}</td>
          <td>{{ gradiliste.id }}</td>
          <td>{{ gradiliste.mesto }}</td>

          <td>
            <div class="btn btn-dark" @click="handleUpdate(gradiliste)">
              {{ gradiliste.aktivan ? "Da" : "Ne" }}
            </div>
          </td>
          <td>
            {{ gradiliste.teren }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import getCollection from "../../composables/getCollection";
import router from "@/router";
import { doc, serverTimestamp, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
export default {
  props: { handleUpdate: Function },

  setup() {
    const { documents: gradilista } = getCollection("gradilista");

    const n = ref(1);
    // const editedPlata = async (radnik) => {
    //   const newPlata = prompt("Enter new value for plata:", radnik.plata);

    //   if (newPlata !== null) {
    //     const docRef = doc(db, "radnici", radnik.id);

    //     try {
    //       const timestamp = new Date().toISOString();
    //       await updateDoc(docRef, {
    //         plata: parseFloat(newPlata),
    //         plataLastUpdated: serverTimestamp(),
    //         plataChanges: [
    //           ...radnik.plataChanges,
    //           { value: parseFloat(newPlata), timestamp },
    //         ],
    //       });
    //       const docSnap = await getDoc(docRef);
    //       const updatedPlataArray = docSnap.data().plataChanges || [];
    //       radnik.plataChanges = updatedPlataArray;
    //       // radnik.plata = parseFloat(newPlata);
    //     } catch (error) {
    //       console.error("Error updating document: ", error);
    //     }
    //   }
    // };
    // const updatedPlata = computed(() => {
    //   return radnici.reduce((acc, radnik) => {
    //     acc.push(radnik.plataChanges);
    //     return acc;
    //   }, []);
    // });
    return { gradilista, n };
  },
};
</script>

<style lang="scss">
.detail-radnik {
  cursor: pointer;
  &:hover {
    background-color: rgba(127, 165, 255, 0.517);
  }
}
</style>
