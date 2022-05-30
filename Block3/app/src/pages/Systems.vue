<template>
  <div>
    <q-table :data="systems" :columns="columns" />
  </div>
</template>

<script>
export default {
  name: "Error404",
  data() {
    return {
      systems: [],
      columns: [],
    };
  },
  mounted() {},
};
</script>
