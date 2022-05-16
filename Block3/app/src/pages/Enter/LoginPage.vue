<template>
  <div
    class="fixed-overlay"
    :style="`background-image: url(changeableIcons/${styleFolder}/AdminEnter/EnterBackgroundAdmin.png);`"
  >
    <Login />
  </div>
</template>

<script>
import Login from "src/components/Admin/Login";
import { appStyle } from "../../../../../basicConfigs/appInfo";

export default {
  name: "LoginPage",
  components: {
    Login,
  },
  data() {
    return { styleFolder: appStyle };
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
