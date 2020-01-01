<template>
  <v-dialog v-model="visible" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{title}}</span>
        <v-spacer></v-spacer>
        <v-btn class="mr-0" icon small @click="cancel">
          <v-icon class="fas fa-times" color="grey darken-2" small></v-icon>
        </v-btn>
      </v-card-title>
      <div class="divider"></div>

      <v-card-text v-if="!!json">
        <vue-json-pretty
          :data="json"
          highlightMouseoverNode
          highlightSelectedNode
        >
        </vue-json-pretty>
      </v-card-text>
      <v-card-text v-else>
        {{content}}
      </v-card-text>

      <v-card-actions class="pa-3">
        <v-btn color="blue darken-1" text @click="cancel">{{$t('CANCEL')}}</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="next">{{$t('OK')}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import VueJsonPretty from 'vue-json-pretty'
  import { mapActions, mapMutations, mapState } from 'vuex'

  export default {
    name: 'Modal',
    components: {
      VueJsonPretty
    },
    computed: {
      ...mapState({
        modal: state => state.modal,
        title: state => state.modalTitle,
        content: state => state.modalContent,
        json: state => state.modalJson
      })
    },
    data() {
      return {
        visible: this.modal
      }
    },
    methods: {
      ...mapMutations(['setModal']),
      cancel() {
        this.setModal({modal: false})
      },

      async next() {
        if (typeof this.onSuccess === 'function') {
          this.onSuccess()
        }
        this.cancel()
      }
    },
    watch: {
      visible(v) {
        if (!v)
          this.cancel()
      },
      modal(v) {
        this.visible = v
      }
    }
  }
</script>

<style scoped>

</style>
