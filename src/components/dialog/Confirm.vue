<template>
    <v-dialog v-model="visible" max-width="400px">
        <v-card>
            <v-card-title>
                <span class="headline">{{title}}</span>
                <v-spacer/>
                <v-btn class="mr-0" icon small @click="cancel">
                    <v-icon class="fas fa-times" color="grey darken-2" small/>
                </v-btn>
            </v-card-title>
            <div class="divider"></div>
          <v-card-text>
            {{message}}
          </v-card-text>

            <v-card-actions class="pa-3">
                <v-btn color="blue darken-1" text @click="cancel">{{('CANCEL')}}</v-btn>
                <v-spacer/>
                <v-btn color="primary" @click="next">{{('OK')}}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
  export default {
    name: "Confirm",
    components: {},
    props: {
      value: {
        type: Boolean,
        default: false
      },
      title:{
        type: String
      },
      message:{
        type: String
      },
      onSuccess: {
        type: Function
      }
    },
    data() {
      return {
        visible: this.value,

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
        this.$emit('input', this.visible)
      },

      async next() {
        if (typeof this.onSuccess === 'function') {
          this.onSuccess()
        }
        this.cancel()
      }
    }
  }
</script>

