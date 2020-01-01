<template>
  <v-footer class="px-0 pt-0 pb-0 footer" height="auto">
    <v-card flat dark tile class="indigo lighten-1 text-center" width="100%">
      <v-divider></v-divider>

      <v-card-text class="white--text">
        Copyright &copy; 2020 — <strong>nShell</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
  export default {
    data:() =>({
      icons: [
        {icon: 'fab fa-github', tooltip: 'GitHub', url: 'https://github.com/nknorg'},
        {icon: 'fab fa-discord', tooltip: 'Discord', url: 'https://discord.gg/hrZvrVa'},
        {icon: 'fab fa-twitter', tooltip: 'Twitter', url: 'https://twitter.com/NKN_ORG'},
        {icon: 'fas fa-comments', tooltip: 'Forum', url: 'https://forum.nkn.org/'},
        {icon: 'fab fa-youtube', tooltip: 'Youtube', url: 'http://www.youtube.com/c/NKNORG'},
        {icon: 'fab fa-telegram', tooltip: 'Telegram', url: 'https://t.me/nknorg'},
        {icon: 'fab fa-medium', tooltip: 'Medium', url: 'https://medium.com/nknetwork'},
      ]
    })
  }
</script>
