<template>
  <v-card class="markdown" style="background-color:#272822;" dark>
    <v-card-title class="pa-0">
      <v-layout>
        <v-flex>
          <v-tabs v-model="currentTab" background-color="transparent" dark>
            <v-tab v-for="tab in tabs" :key="tab">
              {{ tab }}
            </v-tab>
          </v-tabs>
        </v-flex>
        <v-flex shrink align-center class="px-2 d-flex">
          <v-btn icon small @click="copy">
            <v-icon dark class="far fa-copy" small></v-icon>
          </v-btn>
        </v-flex>
      </v-layout>


    </v-card-title>
    <v-divider/>
    <v-card-text>
      <v-tabs-items v-model="currentTab" dark style="background-color:#272822;">
        <v-tab-item v-for="code in codes" :key="code">
          <div ref="markdown" v-html="code" v-highlight></div>
        </v-tab-item>
      </v-tabs-items>

    </v-card-text>
  </v-card>
</template>
<script>
  import '~/styles/markdown.scss'

  export default {
    props: {
      tabs: {
        type: Array
      },
      codes: {
        type: Array
      },
    },
    data: () => ({
      currentTab: undefined
    }),
    methods: {
      copy() {
        this.$copyText(this.$refs.markdown[this.currentTab].innerText)
      }
    }
  }
</script>
