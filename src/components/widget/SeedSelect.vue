<template>
    <v-combobox
            v-model="seed"
            :label="$i18n.getMessage('SEED')"
            :items="seeds"
            hide-no-data
            persistent-hint
            small-chips
            hide-details
    >
        <template v-slot:selection="{ attrs, item, parent, selected }">
            <v-chip v-if="typeof item === 'object' && item.seed" v-bind="attrs" small>
                {{item.seed.replace(/^(\w{3}).*(\w{3})$/,
                '$1**********************************************************$2') }}
            </v-chip>
            <v-chip v-else-if="item.keystore" v-bind="attrs" small>
                {{$i18n.getMessage('KEYSTORE')}}: {{ item.address}}
            </v-chip>
            <v-chip v-else v-bind="attrs" small>
                {{displaySeed(item)}}
            </v-chip>
        </template>
        <template v-slot:item="{ index, item }">
            <div v-if="item.seed">
                <v-chip class="mx-1" color="warning" small v-for="tag in item.tags">{{$i18n.getMessage('SEED')}}
                </v-chip>
                {{item.seed.replace(/^(\w{3}).*(\w{3})$/,
                '$1**********************************************************$2')}}
            </div>
            <div v-else>
                <v-chip class="mx-1" color="success" small v-for="tag in item.tags">{{$i18n.getMessage('KEYSTORE')}}
                </v-chip>
                {{item.address}}
            </div>
            <v-spacer/>
            <v-chip class="mx-1" small v-for="tag in item.tags">{{tag}}</v-chip>
        </template>
    </v-combobox>
</template>

<script>

  import { parseKeystore } from '../../helpers/utils.helper'

  export default {
    name: 'SeedSelect',
    components: {},
    props: {
      value: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        seed: this.value,
        seeds: []
      }
    },
    watch: {
      value(val) {
        this.seed = val
      },
      seed(val) {
        if (typeof val === 'object' && val.seed) {
          this.$emit('input', val.seed)
        } else if (val.keystore) {
          this.$emit('input', val.keystore)
        } else {
          this.$emit('input', val)
        }

      }
    },
    async created() {
      this.seeds = await this.$syncStorage.getSeeds()
      this.seeds.map(x => {
        if (x.keystore) {
          try {
            let keystore = parseKeystore(x.keystore)
            x.address = keystore.Address
          } catch (e) {
            console.log(e)
          }
        }
      })
    },
    methods: {
      displaySeed(seed){
        let keystore = parseKeystore(seed)
        if(keystore){
          return this.$i18n.getMessage('KEYSTORE') + ': ' + keystore.Address
        }else{
          return seed
        }
      }
    }
  }
</script>
