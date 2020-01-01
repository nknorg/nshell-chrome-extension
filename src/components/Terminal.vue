<template>
  <div ref="terminal"></div>
</template>
<script>
  import { Terminal } from 'xterm'
  import { FitAddon } from 'xterm-addon-fit'
  import { WebLinksAddon } from 'xterm-addon-web-links'
  import 'xterm/css/xterm.css'
  export default {
    name: 'terminal',
    props: {
    },
    data: () => ({

    }),
    mounted() {
      const terminal = new Terminal()
      const fitAddon = new FitAddon()
      terminal.loadAddon(new WebLinksAddon())
      terminal.loadAddon(fitAddon)
      terminal.open(this.$refs.terminal)
      fitAddon.fit()
      terminal.focus()
      this.$emit('input', terminal)

      window.onresize = () => {
        fitAddon.fit()
      }
    },
    methods: {

    }
  }
</script>
