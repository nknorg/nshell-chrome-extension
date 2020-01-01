<template>
    <v-dialog v-model="visible" max-width="1200px" @click:outside="">
        <v-form ref="form" @submit.prevent="next">
            <v-card>
                <v-card-title>
                    <span class="headline" v-if="currentIndex!=null && currentIndex>-1">{{$i18n.getMessage('EDIT_NSHELL')}}</span>
                    <span class="headline" v-else>{{$i18n.getMessage('ADD_NSHELL')}}</span>
                    <v-spacer/>
                    <v-btn class="mr-0" icon small @click="cancel">
                        <v-icon class="fas fa-times" color="grey darken-2" small/>
                    </v-btn>
                </v-card-title>
                <v-divider/>
                <v-card-text class="pt-10">
                    <v-text-field
                            v-model="name"
                            :label="$i18n.getMessage('NAME')"
                            persistent-hint
                            :rules="[$rules.fieldRequired($i18n.getMessage('NAME'))]"
                    />
                    <v-text-field
                            v-model="serverAddr"
                            :label="$i18n.getMessage('SERVER_ADDRESS')"
                            persistent-hint
                            :rules="[$rules.fieldRequired($i18n.getMessage('SERVER_ADDRESS'))]"
                    />

                    <v-row>
                        <v-col cols="3">
                            <v-text-field
                                    v-model="identifier"
                                    :label="$i18n.getMessage('IDENTIFIER')"
                                    persistent-hint
                                    hide-details
                            />


                        </v-col>
                        <v-layout shrink align-center style="font-size: 50px;">.</v-layout>
                        <v-col>
                            <seed-select v-model="seed"/>
                        </v-col>
                    </v-row>


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
        </v-form>
    </v-dialog>
</template>

<script>
  import SeedSelect from '../../components/widget/SeedSelect'
  import Seed from '../../pages/keystore'

  export default {
    name: 'AddNShell',
    components: {Seed, SeedSelect},
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
        name: '',
        serverAddr: '',
        identifier: '',
        seed: '',
        tags: []
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
          this.name = val.name
          this.serverAddr = val.serverAddr
          this.identifier = val.identifier
          this.tags = val.tags
        }else{
          this.init()
        }
      }
    },

    methods: {
      init() {
        this.name = ''
        this.serverAddr = ''
        this.identifier = ''
        this.seed = ''
        this.tags = []
      },
      cancel() {
        this.visible = false
      },
      async next() {
        if (this.$refs.form.validate()) {
          let data = {
            name: this.name,
            serverAddr: this.serverAddr,
            identifier: this.identifier,
            seed: this.seed,
            tags: this.tags
          }
          if (this.currentIndex != null && this.currentIndex > -1) {
            await this.$syncStorage.setShell(this.currentIndex, data)
          } else {
            await this.$syncStorage.addShell(data)
          }

          this.cancel()
          if (this.onSuccess) {
            this.onSuccess()
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
