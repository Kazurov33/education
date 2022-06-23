<template>
  <div class="q-pa-md">
    <q-table
      flat
      :data="events"
      :columns="columns"
      :rows-per-page-options="[50, 100]"
      :filter="filter"
      class="historyTable"
    >
      <template v-slot:top>
        <div class="full-width" style="display: inline-flex">
          <div class="q-table__title">
            <b>Notify history</b>
          </div>
        </div>
        <div class="full-width">
          <q-input
            outlined
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
            class="full-width"
            style="margin-right: 5px"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { objectsService } from "../services/objects.service";
import { date } from "quasar";

export default {
  name: "EventHistory",
  data() {
    return {
      events: [],
      filter: "",
      columns: [
        {
          name: "date",
          label: "CreationDate",
          align: "left",
          sortable: true,
          field: (row) => date.formatDate(row.CreationDate, "DD.MM.YYYY HH:mm"),
        },
        {
          name: "creator",
          label: "Creator login",
          align: "left",
          field: "CreatorLogin",
          style: "white-space: normal;",
        },
        {
          name: "receiver",
          label: "Receiver ID",
          align: "left",
          field: "ReceiverID",
          style: "white-space: normal;",
        },
        {
          name: "system",
          label: "System ID",
          align: "left",
          field: (row) => (row.System ? row.System.Name : ""),
          style: "white-space: normal;",
        },
        {
          name: "type",
          label: "Event type",
          align: "left",
          field: (row) => row.EventType.Name,
          style: "white-space: normal;",
        },
        {
          name: "isRead",
          label: "isRead",
          align: "left",
          field: "isRead",
          sortable: true,
          style: "white-space: normal;",
        },
        {
          name: "text",
          label: "Text",
          align: "left",
          field: "Text",
          style: "white-space: normal;",
        },
      ],
    };
  },
  methods: {},
  mounted() {
    objectsService.events().then((response) => (this.events = response));
  },
};
</script>

<style scoped>
.historyTabel .q-table__top {
  padding: 0;
}
</style>
