<template>
  <div class="widget-container">
    <h2>Upload CSV File</h2>
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
