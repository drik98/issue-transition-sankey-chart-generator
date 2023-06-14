<template>
  <div id="root">
    <div :class="cssClasses">
      <SideNavOuterToolbar
        :title="title"
        :is-x-small="screen.getScreenSizeInfo.isXSmall"
        :is-large="screen.getScreenSizeInfo.isLarge"
      >
        <div class="content">
          <FileImporter
            class="content-box"
            @data-uploaded="importedFileData = $event"
          />
          <Transition name="slide-fade">
            <DataTable
              v-if="importedFileData.data?.length"
              class="content-box"
              :data="importedFileData.data"
            />
          </Transition>
          <Transition name="slide-fade">
            <ColumnSelection
              v-if="importedFileData.headers?.length"
              class="content-box"
              :headers="importedFileData.headers"
              :selectedColumns="selectedColumns"
              @update:selectedColumns="selectedColumns = $event"
            />
          </Transition>
          <Transition name="slide-fade">
            <StatusOrdering
              v-if="areNecessaryColumnsSelected"
              class="content-box"
              :status="allStatus"
              @update:status="allStatus = $event"
            />
          </Transition>
          <Transition name="slide-fade">
            <SankeyChart
              v-if="orderedSankeyData.length && areNecessaryColumnsSelected"
              class="content-box"
              :data="orderedSankeyData"
              :labelByStatus="labelByStatus"
            />
          </Transition>
        </div>

        <template #footer>
          <app-footer />
        </template>
      </SideNavOuterToolbar>
    </div>
  </div>
</template>

<script>
import SideNavOuterToolbar from "./layouts/side-nav-outer-toolbar";
import AppFooter from "./components/app-footer";
import SankeyChart from "./components/sankey-chart";
import DataTable from "./components/data-table";
import ColumnSelection from "./components/column-selection";
import FileImporter from "./components/file-importer";
import StatusOrdering from "./components/status-ordering";
import { sizes, subscribe, unsubscribe } from "./utils/media-query";
import {
  getCurrentInstance,
  reactive,
  ref,
  onMounted,
  onBeforeUnmount,
  computed,
  watch,
} from "vue";

function getScreenSizeInfo() {
  const screenSizes = sizes();

  return {
    isXSmall: screenSizes["screen-x-small"],
    isLarge: screenSizes["screen-large"],
    cssClasses: Object.keys(screenSizes).filter((cl) => screenSizes[cl]),
  };
}

export default {
  components: {
    AppFooter,
    DataTable,
    ColumnSelection,
    FileImporter,
    SankeyChart,
    SideNavOuterToolbar,
    StatusOrdering,
  },
  setup() {
    const vm = getCurrentInstance();

    const title = vm.proxy.$appInfo.title;
    const screen = reactive({ getScreenSizeInfo: {} });
    screen.getScreenSizeInfo = getScreenSizeInfo();

    function screenSizeChanged() {
      screen.getScreenSizeInfo = getScreenSizeInfo();
    }

    onMounted(() => {
      subscribe(screenSizeChanged);
    });

    onBeforeUnmount(() => {
      unsubscribe(screenSizeChanged);
    });

    const cssClasses = computed(() => {
      return ["app"].concat(screen.getScreenSizeInfo.cssClasses);
    });

    const importedFileData = ref({ data: null, headers: null });
    const selectedColumns = ref({
      statusStart: "start",
      statusEnd: "end",
      issue: "ticket",
    });

    const areNecessaryColumnsSelected = computed(() => {
      return [
        selectedColumns.value.statusStart,
        selectedColumns.value.statusEnd,
      ].every((column) => importedFileData.value.headers?.includes(column));
    });

    const allStatus = ref([]);

    watch(
      () => [
        importedFileData.value.data,
        selectedColumns.value.statusStart,
        selectedColumns.value.statusEnd,
      ],
      () => {
        if (
          !areNecessaryColumnsSelected.value ||
          !importedFileData.value.data?.length
        ) {
          allStatus.value = [];
        }
        allStatus.value = Array.from(
          new Set(
            importedFileData.value.data.flatMap((row) => [
              row[selectedColumns.value.statusStart],
              row[selectedColumns.value.statusEnd],
            ])
          )
        );
      }
    );

    const labelByStatus = computed(() => {
      return allStatus.value.reduce((map, status) => {
        map[`${status}--start`] = status;
        map[`${status}--end`] = status;
        return map;
      }, {});
    });

    const sankeyData = computed(() => {
      const transitions = [];

      for (const row of importedFileData.value.data ?? []) {
        const index = transitions.findIndex((transition) => {
          return (
            transition.statusStart === row[selectedColumns.value.statusStart] &&
            transition.statusEnd === row[selectedColumns.value.statusEnd]
          );
        });
        if (index >= 0) {
          transitions[index].weight++;
          transitions[index].issues.push(row[selectedColumns.value.issue]);
        } else {
          transitions.push({
            statusStart: row[selectedColumns.value.statusStart],
            statusEnd: row[selectedColumns.value.statusEnd],
            source: `${row[selectedColumns.value.statusStart]}--start`,
            target: `${row[selectedColumns.value.statusEnd]}--end`,
            weight: 1,
            issues: [row[selectedColumns.value.issue]],
            label: "asdasdas",
          });
        }
      }
      return transitions;
    });

    const orderedSankeyData = computed(() => {
      return [...sankeyData.value].sort((transition1, transition2) => {
        const statusStartIndexTransition1 = allStatus.value.indexOf(
          transition1.statusStart
        );
        const statusStartIndexTransition2 = allStatus.value.indexOf(
          transition2.statusStart
        );
        const statusEndIndexTransition1 = allStatus.value.indexOf(
          transition1.statusEnd
        );
        const statusEndIndexTransition2 = allStatus.value.indexOf(
          transition2.statusEnd
        );

        if (statusStartIndexTransition1 !== statusStartIndexTransition2) {
          return statusStartIndexTransition1 - statusStartIndexTransition2;
        }
        return statusEndIndexTransition1 - statusEndIndexTransition2;
      });
    });

    return {
      title,
      screen,
      cssClasses,
      importedFileData,
      selectedColumns,
      sankeyData,
      areNecessaryColumnsSelected,
      allStatus,
      labelByStatus,
      orderedSankeyData,
    };
  },
};
</script>

<style scoped lang="scss">
#root {
  height: 100%;
}

* {
  box-sizing: border-box;
}

.app {
  @import "./themes/generated/variables.base.scss";
  background-color: darken($base-bg, 5);
  display: flex;
  height: 100%;
  width: 100%;
}
.content {
  padding: 1rem;
}

.slide-fade-enter-active {
  transition: all 0.8s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
</style>
