<template>
  <div class="widget-container">
    <h2>Upload CSV File</h2>
    <span class="info-text">
      The goal of this web application is to visualize how the status of the
      issues has changed from the start to the end of a sprint. As a data basis,
      a CSV file has to be imported that contains at least the status of the
      issues at the start and end. In addition, the issue ID should also be
      available so that the Sankey chart can display which issues have achieved
      which flow.
    </span>
    <DxFileUploader
      :allowedFileExtensions="['.csv']"
      :multiple="false"
      :showFileList="false"
      upload-mode="useForm"
      @value-changed="handleFileUpload"
    />
  </div>
</template>

<script>
import { DxFileUploader } from "devextreme-vue/file-uploader";
import Papa from "papaparse";

export default {
  components: {
    DxFileUploader,
  },
  methods: {
    handleFileUpload({ value: [file] }) {
      Papa.parse(file, {
        complete: ({ data }) => {
          this.$emit("data-uploaded", { data, headers: Object.keys(data[0]) });
        },
        header: true,
        skipEmptyLines: true,
        transform: (value) => value || "None",
      });
    },
  },
};
</script>
