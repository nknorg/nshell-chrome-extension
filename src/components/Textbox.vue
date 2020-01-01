<template>
    <v-text-field
            v-model="localValue"
            :label="label"
            persistent-hint
            :hide-details="hideDetails"
            :readonly="readonly"
            :placeholder="placeholder"
            :rules="localRule"
            :error="error"
            :error-messages="errorMessage"
    >
        <template v-slot:append>

        </template>
    </v-text-field>
</template>
<script>
  export default {
    name: 'Textbox',
    props: {
      value: {
        type: String
      },
      label: {
        type: String
      },
      placeholder: {
        type: String
      },
      hideDetails: {
        type: Boolean
      },
      readonly: {
        type: Boolean
      },
      rule: {
        type: Array
      },
      required: {
        type: Boolean
      },
      email: {
        type: Boolean
      },
      nkn_addr: {
        type: Boolean
      },

    },
    computed: {
      localValue: {
        get: function () {
          return this.value
        },
        set: function (value) {
          this.$emit('input', value)
        }
      }
    },
    created() {
      this.init()
    },
    data: () => ({
      localRule: undefined,
      error: false,
      errorMessage: ''
    }),
    watch: {
      required(val) {
        this.init()
      },
      rule(val) {
        this.init()
      },
      email(val) {
        this.init()
      },
      nkn_addr(val) {
        this.init()
      },
      seed(val) {
        this.init()
      }
    },
    methods: {
      init() {
        this.localRule = this.rule || []
        if (this.required) {
          this.localRule = [
            ...this.localRule,
            v => !!v || this.$t('FIELD_REQUIRED')
          ]
        }

        if (this.email) {
          this.localRule = [
            ...this.localRule,
            v => !v || /.+@.+\..+/.test(v) || this.$t('rule.EMAIL_ERROR_VALID'),
          ]
        } else if (this.nkn_addr) {
          this.localRule = [
            ...this.localRule,
            v => !v || /^([0-9a-f]{64}|([^.]*\.)+[0-9a-f]{64})$/.test(v) || this.$t('rule.NKN_ADDR_ERROR_VALID'),
          ]
        }

      },

    }
  }
</script>
