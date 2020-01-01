<template>
    <v-app>
        <v-app-bar app color="indigo" dark>

            <v-toolbar-title>
                <router-link tag="h3" to="/">
                    <v-avatar tile size="35">
                        <img src="/assets/logo.png" alt="avatar">
                    </v-avatar>
                    nShell
                </router-link>
            </v-toolbar-title>

            <v-spacer/>
            <v-btn icon to="/">
                <font-awesome-icon :icon="['fas', 'terminal']" size="2x"/>
            </v-btn>

            <v-btn icon to="/keystore">
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
            <router-view/>
        </v-content>
        <Footer/>
    </v-app>
</template>

<script>
  import Footer from '../components/Footer'
  import '../styles/global.scss'

  export default {
    name: 'default',
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
