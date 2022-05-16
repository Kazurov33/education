<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title> Сервис уведомлений </q-toolbar-title>

        <q-space />

        <q-btn icon="logout" @click="logout" flat />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="170"
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Главная</q-item-label>
        <q-item
          clickable
          :to="{ name: 'Home' }"
          :class="active == 'Diplomas' ? 'itemActive' : 'itemNonActive'"
          @click="active = 'Diplomas'"
        >
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { objectsService } from "../../services/objects.service";

export default {
  name: "MainLayout",
  components: {},
  data() {
    return {
      leftDrawerOpen: false,
      active: "Home",
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logoutAdmin");
      this.$router.push("/admin/login");
    },
  },
};
</script>

<style lang="scss"></style>
