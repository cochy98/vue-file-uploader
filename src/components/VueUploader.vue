<template>
    <div class="form-group row mb-3">
        <VueFileAgent ref="myFiles" v-model="fileRecords"></VueFileAgent>
        <button type="button" @click="updateFile">Salva</button>

        <!-- <VueFileAgent ref="myFiles" v-model="fileRecords" :deletable="true"
                                    :helpText="'Seleziona un\'immagine'" :errorText="{
                                      type: 'Tipo non valido!',
                                    }" :maxFiles="1" @select="filesSelected($event)"
                                    @beforedelete="onBeforeDelete($event)" @delete="fileDeleted($event)">
                                </VueFileAgent> -->
        <!-- <input type="file" class="file-input" ref="myFiles"> -->
    </div>
</template>

<script>
export default {
    name: "VueUploader",
    data() {
        return {
            fileRecords: [],
            uploadUrl: 'http://localhost:80/api/profile',
            uploadHeaders: { 'Content-Type': 'multipart/form-data' },
            fileRecordsForUpload: [], // maintain an upload queue
            form: {},
        };
    },
    methods: {
        async updateFile() {
            const headers = { 'Content-Type': 'multipart/form-data' };
            const file = this.$refs.myFiles.fileRecords[0].file;
            //const file = this.$refs.myFiles.files[0];

            //aggiungo il file al mio form
            this.form.file = file;

            try {
                console.log("FACCIO L'UPLOAD");
                const { data } = await this.$http.post(`${this.$apiUri}/api/profile`, this.form, { headers })
                console.warn(data);
            }
            catch (e) {
                console.log(e);
            }
        },
        filesSelected: function (fileRecordsNewlySelected) {
            var validFileRecords = fileRecordsNewlySelected.filter((fileRecord) => !fileRecord.error);
            this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords);
        },
        onBeforeDelete: function (fileRecord) {
            var i = this.fileRecordsForUpload.indexOf(fileRecord);
            if (i !== -1) {
                // queued file, not yet uploaded. Just remove from the arrays
                this.fileRecordsForUpload.splice(i, 1);
                var k = this.fileRecords.indexOf(fileRecord);
                if (k !== -1) this.fileRecords.splice(k, 1);
            } else {
                if (confirm('Are you sure you want to delete?')) {
                    this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
                }
            }
        },
        fileDeleted: function (fileRecord) {
            var i = this.fileRecordsForUpload.indexOf(fileRecord);
            if (i !== -1) {
                this.fileRecordsForUpload.splice(i, 1);
            } else {
                this.deleteUploadedFile(fileRecord);
            }
        },
    },
}
</script>