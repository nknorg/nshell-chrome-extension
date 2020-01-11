<template>
    <terminal-component v-model="term" style="width:100%;height:100%;"/>
</template>

<script>
  import Client from 'nkn-multiclient'
  import TerminalComponent from '../components/Terminal'

  export default {
    layout: 'terminal',
    name: 'terminal',
    components: {TerminalComponent},
    data() {
      return {
        term: undefined
      }
    },
    async mounted() {
      let seed = this.$route.params.seed
      let n = parseInt(this.$route.params.n)
      let shells = await this.$syncStorage.getShell()
      let shell = shells[n]
      if(!seed) {
        seed = shell.seed
      }
      let client = Client({
        seed: seed,
        identifier: shell.identifier,
      })
      this.term.onResize((size) => {
        client.send(shell.remoteAddr, JSON.stringify({resize: size}))
      });
      this.term.onKey((e) => {
        client.send(shell.remoteAddr, JSON.stringify({cmd: e.key}));
      });
      this.term.textarea.addEventListener('paste', (e) => {
        client.send(shell.remoteAddr, JSON.stringify({cmd: e.clipboardData.getData('text/plain')}));
      });
      client.on('connect', () => {
        client.send(shell.remoteAddr, JSON.stringify({
          resize: {cols: this.term.cols, rows: this.term.rows},
          cmd: '\x0c',
        }))
      });
      client.on('message', (src, payload, payloadType, encrypt) => {
        this.term.write(JSON.parse(payload).stdout)
      });
    },
    methods: {}
  }
</script>
