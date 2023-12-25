<template>
  <div>
    <table class="table table-primary table-striped-columns">
      <thead>
        <tr>
          <th scope="col">red.br</th>
          <th scope="col">ID</th>
          <th scope="col">IME</th>
          <th scope="col">PREZIME</th>
          <th scope="col">AKTIVAN</th>
        </tr>
      </thead>
      <tbody
        v-for="(radnik, index) in radnici"
        :key="radnik.id"
        class="table-group-divider"
      >
        <tr>
          <th>{{ n + index }}</th>
          <th>{{ radnik.id }}</th>
          <td>{{ radnik.ime }}</td>
          <td>{{ radnik.prezime }}</td>

          <td>
            <div class="btn btn-dark" @click="handleUpdate(radnik)">
              {{ radnik.aktivan }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from "vue";
import getCollection from "../../composables/getCollection";
export default {
  props: { handleUpdate: Function },
  setup() {
    const { documents: radnici } = getCollection("radnici");
    const n = ref(1);

    return { radnici, n };
  },
};
</script>

<style lang="scss"></style>
