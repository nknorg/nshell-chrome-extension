<template>
  <v-snackbar v-model="visible"
              :color="type"
              multi-line
              :timeout="timeout"
              left
  >
    {{ message }}
    <v-btn dark text @click="cancel">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex'

  export default {
    name: 'Snackbar',
    computed: {
      ...mapState({
        snackbar: state => state.snackbar,
        type: state => state.snackbarType,
        message: state => state.snackbarMessage,
      })
    },

    data() {
      return {
        timeout: 3000,
        visible: this.snackbar
      }
    },
    methods: {
      ...mapMutations(['setSnackbar']),
      cancel() {
        this.setSnackbar({snackbar: false})
      }
    },
    watch: {
      visible(v) {
        if (!v)
          this.cancel()
      },
      snackbar(v) {
        this.visible = v
      }
    }
  }
</script>

