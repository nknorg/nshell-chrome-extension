<template>
    <v-dialog v-model="visible" max-width="1200px" @click:outside="">
        <v-form ref="form" @submit.prevent="next">
            <v-card>
                <v-card-title>
                    <span class="headline">{{$i18n.getMessage('ADD_KEYSTORE')}}</span>
                    <v-spacer/>
                    <v-btn class="mr-0" icon small @click="cancel">
                        <v-icon class="fas fa-times" color="grey darken-2" small/>
                    </v-btn>
                </v-card-title>
                <v-divider/>
                <v-card-text class="pt-10">
                    <v-text-field autofocus
                                  v-model="seed"
                                  :label="$i18n.getMessage('SEED')"
                                  persistent-hint
                                  :rules="[$rules.fieldRequired($i18n.getMessage('SEED')),$rules.seed]"
                    />
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

  export default {
    name: 'AddKeystore',
    components: {},
    props: {
      value: {
        type: Boolean,
        default: false
      },
      item: {
        type: Object
      },
      onSuccess:{
        type: Function
      }
    },
    data() {
      return {
        visible: this.value,
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
      }
    },
    methods: {
      cancel() {
        this.visible = false
      },
      async next() {
        if (this.$refs.form.validate()) {
          await this.$syncStorage.setSeed(this.seed, this.tags)
          this.seed = ''
          this.cancel()
          if(this.onSuccess) {
            this.onSuccess()
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
