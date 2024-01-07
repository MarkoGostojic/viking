<template>
  <table class="table table-primary table-striped-columns">
    <thead>
      <tr>
        <th scope="col">IME i PREZIME</th>
        <th scope="col">ID</th>
        <th scope="col">AKTIVAN</th>
        <th scope="col">PLATA</th>
        <th scope="col">DATUM NOVE PLATE</th>
      </tr>
    </thead>
    <tbody v-if="radnik">
      <tr>
        <td>{{ radnik.ime }} {{ radnik.prezime }}</td>
        <td>{{ id }}</td>
        <td>
          {{ radnik.aktivan ? "Da" : "Ne" }}
        </td>

        <td>
          <div v-for="p in radnik.plataChanges" :key="p.value">
            <span>{{ p.value }}</span>
          </div>
        </td>
        <td>
          <div v-for="p in radnik.plataChanges" :key="p.value">
            {{ formatTimestamp(p.timestamp) }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="btn btn-dark">
    <button @click="backToRadnici">povratak na tabelu</button>
  </div>
  <FullCalendar />
</template>

<script>
import { ref, onMounted } from "vue";
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import router from "@/router";

export default {
  props: ["id"],

  setup(props) {
    const radnik = ref(null);
    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleString();
    };
    onMounted(async () => {
      const docRef = doc(db, "radnici", props.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        radnik.value = docSnap.data();
        // console.log(radnik.value);
      } else {
        console.log("Document does not exist!");
      }
    });
    const backToRadnici = () => {
      router.push({ name: "Radnici" });
    };

    return { radnik, backToRadnici, formatTimestamp };
  },
};
</script>

<style lang="scss">
.table {
  width: 600px;
}
</style>
