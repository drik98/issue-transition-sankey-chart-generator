<template>
  <div class="side-nav-outer-toolbar">
    <header-toolbar
      class="layout-header"
      :menu-toggle-enabled="true"
      :toggle-menu-func="toggleMenu"
      :title="title"
    />
    <dx-scroll-view ref="scrollViewRef" class="with-footer">
      <slot />
      <slot name="footer" />
    </dx-scroll-view>
  </div>
</template>

<script>
import DxScrollView from "devextreme-vue/scroll-view";

import HeaderToolbar from "../components/header-toolbar";
import { computed, ref, watch } from "vue";

export default {
  props: {
    title: String,
    isXSmall: Boolean,
    isLarge: Boolean,
  },
  setup(props) {
    const scrollViewRef = ref(null);
    const menuOpened = ref(props.isLarge);
    const menuTemporaryOpened = ref(false);

    function toggleMenu(e) {
      const pointerEvent = e.event;
      pointerEvent.stopPropagation();
      if (menuOpened.value) {
        menuTemporaryOpened.value = false;
      }
      menuOpened.value = !menuOpened.value;
    }

    function handleSideBarClick() {
      if (menuOpened.value === false) {
        menuTemporaryOpened.value = true;
      }
      menuOpened.value = true;
    }

    const drawerOptions = computed(() => {
      const shaderEnabled = !props.isLarge;

      return {
        menuMode: props.isLarge ? "shrink" : "overlap",
        menuRevealMode: props.isXSmall ? "slide" : "expand",
        minMenuSize: props.isXSmall ? 0 : 60,
        maxMenuSize: props.isXSmall ? 250 : undefined,
        closeOnOutsideClick: shaderEnabled,
        shaderEnabled,
      };
    });

    watch(
      () => props.isLarge,
      () => {
        if (!menuTemporaryOpened.value) {
          menuOpened.value = props.isLarge;
        }
      }
    );

    return {
      menuOpened,
      toggleMenu,
      handleSideBarClick,
      drawerOptions,
      scrollViewRef,
    };
  },
  components: {
    DxScrollView,
    HeaderToolbar,
  },
};
</script>

<style lang="scss" scoped>
.side-nav-outer-toolbar {
  flex-direction: column;
  display: flex;
  height: 100%;
  width: 100%;
}

.layout-header {
  z-index: 1501;
}
</style>
