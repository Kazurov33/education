<template>
  <div class="fixed-overlay" style="background-color: burlywood">
    <Login />
  </div>
</template>

<script>
import Login from "src/components/Login";

export default {
  name: "LoginPage",
  components: {
    Login,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.fixed-overlay {
  position: fixed;
  overflow: auto;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  background-size: cover;
}
</style>
