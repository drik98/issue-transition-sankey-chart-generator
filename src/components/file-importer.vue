<template>
  <div class="widget-container">
    <h2>Upload CSV File</h2>
    <span class="info-text">
      The goal of this web application is to visualize how the status of the
      issues has changed from the start to the end of a sprint. As a data basis,
      a CSV file has to be imported that contains at least the status of the
      issues at the start and end. In addition, the issue ID should also be
      available so that the Sankey chart can display which issues have achieved
      which flow. Alternatively the button "Import Sample Data" can be used for
      demonstration purposes.
    </span>

    <div class="upload-form">
      <DxFileUploader
        :allowedFileExtensions="['.csv']"
        :multiple="false"
        :showFileList="false"
        upload-mode="useForm"
        @value-changed="handleFileUpload"
      />
      <DxButton
        class="upload-sample"
        text="Import Sample Data"
        icon="importselected"
        @click="importSampleData"
      />
    </div>
  </div>
</template>

<script>
import { DxFileUploader } from "devextreme-vue/file-uploader";
import { DxButton } from "devextreme-vue/button";
import Papa from "papaparse";
import sampleFile from "../../testing/example_tickets.csv";

export default {
  components: {
    DxButton,
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
    /**
     * This function makes use of the sample file that can be uploaded for testing purposes. Using this function
     * skips the need to download and upload the file and reuses the existing file upload mechanism.
     */
    importSampleData() {
      this.handleFileUpload({ value: [sampleFile] });
    },
  },
};
</script>

<style scoped lang="scss">
.upload-form {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .upload-sample {
    min-width: 300px;
  }
}
</style>
