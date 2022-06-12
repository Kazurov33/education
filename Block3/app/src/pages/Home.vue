<template>
  <div>
    <div class="fixed-center text-h5">
      <q-btn label="Add event" color="primary" @click="getAddInfo" />
    </div>
    <q-dialog v-model="open" @hide="reset">
      <q-card>
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
          />
          <q-input type="textarea" label="Event Text" v-model="event.Text" />
          <q-radio
            v-model="event.Type"
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            val="full"
            label="All users"
          />
          <q-radio
            v-model="event.Type"
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            val="systemFull"
            label="One system users"
            @input="getSystems"
          />
          <q-radio
            v-model="event.Type"
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            val="user"
            label="Concrete user"
          />
          <q-input
            v-if="event.Type === 'user'"
            label="User ID"
            v-model="event.ReceiverID"
          />
          <q-select
            v-if="event.Type === 'systemFull'"
            :options="optionsOfSystems"
            v-model="event.SystemID"
            label="Choose system"
            option-label="Name"
            option-value="Key"
            emit-value
            map-options
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Create" color="primary" @click="addEvent" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { objectsService } from "../services/objects.service";
import { directoryService } from "../services/directory.service";

export default {
  name: "Home",
  data() {
    return {
      open: false,
      event: { Type: "full" },
      optionsOfTypes: [],
      optionsOfSystems: [],
    };
  },
  methods: {
    getAddInfo() {
      directoryService
        .eventTypes()
        .then((response) => {
          this.optionsOfTypes = response;
          this.open = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getSystems() {
      objectsService
        .systems()
        .then((response) => {
          this.optionsOfSystems = response;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addEvent() {
      objectsService.newEvents(this.event).then(() => {
        this.open = false;
      });
    },
    reset() {
      this.event = { Type: "full" };
    },
  },
};
</script>

<style lang="scss"></style>
