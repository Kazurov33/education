<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar color="primary">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title> Notify Service </q-toolbar-title>

        <q-space />

        <q-btn icon="logout" @click="logOut" flat />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      :width="170"
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Menu</q-item-label>
        <q-item
          clickable
          :to="{ name: 'Home' }"
          :class="$route.name == 'Home' ? 'itemActive' : 'itemNonActive'"
          @click="
            active = 'Home';
            leftDrawerOpen = false;
          "
        >
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          :to="{ name: 'Systems' }"
          :class="$route.name == 'Systems' ? 'itemActive' : 'itemNonActive'"
          @click="
            active = 'Systems';
            leftDrawerOpen = false;
          "
        >
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Systems</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          :to="{ name: 'EventHistory' }"
          :class="
            $route.name == 'EventHistory' ? 'itemActive' : 'itemNonActive'
          "
          @click="
            active = 'EventHistory';
            leftDrawerOpen = false;
          "
        >
          <q-item-section avatar>
            <q-icon name="history" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Events history</q-item-label>
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
      this.$store.dispatch("auth/logout");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style lang="scss">
.itemActive {
  color: primary !important;
}
.itemNonActive {
  color: #000 !important;
}
</style>
