<template>
    <v-container>
        <v-card>
            <v-list>
                <v-subheader>{{$i18n.getMessage('MY_KEYSTORE')}}
                    <v-btn class="mx-2" fab dark small color="primary" @click="addKeystore">
                        <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
                </v-subheader>

                <v-list-item
                        v-for="(item, i) in seeds"
                        :key="i"
                >
                    <v-list-item-content v-if="!!item.seed">
                        <v-list-item-title>
                            <v-row align="center" justify="center">
                                <v-col>
                                    <v-text-field v-model="item.address"
                                                  :label="$i18n.getMessage('ADDRESS')"
                                                  persistent-hint
                                                  hide-details
                                                  readonly
                                    />
                                    <v-text-field v-model="item.seedDisplay"
                                                  :label="$i18n.getMessage('SEED')"
                                                  persistent-hint
                                                  hide-details
                                                  readonly
                                    />

                                </v-col>
                                <v-col class="shrink" align-self="end">
                                    <v-btn color="primary" text fab small @click="toggleSeed(i)">
                                        <v-icon v-if="item.show">mdi-eye-off</v-icon>
                                        <v-icon v-else>mdi-eye</v-icon>
                                    </v-btn>
                                    <v-btn color="green" text fab small @click="editKeystore(i)">
                                        <font-awesome-icon :icon="['fas', 'edit']" style="font-size: 20px;"/>
                                    </v-btn>
                                    <v-btn color="error" text fab small @click="showConfirm(i)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            <v-chip class="mx-1" small v-for="tag in item.tags">{{tag}}</v-chip>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content v-else>
                        <v-list-item-title>
                            <v-row align="center" justify="center">
                                <v-col>
                                    <v-text-field v-model="item.address"
                                                  :label="$i18n.getMessage('ADDRESS')"
                                                  persistent-hint
                                                  hide-details
                                                  readonly
                                    />

                                </v-col>
                                <v-col class="shrink" align-self="end">

                                    <v-btn color="green" text fab small @click="editKeystore(i)">
                                        <font-awesome-icon :icon="['fas', 'edit']" style="font-size: 20px;"/>
                                    </v-btn>
                                    <v-btn color="error" text fab small @click="showConfirm(i)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            <v-chip class="mx-1" small v-for="tag in item.tags">{{tag}}</v-chip>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
        </v-card>

        <add-keystore v-model="showAddKeystore" :current-index="currentIndex" :item="editItem"
                      :on-success="onAddKeyStoreSuccess"/>
        <confirm v-model="confirmDialog" :title="$i18n.getMessage('CONFIRM_TITLE')"
                 :message="$i18n.getMessage('CONFIRM_DELETE')" :on-success="onConfirmSuccess"/>
    </v-container>
</template>

<script>
  import AddKeystore from '../components/dialog/AddKeystore'
  import Confirm from '../components/dialog/Confirm'
  import Wallet from 'nkn-wallet'
  import { parseKeystore } from '../helpers/utils.helper'

  export default {
    name: 'seed',
    components: {
      AddKeystore,
      Confirm,
    },
    data() {
      return {
        confirmDialog: false,
        showAddKeystore: false,
        seeds: [],
        currentIndex: undefined,
        editItem: undefined
      }
    },
    async created() {
      this.init()

    },
    methods: {
      async init() {
        this.currentIndex = undefined
        this.seeds = await this.$syncStorage.getSeeds()

        this.seeds.map(x => {
          if (x.seed) {
            x.address = Wallet.restoreWalletBySeed(x.seed, '').address
            x.seedDisplay = x.seed.replace(/^(\w{3}).*(\w{3})$/, '$1**********************************************************$2')
            x.show = false
          } else {
            try {
              let keystore = parseKeystore(x.keystore)
              x.address = keystore.Address
            } catch (e) {
              console.log(e)
            }

          }

        })
      },
      onAddKeyStoreSuccess() {
        this.init()
      },
      async del(n) {
        await this.$syncStorage.removeSeedOfIndex(n)
        this.init()
      },
      showConfirm(n) {
        this.confirmDialog = true
        this.currentIndex = n
      },
      onConfirmSuccess() {
        this.del(this.currentIndex)
      },
      toggleSeed(n) {
        let item = this.seeds[n]
        if (!!item.show) {
          item.seedDisplay = item.seed.replace(/^(\w{3}).*(\w{3})$/, '$1**********************************************************$2')
        } else {
          item.seedDisplay = item.seed
        }
        this.$set(this.seeds, n, item)
        item.show = !item.show
      },
      editKeystore(n) {
        this.editItem = this.seeds[n]
        this.currentIndex = n
        this.showAddKeystore = true
      },
      addKeystore() {
        this.currentIndex = undefined
        this.editItem = undefined
        this.showAddKeystore = true
      }
    }
  }
</script>
