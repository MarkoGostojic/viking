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
import { ref } from "vue";
import getCollection from "../../composables/getCollection";

export default {
  props: { handleUpdate: Function },

  setup() {
    const { documents: gradilista } = getCollection("gradilista");

    const n = ref(1);
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
