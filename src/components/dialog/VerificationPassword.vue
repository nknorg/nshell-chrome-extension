<template>
    <v-dialog v-model="visible" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">{{$i18n.getMessage('WALLET')}}</span>
                <v-spacer/>
                <v-btn class="mr-0" icon @click="cancel">
                    <font-awesome-icon :icon="['fas', 'times']" style="font-size: 20px;"/>
                </v-btn>
            </v-card-title>

            <v-card-text>
                <v-form ref="form" @submit.prevent="next">
                    <v-card-text>
                        <v-text-field autofocus
                                      ref="password"
                                      v-model="password"
                                      :label="$i18n.getMessage('PASSWORD')"
                                      persistent-hint
                                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                      :type="showPassword ? 'text' : 'password'"
                                      :error="passwordError"
                                      :error-messages="passwordErrorMessage"
                                      @click:append="showPassword = !showPassword"
                        />
                    </v-card-text>
                </v-form>
            </v-card-text>

            <v-card-actions class="pa-3">
                <v-btn color="blue darken-1" text @click="cancel">{{$i18n.getMessage('CANCEL')}}</v-btn>
                <v-spacer/>
                <v-btn color="primary" @click="next">{{$i18n.getMessage('NEXT')}}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

  export default {
    name: 'VerificationPassword',
    components: {},
    props: {
      value: {
        type: Boolean,
        default: false
      },
      validate: {
        type: Function
      },
      onSuccess: {
        type: Function
      }
    },
    data() {
      return {
        visible: this.value,
        password: '',
        passwordError: false,
        passwordErrorMessage: '',
        showPassword: false,
      }
    },
    watch: {
      value(val) {
        this.visible = val
      },

      visible(val) {
        this.$emit('input', val)
      },
    },
    methods: {
      cancel() {
        this.visible = false
        this.$emit('input', this.visible)
      },

      async next() {
        if (this.validate) {
          let flag = this.validate(this.password)
          if (flag) {
            this.passwordError = false
            this.passwordErrorMessage = ''
            if(this.onSuccess){
              this.onSuccess()
            }
            this.cancel()
          }else{
            this.passwordError = true
            this.passwordErrorMessage = this.$i18n.getMessage('PASSWORD_ERROR')
          }
        }

      }
    }
  }
</script>
