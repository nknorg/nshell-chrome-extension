<template>
    <v-app>
        <v-app-bar
                app
                color="indigo"
                dark
        >
            <v-toolbar-title>nShell</v-toolbar-title>
            <v-spacer/>
            <v-btn icon to="/">
                <font-awesome-icon :icon="['fas', 'terminal']" size="2x"/>
            </v-btn>

            <v-btn icon to="/seed">
                <v-icon large>mdi-fingerprint</v-icon>
            </v-btn>

            <v-divider class="mx-4" inset vertical/>
            <v-btn icon>
                <v-icon>mdi-tab</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon large>mdi-fullscreen</v-icon>
            </v-btn>
        </v-app-bar>
        <v-content>
            error
            <router-view/>
        </v-content>
        <Footer/>
    </v-app>
</template>

<script>
  import Footer from '../components/Footer'
  import '../styles/global.scss'

  export default {
    name: 'error',
    components: {Footer},
    data() {
      return {
        message: 'hello'
      }
    },
    methods: {
      test() {
        // this.message= this.$bg.test()
        chrome.windows.create({'url': chrome.extension.getURL('popup.html'), type: 'popup'}, function (tab) {
          console.log(tab)
        })
      }
    }
  }
</script>
