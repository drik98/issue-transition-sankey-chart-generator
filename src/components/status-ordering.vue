<template>
  <div>
    <h2>Select the Order of the Issue Status</h2>
    <DxScrollView id="scroll" direction="vertical" show-scrollbar="always">
      <DxSortable id="list" @drag-start="onDragStart" @reorder="onReorder">
        <template #drag="{ data }">
          <div
            class="item dx-card dx-theme-text-color dx-theme-background-color"
            style="font-weight: bold; width: 200px; padding: 10px"
          >
            {{ data.itemData }}
          </div>
        </template>
        <template #content>
          <div>
            <div
              v-for="item in items"
              :key="item"
              class="item dx-card dx-theme-text-color dx-theme-background-color"
            >
              {{ item }}
            </div>
          </div>
        </template>
      </DxSortable>
    </DxScrollView>
  </div>
</template>

<script>
import DxScrollView from "devextreme-vue/scroll-view";
import DxSortable from "devextreme-vue/sortable";

export default {
  components: {
    DxScrollView,
    DxSortable,
  },
  props: {
    status: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    items: [],
  }),
  watch: {
    status: {
      immediate: true,
      handler(status) {
        this.items = status;
      },
    },
  },
  methods: {
    onDragStart(e) {
      e.itemData = this.items[e.fromIndex];
    },
    onReorder(e) {
      this.items.splice(e.fromIndex, 1);
      this.items.splice(e.toIndex, 0, e.itemData);
      this.$emit("update:status", this.items);
    },
  },
};
</script>

<style scoped>
.item {
  box-sizing: border-box;
  position: relative;
  padding: 10px 20px;
  margin-bottom: 10px;
  background: white;
  cursor: pointer;
}
</style>
