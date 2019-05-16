<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            color="success lighten-2"
            dark
            v-on="on"
          >
            <v-icon left dark>phone</v-icon>
            Schedule Overview Call
          </v-btn>
        </template>
  
        <v-card>
          <v-card-title
            class="headline lighten-2 justify-center font-weight-bold title"
            primary-title
          >
            Schedule A Call Today
          </v-card-title>
  
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">Enter Your Information</v-stepper-step>
        
              <v-divider></v-divider>
        
              <v-stepper-step :complete="e1 > 2" step="2">Schedule Time Slot</v-stepper-step>
        
              <v-divider></v-divider>
        
              <v-stepper-step step="3">Final</v-stepper-step>
            </v-stepper-header>
        
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card
                >
                  <form>
                    <v-text-field
                      v-model="fullName"
                      :error-messages="fullNameErrors"
                      :counter="35"
                      label="Full Name"
                      required
                      @input="$v.fullName.$touch()"
                      @blur="$v.fullName.$touch()"
                      outline
                    ></v-text-field>
                    <v-text-field
                      v-model="businessEmail"
                      :error-messages="businessEmailErrors"
                      label="Business Email"
                      required
                      @input="$v.businessEmail.$touch()"
                      @blur="$v.businessEmail.$touch()"
                      outline
                    ></v-text-field>
                    <v-text-field
                      v-model="businessName"
                      :error-messages="businessNameErrors"
                      :counter="35"
                      label="Business Name"
                      required
                      @input="$v.businessName.$touch()"
                      @blur="$v.businessName.$touch()"
                      outline
                    ></v-text-field>
                    <v-text-field
                      v-model="businessPhone"
                      :error-messages="businessPhoneErrors"
                      label="Business Phone"
                      required
                      @input="$v.businessPhone.$touch()"
                      @blur="$v.businessPhone.$touch()"
                      outline
                      :mask="phoneMask"
                    ></v-text-field>

                  </form>
                </v-card>

                <v-btn
                  block
                  color="success"
                  @click="submit"
                >
                  <v-icon left dark>lock</v-icon>
                  Continue
                </v-btn>        
              </v-stepper-content>
        
              <v-stepper-content step="2">
                <v-card
                  class="mb-5"
                  color="grey lighten-1"
                  height="200px"
                ></v-card>
        
                <v-btn
                  block
                  color="success"
                  @click="e1 = 3"
                >
                  <v-icon left dark>lock</v-icon>
                  Continue
                </v-btn>
        
              </v-stepper-content>
        
              <v-stepper-content step="3">
                <v-card
                  class="mb-5"
                  color="grey lighten-1"
                  height="200px"
                ></v-card>
        
                <v-btn
                  block
                  color="success"
                  @click="e1 = 1"
                >
                  <v-icon left dark>lock</v-icon>
                  Continue
                </v-btn>
        
                <!--v-btn flat>Cancel</v-btn-->
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>  
        </v-card>
      </v-dialog>    
    </v-flex>
  </v-layout>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    fullName: { required, maxLength: maxLength(35) },
    businessName: { required, maxLength: maxLength(35) },
    businessEmail: { required, email },
    businessPhone: { required }
  },
  data () {
    return {
      dialog: false,
      e1: 0,
      fullName: '',
      businessEmail: '',
      businessName: '',
      businessPhone: '',
      phoneMask: 'phone'
    }
  },
  computed: {
    fullNameErrors () {
      const errors = []
      if (!this.$v.fullName.$dirty) return errors
      !this.$v.fullName.maxLength && errors.push('Full Name must be at most 35 characters long')
      !this.$v.fullName.required && errors.push('Full Name is required.')
      return errors
    },
    businessNameErrors () {
      const errors = []
      if (!this.$v.businessName.$dirty) return errors
      !this.$v.businessName.maxLength && errors.push('Business Name must be at most 35 characters long')
      !this.$v.businessName.required && errors.push('Business Name is required.')
      return errors
    },
    businessEmailErrors () {
      const errors = []
      if (!this.$v.businessEmail.$dirty) return errors
      !this.$v.businessEmail.email && errors.push('Must be valid e-mail')
      !this.$v.businessEmail.required && errors.push('Business E-mail is required')
      return errors
    },
    businessPhoneErrors () {
      const errors = []
      if (!this.$v.businessPhone.$dirty) return errors
      !this.$v.businessPhone.required && errors.push('Business Phone is required.')
      return errors
    }
  },
  methods: {
    submit () {
      this.$v.$touch()
      if (!this.$v.$error) {
        this.e1 = 2
      }
    },
    clear () {
      this.$v.$reset()
      this.fullName = ''
      this.businessEmail = ''
      this.businessName = ''
      this.businessPhone = ''
    }
  }
}
</script>

