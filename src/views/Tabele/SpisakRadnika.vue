<template>
  <div>
    <table class="table table-primary table-striped-columns">
      <thead>
        <tr>
          <th scope="col">red.br</th>
          <th scope="col">ID</th>
          <th scope="col">IME i PREZIME</th>
          <th scope="col">AKTIVAN</th>
          <th scope="col">PLATA</th>
        </tr>
      </thead>
      <tbody
        v-for="(radnik, index) in radnici"
        :key="radnik.id"
        class="table-group-divider"
      >
        <tr>
          <td>{{ n + index }}</td>
          <td>{{ radnik.id }}</td>
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
          <td>
            {{ radnik.plata }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from "vue";
import getCollection from "../../composables/getCollection";
import router from "@/router";
export default {
  props: { handleUpdate: Function },

  setup() {
    const { documents: radnici } = getCollection("radnici");
    const n = ref(1);

    return { radnici, n };
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
