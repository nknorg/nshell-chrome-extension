<template>
    <v-app>
        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>
  import Footer from '../components/Footer'
  import '../styles/global.scss'

  export default {
    name: 'terminal',
    components: {Footer},
    data() {
      return {
        message: 'hello'
      }
    },
    methods: {
      newWindow() {
        chrome.windows.create({'url': chrome.extension.getURL('popup.html'), type: 'popup'}, function (tab) {

        })
      },
      newTab(){
        chrome.tabs.create({'url': chrome.extension.getURL('popup.html')}, function (tab) {

        })
      }
    }
  }
</script>
