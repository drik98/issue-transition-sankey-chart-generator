<template>
  <div>
    <h2>Check Imported Data</h2>
    <span class="info-text">
      This step is just for validating that the correct file was uploaded.
    </span>
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
