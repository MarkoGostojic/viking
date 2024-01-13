<template>
  <div>
    <h1>{{ totalHours }}</h1>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import { ref, onMounted, watch, reactive, toRefs, computed } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { db } from "@/firebase/config";
import { collection, doc, getDocs, addDoc } from "firebase/firestore";
import getCollection from "@/composables/getCollection";

export default {
  components: {
    FullCalendar,
  },
  props: ["radnikId", "radnik"],
  setup(props, { emit }) {
    const { documents: gradilista } = getCollection("gradilista");
    const totalHours = ref(0);

    const handleDateClick = async (info) => {
      const hours = prompt("Koliko si sati radio danas: ");

      if (
        hours !== null &&
        !isNaN(parseFloat(hours)) &&
        parseFloat(hours) > 0
      ) {
        const selectedLocation = await chooseLocation();

        if (selectedLocation) {
          if (props.radnikId && typeof props.radnikId === "string") {
            const radniciRef = collection(db, "radnici");
            const colRef = collection(doc(radniciRef, props.radnikId), "plate");

            try {
              // Add the new plate entry
              const plateDocRef = await addDoc(colRef, {
                hours: parseFloat(hours),
                location: selectedLocation,
                date: info.dateStr,
              });

              // Update the local events array
              const event = {
                title: `Radio u ${selectedLocation}, ${hours} sati`,
                date: info.dateStr,
                hours: parseFloat(hours),
                location: selectedLocation,
              };
              state.calendarOptions.events.push(event);

              // Save the events to local storage
              localStorage.setItem(
                "calendarEvents",
                JSON.stringify(state.calendarOptions.events)
              );
            } catch (error) {
              console.error("Error adding plate entry:", error);
              alert("Error adding plate entry. Please try again.");
            }
          } else {
            alert("Invalid radnikId. Please make sure it's a valid string.");
          }
        } else {
          alert("Pogrešan unos, molim unesite ispravne podatke.");
        }
      } else {
        alert("Pogrešan unos, molim unesite ispravne podatke.");
      }
    };

    const chooseLocation = async () => {
      return new Promise((resolve) => {
        const selectedLocation = prompt(
          "Izaberite gradilište: \n" + uniqueLocations.value.join("\n")
        );

        if (
          selectedLocation &&
          uniqueLocations.value.includes(selectedLocation)
        ) {
          resolve(selectedLocation);
        } else {
          resolve(null);
        }
      });
    };

    const state = reactive({
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        events: [],
        dateClick: handleDateClick,
      },
    });

    const uniqueLocations = computed(() => {
      const locations = new Set(
        gradilista.value.map((gradiliste) => gradiliste.mesto)
      );
      return Array.from(locations);
    });

    const fetchedEvents = computed(() => {
      // Return a copy of the fetched events
      return JSON.parse(JSON.stringify(state.calendarOptions.events));
    });

    const fetchCalendarEvents = async (radnikId) => {
      // Fetch events based on the radnikId
      const radniciRef = collection(db, "radnici");
      const colRef = collection(doc(radniciRef, radnikId), "plate");
      const querySnapshot = await getDocs(colRef);

      // Update events array with fetched data
      state.calendarOptions.events = [];

      querySnapshot.forEach((doc) => {
        const plateData = doc.data();
        const event = {
          title: `Radio u ${plateData.location}, ${plateData.hours} sati`,
          date: plateData.date,
          hours: plateData.hours,
          location: plateData.location,
        };
        state.calendarOptions.events.push(event);
      });

      // Save the events to local storage
      localStorage.setItem(
        "calendarEvents",
        JSON.stringify(state.calendarOptions.events)
      );
    };

    // Fetch events when the component is initially mounted or when radnikId changes
    const calculateTotalHours = () => {
      totalHours.value = state.calendarOptions.events.reduce(
        (total, event) => total + event.hours,
        0
      );

      emit("total-hours-updated", totalHours.value);
    };

    watch(
      () => props.radnikId,
      async (newRadnikId) => {
        console.log("New radnikId:", newRadnikId);
        if (newRadnikId && typeof newRadnikId === "string") {
          await fetchCalendarEvents(newRadnikId);

          calculateTotalHours();
        }
      },
      { immediate: true } // Fetch initially when the component is mounted
    );

    watch(
      () => state.calendarOptions.events,
      () => {
        // Calculate total hours whenever events array changes
        calculateTotalHours();
      },
      { deep: true }
    );

    // Fetch events from local storage when the component is mounted
    onMounted(() => {
      const localEvents = localStorage.getItem("calendarEvents");
      if (localEvents) {
        state.calendarOptions.events = JSON.parse(localEvents);
      }
    });

    return {
      ...toRefs(state),
      fetchedEvents,
      totalHours,
    };
  },
};
</script>
