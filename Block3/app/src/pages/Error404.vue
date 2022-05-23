<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Whooops...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="green"
        unelevated
        :to="{ name: 'WebMap' }"
        label="Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Error404",
  data() {
    return {};
  },
  async mounted() {},
};
</script>
