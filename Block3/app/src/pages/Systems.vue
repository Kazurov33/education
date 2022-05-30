<template>
  <div>
    <q-table :data="systems" :columns="columns" />
  </div>
</template>

<script>
import { objectsService } from "../services/objects.service";
export default {
  name: "Error404",
  data() {
    return {
      systems: [],
      system: {},
      choosedKey: null,
      columns: [
        {
          name: "name",
          label: "Name",
          align: "left",
          field: "Name",
        },
        {
          name: "key",
          label: "Key",
          align: "left",
          field: "Key",
        },
      ],
    };
  },
  methods: {
    createSystem() {
      objectsService
        .createSystem(this.system)
        .then((response) => this.systems.push(response));
    },
    deleteSystem() {
      objectsService.createSystem(this.choosedKey).then(() =>
        this.systems.splice(
          this.systems.findIndex((x) => x.key == this.choosedKey),
          1
        )
      );
    },
  },
  mounted() {
    objectsService.systems().then((response) => (this.systems = response));
  },
};
</script>
