<template>
  <div>
    <h2>Check Imported Data</h2>
    <DxDataGrid
      :data-source="data"
      :row-alternation-enabled="true"
      :show-borders="true"
    />
  </div>
</template>

<script>
import { DxDataGrid } from "devextreme-vue/data-grid";

export default {
  components: {
    DxDataGrid,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped></style>
