<template>
    <component :is="layout || 'default'">
    </component>
</template>

<script>
  import '../../styles/global.scss'
  import Default from '../../layouts/default'
  import Terminal from '../../layouts/terminal'
  import Error from '../../layouts/error'

  export default {
    name: 'app',
    components: {Default,Error,Terminal},
    data() {
      return {
        layout : this.$router.getMatchedComponents()[0].layout,
      }
    },

    methods: {

    }
  }
</script>
