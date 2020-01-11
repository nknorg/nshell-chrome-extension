<template>
    <v-dialog v-model="visible" max-width="1200px" @click:outside="">

        <v-card>
            <v-toolbar flat>
                <v-toolbar-title class="mr-4">
                    <span class="headline" v-if="currentIndex!=null && currentIndex>-1">{{$i18n.getMessage('EDIT_KEYSTORE')}}</span>
                    <span class="headline" v-else>{{$i18n.getMessage('ADD_KEYSTORE')}}</span>
                </v-toolbar-title>

                <v-toolbar-items>
                    <v-btn text @click="selectTab(0)">{{$i18n.getMessage('SEED')}}</v-btn>
                    <v-btn text @click="selectTab(1)">{{$i18n.getMessage('KEYSTORE')}}</v-btn>
                </v-toolbar-items>
                <v-spacer/>
                <template v-if="$vuetify.breakpoint.smAndUp">
                    <v-btn class="mr-0" icon @click="cancel">
                        <font-awesome-icon :icon="['fas', 'times']" style="font-size: 20px;"/>
                    </v-btn>
                </template>
            </v-toolbar>
            <v-divider/>
            <v-card-text class="pt-10">
                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <v-form ref="form1">
                            <v-text-field autofocus
                                          v-model="seed"
                                          :label="$i18n.getMessage('SEED')"
                                          persistent-hint
                                          :rules="[$rules.fieldRequired($i18n.getMessage('SEED')),$rules.seed]"
                            />
                        </v-form>
                    </v-tab-item>
                    <v-tab-item>
                        <v-form ref="form2">
                            <v-file-input v-model="file" label="File input" accept="application/json"
                                          placeholder="Upload your documents"
                                          prepend-icon="mdi-paperclip"
                                          :error="fileError"
                                          :error-messages="fileErrorMessage"
                                          :rules="[$rules.fieldRequired($i18n.getMessage('KEYSTORE'))]"
                            >
                                <template v-slot:selection="{ text }">
                                    <v-chip small label color="primary">
                                        {{ text }}
                                    </v-chip>
                                </template>
                            </v-file-input>
                        </v-form>
                    </v-tab-item>
                </v-tabs-items>

                <v-combobox multiple
                            v-model="tags"
                            :label="$i18n.getMessage('TAG')"
                            hide-no-data
                            small-chips
                />
            </v-card-text>

            <v-card-actions class="pa-3">
                <v-btn color="blue darken-1" text @click="cancel">{{$i18n.getMessage('CANCEL')}}</v-btn>
                <v-spacer/>
                <v-btn color="primary" @click="next">{{$i18n.getMessage('OK')}}</v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script>
  import isNumber from 'lodash/isNumber'

  export default {
    name: 'AddKeystore',
    components: {},
    props: {
      value: {
        type: Boolean,
        default: false
      },
      currentIndex: {
        type: Number
      },
      item: {
        type: Object
      },
      onSuccess: {
        type: Function
      }
    },
    data() {
      return {
        visible: this.value,
        seed: '',
        file: undefined,
        fileError: false,
        fileErrorMessage: '',
        tags: [],
        tab: 0
      }
    },
    watch: {
      value(val) {
        this.visible = val
      },
      visible(val) {
        this.$emit('input', val)
      },
      item(val) {
        if (val) {
          this.seed = val.seed
          this.tags = val.tags
        } else {
          this.init()
        }
      },
      file(val) {
        if (!val) {
          this.fileError = true
          this.fileErrorMessage = this.$i18n.getMessage('FIELD_REQUIRED', this.$i18n.getMessage('KEYSTORE'))
        } else {
          this.fileError = false
          this.fileErrorMessage = ''
        }
      }
    },

    methods: {
      init() {
        this.seed = ''
        this.tags = []
      },
      selectTab(n) {
        this.tab = n
      },
      cancel() {
        this.visible = false
      },
      async next() {

        if (this.tab === 0) {
          if (!this.$refs.form1.validate()) {
            return
          }
          let data = {seed: this.seed, tags: this.tags}
          if (isNumber(this.currentIndex)) {
            await this.$syncStorage.setSeed(this.currentIndex, data)
          } else {
            await this.$syncStorage.addSeed(data)
          }
          this.cancel()
          if (this.onSuccess) {
            this.onSuccess()
          }
        } else if (this.tab === 1) {
          if (!this.$refs.form2.validate()) {
            return
          }
          if (!this.file) {
            this.fileError = true
            this.fileErrorMessage = this.$i18n.getMessage('FIELD_REQUIRED', this.$i18n.getMessage('KEYSTORE'))
            return
          }

          let reader = new FileReader()
          reader.readAsText(this.file, 'UTF-8')

          reader.onload = async (evt) => {
            let walletJson = evt.target.result
            let data = {keystore: walletJson, tags: this.tags}
            if (isNumber(this.currentIndex)) {
              await this.$syncStorage.setSeed(this.currentIndex, data)
            } else {
              await this.$syncStorage.addSeed(data)
            }
            this.cancel()
            if (this.onSuccess) {
              this.onSuccess()
            }
          }
        }


      }
    }
  }
</script>

<style scoped>

</style>
