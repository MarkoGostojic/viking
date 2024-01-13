<template>
  <div v-if="radnik">
    <h1>{{ radnik.ime }} {{ radnik.prezime }}</h1>
    <h2>vrednost radnog sata {{ radnik.plata }} RSD</h2>

    <h2>Ostvarena plata u mesecu {{ radnik.plata * totalHours }}</h2>
    <h2>Total Hours: {{ totalHours }}</h2>
    <h2>terenski dodatak ???</h2>

    <FullCalendar
      :radnik="radnik"
      :radnikId="id"
      @total-hours-updated="updateTotalHours"
    />
  </div>

  <div class="btn btn-dark">
    <button @click="backToRadnici">povratak na tabelu</button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import router from "@/router";
import FullCalendar from "@/components/FullCalendar.vue";

export default {
  components: { FullCalendar },
  props: ["id"],

  setup(props) {
    const radnik = ref(null);
    const totalHours = ref(0);
    const updateTotalHours = (newTotalHours) => {
      totalHours.value = newTotalHours;
    };
    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleString();
    };
    onMounted(async () => {
      const docRef = doc(db, "radnici", props.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        radnik.value = docSnap.data();
      } else {
        console.log("Document does not exist!");
      }
    });

    const backToRadnici = () => {
      router.push({ name: "Radnici" });
    };

    return {
      radnik,
      backToRadnici,
      formatTimestamp,
      totalHours,
      updateTotalHours,
    };
  },
};
</script>

<style lang="scss">
.table {
  width: 600px;
}
</style>
