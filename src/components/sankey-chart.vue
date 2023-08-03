<template>
  <div>
    <h2>Issue Transitions</h2>

    <span class="info-text">
      In this resulting Sankey chart, the transitions of the imported issues are
      shown based on the selected columns and order. When hovering over the
      connections, the IDs of the respective issues are displayed in addition to
      the start and end status, provided that the corresponding column has been
      selected. Using the burger menu, the chart can be exported in any desired
      file format.
    </span>

    <DxSankey
      id="sankey"
      :data-source="data"
      source-field="source"
      target-field="target"
      weight-field="weight"
      :label="{
        customizeText: mapLabel,
      }"
    >
      <DxTooltip
        :enabled="true"
        :customize-link-tooltip="customizeLinkTooltip"
      />
      <DxNode :width="8" :padding="30" />
      <DxLink color-mode="gradient" />
      <DxLabel v-if="Math.random() > 10" :customize-text="mapLabel" />
      <DxExport :enabled="true" :printing-enabled="false" />
    </DxSankey>
  </div>
</template>
<script>
import DxSankey, {
  DxTooltip,
  DxExport,
  DxNode,
  DxLink,
  DxLabel,
} from "devextreme-vue/sankey";

export default {
  components: {
    DxSankey,
    DxTooltip,
    DxNode,
    DxLabel,
    DxLink,
    DxExport,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    labelByStatus: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    isAnyIssuePresent({ issues }) {
      return issues?.some((issue) => issue?.trim());
    },
    customizeLinkTooltip(info) {
      const transition = this.data.find((transition) => {
        return (
          transition.source === info.source && transition.target === info.target
        );
      });
      return {
        html: `
            <b>From:</b>${transition.statusStart}<br/>
            <b>To:</b> ${transition.statusEnd}<br/>
            ${
              this.isAnyIssuePresent(transition)
                ? `<b>Issues:</b> ${transition.issues.join()}`
                : ""
            }`,
      };
    },
    mapLabel(node) {
      const links = node.linksOut.length ? node.linksOut : node.linksIn;

      const count = links.reduce((count, link) => count + link.weight, 0);

      return `${this.labelByStatus[node.title]} (${count})`;
    },
  },
};
</script>
<style scoped>
#sankey {
  height: 440px;
}
</style>
