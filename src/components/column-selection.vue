<template>
  <div class="column-selection dx-fieldset">
    <h2>Select Columns</h2>
    <span class="info-text">
      In order to display the transitions of the issues correctly in the chart, you
      must first select which of the imported columns contains the status at the
      start and end. In addition, you can select which template contains the
      issue ID.
    </span>

    <div class="dx-field mandatory">
      <div class="dx-field-label">Status @ Start</div>
      <div class="dx-field-value">
        <DxSelectBox
          :value="selectedColumns.statusStart"
          :items="headers"
          @value-changed="
            ({ value: statusStart }) =>
              $emit('update:selectedColumns', {
                ...selectedColumns,
                statusStart,
              })
          "
        />
      </div>
    </div>
    <div class="dx-field mandatory">
      <div class="dx-field-label">Status @ End</div>
      <div class="dx-field-value">
        <DxSelectBox
          :value="selectedColumns.statusEnd"
          :items="headers"
          @value-changed="
            ({ value: statusEnd }) =>
              $emit('update:selectedColumns', { ...selectedColumns, statusEnd })
          "
        />
      </div>
    </div>
    <div class="dx-field">
      <div class="dx-field-label">Issue</div>
      <div class="dx-field-value">
        <DxSelectBox
          :value="selectedColumns.issue"
          :items="headers"
          @value-changed="
            ({ value: issue }) =>
              $emit('update:selectedColumns', { ...selectedColumns, issue })
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import { DxSelectBox } from "devextreme-vue/select-box";

export default {
  components: {
    DxSelectBox,
  },
  props: {
    headers: {
      type: Array,
      required: true,
    },
    selectedColumns: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
h2 {
  margin-top: 0;
}

.dx-field.mandatory {
  .dx-field-label::after {
    content: " *";
    color: red;
  }
}
</style>
