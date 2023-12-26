<template>
  <table class="table table-primary table-striped-columns">
    <thead>
      <tr>
        <!-- <th scope="col">ID</th> -->
        <th scope="col">IME i PREZIME</th>
        <th scope="col">AKTIVAN</th>
        <th scope="col">PLATA</th>
      </tr>
    </thead>
    <tbody v-if="radnik">
      <tr>
        <!-- <td>{{ id }}</td> -->
        <td>{{ radnik.ime }} {{ radnik.prezime }}</td>
        <td>
          {{ radnik.aktivan ? "Da" : "Ne" }}
        </td>
        <td>{{ radnik.plata }}</td>
        <!-- <p>Last Updated: {{ formatTimestamp(radnik.plata.lastUpdated) }}</p> -->
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ref, onMounted } from "vue";
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";

export default {
  props: ["id"],
  setup(props) {
    const radnik = ref(null);

    onMounted(async () => {
      const docRef = doc(db, "radnici", props.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        radnik.value = docSnap.data();
        console.log(radnik.value);
      } else {
        console.log("Document does not exist!");
      }
    });

    return { radnik };
  },
};
</script>

<style></style>
