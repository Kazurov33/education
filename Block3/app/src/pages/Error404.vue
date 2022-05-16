<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">
        {{ language.error404 }}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="green"
        unelevated
        :to="{ name: 'WebMap' }"
        :label="language.toHome"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import lng from "src/assets/languagePackAdmin";

export default {
  name: "Error404",
  data() {
    return {
      language: {},
    };
  },
  async mounted() {
    this.language = await lng();
  },
};
</script>
