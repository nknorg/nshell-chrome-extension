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
            <v-chip v-if="typeof item === 'object'" v-bind="attrs" small>
                {{item.seed.replace(/^(\w{3}).*(\w{3})$/,
                '$1**********************************************************$2') }}
            </v-chip>
            <v-chip v-else v-bind="attrs" small>
                {{item}}
            </v-chip>
        </template>
        <template v-slot:item="{ index, item }">
            {{item.seed.replace(/^(\w{3}).*(\w{3})$/,
            '$1**********************************************************$2')}}
            <v-spacer/>
            <v-chip class="mx-1" small v-for="tag in item.tags">{{tag}}</v-chip>
        </template>
    </v-combobox>
</template>

<script>

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
        seed: '',
        seeds: []
      }
    },
    watch: {

      seed(val){
        if (typeof val === 'object'){
          this.$emit('input', val.seed)
        }else{
          this.$emit('input', val)
        }

      }
    },
    async created() {
      this.seeds = await this.$syncStorage.getSeed()
    },
    methods: {}
  }
</script>
