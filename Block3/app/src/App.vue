<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>

<style>
@media (min-width: 1030px) {
  .max-desktop {
    max-width: 50%;
    margin: auto;
  }
}
</style>
