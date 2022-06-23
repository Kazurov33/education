<template>
  <div>
    <div class="fixed-center text-h5">
      <q-btn label="Add event" color="primary" @click="openDialog" />
    </div>
    <q-dialog v-model="open" @hide="reset">
      <q-card style="min-width: 350px">
        <q-form @submit="addEvent">
          <q-card-section>
            <div class="text-h6">Event creator</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-select
              :options="optionsOfTypes"
              v-model="event.EventTypeID"
              label="Choose event type"
              option-label="Name"
              option-value="Key"
              emit-value
              map-options
              :rules="[(val) => (val && val != '') || 'Field is required']"
            />
            <q-input
              type="textarea"
              label="Event Text"
              :rules="[(val) => (val && val != '') || 'Field is required']"
              v-model="event.Text"
            />
            <q-select
              :options="optionsOfSystems"
              v-model="event.SystemID"
              label="Choose system"
              option-label="Name"
              option-value="Key"
              emit-value
              map-options
              :rules="[(val) => (val && val != '') || 'Field is required']"
            />
            <q-select
              :options="optionsOfUsers"
              v-model="event.ReceiverID"
              label="Choose users"
              :option-label="
                (item) => `${item.ReceiverID} (Email: ${item.Email})`
              "
              option-value="ReceiverID"
              multiple
              use-chips
              emit-value
              map-options
            />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn label="Create" color="primary" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { objectsService } from "../services/objects.service";
import { directoryService } from "../services/directory.service";
import handleError from "../scripts/handleError";

export default {
  name: "Home",
  data() {
    return {
      open: false,
      event: {},
      optionsOfTypes: [],
      optionsOfSystems: [],
      optionsOfUsers: [],
    };
  },
  methods: {
    openDialog() {
      this.getAddInfo();
      this.getSystems();
      this.getUsers();
    },
    getAddInfo() {
      directoryService
        .eventTypes()
        .then((response) => {
          this.optionsOfTypes = response;
          this.open = true;
        })
        .catch((error) => {
          handleError(this, "negative", "Error", error);
        });
    },
    getSystems() {
      objectsService
        .systems()
        .then((response) => {
          this.optionsOfSystems = response;
        })
        .catch((error) => {
          handleError(this, "negative", "Error", error);
        });
    },
    getUsers() {
      objectsService
        .receivers()
        .then((response) => {
          this.optionsOfUsers = response;
        })
        .catch((error) => {
          handleError(this, "negative", "Error", error);
        });
    },
    addEvent() {
      objectsService
        .newEvents(this.event)
        .then(() => {
          this.open = false;
          handleError(this, "positive");
        })
        .catch((error) => {
          handleError(this, "negative", "Error", error);
        });
    },
    reset() {
      this.event = {};
    },
  },
};
</script>

<style lang="scss"></style>
