<template>
  <header class="header-component">
    <dx-toolbar class="header-toolbar">
      <dx-item
        v-if="title"
        location="before"
        css-class="header-title dx-toolbar-label"
      >
        <div>{{ title }}</div>
      </dx-item>
    </dx-toolbar>
  </header>
</template>

<script>
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";

export default {
  props: {
    title: String,
  },
  components: {
    DxToolbar,
    DxItem,
  },
};
</script>

<style lang="scss">
@import "../themes/generated/variables.base.scss";
@import "../dx-styles.scss";

.header-component {
  flex: 0 0 auto;
  z-index: 1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.header-title .dx-item-content {
  padding: 0 1rem;
  margin: 0;
}
</style>
