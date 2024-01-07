<template>
  <div>
    <table class="table table-primary table-striped-columns">
      <thead>
        <tr>
          <th scope="col">red.br</th>
          <!-- <th scope="col">ID</th> -->
          <th scope="col">IME i PREZIME</th>
          <th scope="col">AKTIVAN</th>
          <th scope="col">PLATA</th>
          <!-- start -->
          <!-- <th scope="col">ukupna plata</th> -->
          <!-- end -->
        </tr>
      </thead>
      <tbody
        v-for="(radnik, index) in radnici"
        :key="radnik.id"
        class="table-group-divider"
      >
        <tr>
          <td>{{ n + index }}</td>
          <!-- <td>{{ radnik.id }}</td> -->
          <td>
            <router-link
              class="detail-radnik"
              :to="{ name: 'Radnik', params: { id: radnik.id } }"
              >{{ radnik.ime }} {{ radnik.prezime }}</router-link
            >
          </td>

          <td>
            <div class="btn btn-dark" @click="handleUpdate(radnik)">
              {{ radnik.aktivan ? "Da" : "Ne" }}
            </div>
          </td>
          <div>
            <td class="btn btn-light" @click="editedPlata(radnik)">
              {{ radnik.plata }}
            </td>
          </div>
          <!-- change start -->
          <!-- <td>
            {{ calculatePlataForMonth(radnik.plataChanges) }}
          </td> -->
          <!-- change end-->
        </tr>
      </tbody>
    </table>
  </div>
  <!-- <v-btn class="bg-red" @click="showMessage">Click me</v-btn> -->
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
    const { documents: radnici } = getCollection("radnici");

    const n = ref(1);

    // start
    // const calculatePlataForMonth = (plataChanges) => {
    //   const currentMonth = new Date()
    //     .toISOString()
    //     .split("-")
    //     .slice(0, 2)
    //     .join("-");

    //   const filteredPlataChanges = plataChanges.filter((change) =>
    //     change.timestamp.startsWith(currentMonth)
    //   );

    //   const sumPlata = filteredPlataChanges.reduce(
    //     (total, change) => total + change.value,
    //     0
    //   );

    //   return sumPlata.toFixed(2);
    // };
    // end

    const editedPlata = async (radnik) => {
      const newPlata = prompt("Enter new value for plata:", radnik.plata);

      if (newPlata !== null) {
        const docRef = doc(db, "radnici", radnik.id);

        try {
          const timestamp = new Date().toISOString();
          await updateDoc(docRef, {
            plata: parseFloat(newPlata),
            plataLastUpdated: serverTimestamp(),
            plataChanges: [
              ...radnik.plataChanges,
              { value: parseFloat(newPlata), timestamp },
            ],
          });
          const docSnap = await getDoc(docRef);
          const updatedPlataArray = docSnap.data().plataChanges || [];
          radnik.plataChanges = updatedPlataArray;
          // radnik.plata = parseFloat(newPlata);
        } catch (error) {
          console.error("Error updating document: ", error);
        }
      }
    };
    const updatedPlata = computed(() => {
      return radnici.reduce((acc, radnik) => {
        acc.push(radnik.plataChanges);
        return acc;
      }, []);
    });

    return { radnici, n, editedPlata, updatedPlata };
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
