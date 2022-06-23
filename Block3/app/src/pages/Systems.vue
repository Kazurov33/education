<template>
  <div class="q-pa-md">
    <q-btn
      label="Add system"
      class="q-my-md"
      color="primary"
      @click="opened = !opened"
    />
    <q-table :data="systems" :columns="columns" />
    <q-dialog v-model="opened">
      <q-card style="min-width: 300px">
        <q-form @submit="createSystem">
          <q-card-section>
            <div class="text-h6">Create system</div>
            <q-input
              v-model="system.Name"
              label="System name"
              :rules="[(val) => (val && val != '') || 'Field is required']"
            />
            <q-input
              v-model="system.Key"
              label="System key"
              :rules="[(val) => (val && val != '') || 'Field is required']"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn label="Save" color="primary" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { objectsService } from "../services/objects.service";
import handleError from "../scripts/handleError";

export default {
  name: "Systems",
  data() {
    return {
      systems: [],
      system: {},
      choosedKey: null,
      opened: false,
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
        .then((response) => {
          this.systems.push(response);
          this.opened = false;
          this.system = {};
          handleError(this, "positive");
        })
        .catch((e) => {
          handleError(this, "negative", "Error", e);
        });
    },
    deleteSystem() {
      objectsService
        .deleteSystem(this.choosedKey)
        .then(() => {
          this.systems.splice(
            this.systems.findIndex((x) => x.key == this.choosedKey),
            1
          );
          handleError(this, "positive");
        })
        .catch((e) => {
          handleError(this, "negative", "Error", e);
        });
    },
  },
  mounted() {
    objectsService.systems().then((response) => (this.systems = response));
  },
};
</script>
