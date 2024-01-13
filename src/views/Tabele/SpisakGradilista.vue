<template>
  <div>
    <table class="table table-primary table-striped-columns">
      <thead>
        <tr>
          <th scope="col">red.br</th>
          <!-- <th scope="col">ID</th> -->
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
          <!-- <td>{{ gradiliste.id }}</td> -->
          <td>{{ gradiliste.mesto }}</td>

          <td>
            <div class="btn btn-dark" @click="handleUpdate(gradiliste)">
              {{ gradiliste.aktivan ? "Da" : "Ne" }}
            </div>
          </td>
          <div>
            <td class="btn btn-light" @click="editTeren(gradiliste)">
              {{ gradiliste.teren }}
            </td>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import getCollection from "../../composables/getCollection";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default {
  props: { handleUpdate: Function },

  setup() {
    const { documents: gradilista } = getCollection("gradilista");

    const n = ref(1);
    const editTeren = async (gradiliste) => {
      const newTeren = prompt(
        "Unesite novu vrednost za terenski dodatak:",
        gradiliste.plata
      );

      if (newTeren !== null) {
        const docRef = doc(db, "gradilista", gradiliste.id);

        try {
          const timestamp = new Date().toISOString();
          const terenChanges = Array.isArray(gradiliste.terenChanges)
            ? [
                ...gradiliste.terenChanges,
                { value: parseFloat(newTeren), timestamp },
              ]
            : [{ value: parseFloat(newTeren), timestamp }];
          await updateDoc(docRef, {
            teren: parseFloat(newTeren),
            terenLastUpdated: serverTimestamp(),
            terenChanges: terenChanges,
          });
          const docSnap = await getDoc(docRef);
          const updatedGradilisteArray = docSnap.data().terenChanges || [];
          gradiliste.terenChanges = updatedGradilisteArray;
        } catch (error) {
          console.error("Error updating document: ", error);
        }
      }
    };
    const updatedTeren = computed(() => {
      return gradilista.reduce((acc, gradiliste) => {
        acc.push(gradiliste.terenChanges);
        return acc;
      }, []);
    });
    return { gradilista, n, editTeren, updatedTeren };
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
