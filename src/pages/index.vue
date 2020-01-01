<template>
    <v-container>
            <v-card>
                    Index
            </v-card>
    </v-container>
</template>

<script>
  import '../styles/global.scss'
  import LayoutDefault from '../layouts/default'

  export default {
    name: 'index',
    components: {LayoutDefault},
    data() {
      return {
        message: 'hello'
      }
    },
    methods: {}
  }
</script>
