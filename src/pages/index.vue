<template>
    <v-container>
        <v-row>

            <v-col cols="12" sm="6" md="4" v-for="(item, i) in shells">
                <v-card outlined>
                    <v-card-text>
                        <h3>{{item.name}}</h3>

                        <v-text-field v-model="item.serverAddr"
                                      :label="$i18n.getMessage('SERVER_ADDRESS')"
                                      persistent-hint
                                      hide-details
                                      readonly
                        />

                        <v-text-field :value="item.identifier +'.' + item.publicKey"
                                      :label="$i18n.getMessage('CLIENT_ADDRESS')"
                                      persistent-hint
                                      hide-details
                                      readonly
                        />
                        <v-layout class="mt-2">
                            <v-chip class="mx-1" small v-for="tag in item.tags">{{tag}}</v-chip>
                        </v-layout>
                    </v-card-text>
                    <v-divider class="mt-2 mx-0"/>
                    <v-card-actions>
                        <v-btn color="error" text fab small @click="showConfirm(i)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        <v-btn color="green" text fab small @click="editNShell(i)">
                            <font-awesome-icon :icon="['fas', 'edit']" style="font-size: 20px;"/>
                        </v-btn>

                        <v-spacer/>
                        <v-btn color="primary" text :to="'/terminal/' + i" target="_blank">Connect</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

            <v-col
                    cols="12"
                    sm="6"
                    md="4"
            >

                <v-card outlined>
                    <v-skeleton-loader class="mx-auto" type="article, actions"/>
                    <v-fade-transition>
                        <v-overlay absolute color="black">
                            <v-btn color="primary" @click="addNShell">
                                <v-icon>mdi-plus</v-icon>
                                {{$i18n.getMessage('ADD_NSHELL')}}
                            </v-btn>
                        </v-overlay>
                    </v-fade-transition>
                </v-card>

            </v-col>
        </v-row>
        <add-n-shell v-model="showAddNShell" :current-index="currentIndex" :item="editItem"
                     :on-success="onAddKeyStoreSuccess"/>
        <confirm v-model="confirmDialog" :title="$i18n.getMessage('CONFIRM_TITLE')"
                 :message="$i18n.getMessage('CONFIRM_DELETE')" :on-success="onConfirmSuccess"/>
    </v-container>
</template>

<script>
  import AddNShell from '../components/dialog/AddNShell'
  import Confirm from '../components/dialog/Confirm'
  import Wallet from 'nkn-wallet'

  export default {
    name: 'index',
    components: {AddNShell, Confirm},
    data() {
      return {
        shells: [],
        confirmDialog: false,
        showAddNShell: false,
        editItem: undefined,
        currentIndex: undefined
      }
    },
    async created() {
      this.init()
    },
    methods: {
      async init() {
        this.currentIndex = undefined
        this.editItem = undefined
        this.shells = await this.$syncStorage.getShell()
        this.shells.map(x => {
          try {
            x.publicKey = Wallet.restoreWalletBySeed(x.seed, '').getPublicKey()
          } catch (e) {
            console.log(e)
          }

        })
      },
      onAddKeyStoreSuccess() {
        this.init()
      },
      async del(n) {
        await this.$syncStorage.removeShellOfIndex(n)
        this.init()
      },
      showConfirm(n) {
        this.confirmDialog = true
        this.currentIndex = n
      },
      onConfirmSuccess() {
        this.del(this.currentIndex)
      },
      editNShell(n) {
        this.editItem = this.shells[n]
        this.currentIndex = n
        this.showAddNShell = true
      },
      addNShell(){
        this.currentIndex = undefined
        this.editItem = undefined
        this.showAddNShell = true
      }
    }
  }
</script>
