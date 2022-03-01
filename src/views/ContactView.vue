<template>
  <v-form
    @submit.prevent="validateAndSubmit"
    ref="form"
    v-model="valid"
  >
    <v-alert class="text-center" text v-if="successMessage" type="success">{{
      successMessage
    }}</v-alert>
    <v-alert class="text-center" text v-if="errorMessage" type="error">{{
      errorMessage
    }}</v-alert>

    <v-text-field
      v-model="name"
      :counter="255"
      :rules="stringRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :counter="255"
      :rules="emailRules"
      label="Email address"
      required
    ></v-text-field>

    <v-textarea
      v-model="message"
      name="input-7-1"
      label="Message"
      :rules="stringRules"
    ></v-textarea>
    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validateAndSubmit">
      Send message
    </v-btn>
  </v-form>

</template>

<script>
import Vue from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import db from '@/services/db'
Vue.use(VueReCaptcha, { siteKey: '6LcJeqgeAAAAAFZaRz_62smCD0QkkcdMVJkITfLk' })
export default {
  name: 'contact-us',
  data () {
    return {
      disableSubmit: false,
      successMessage: '',
      errorMessage: '',
      valid: false,
      name: '',
      email: '',
      message: '',
      stringRules: [
        (v) => !!v || 'Data is required',
        (v) =>
          (v && v.length >= 3) || 'String must be at least than 3 characters'
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    validateAndSubmit () {
      if (this.$refs.form.validate()) {
        this.disableSubmit = true
        this.$recaptcha('contactus').then((token) => {
          this.sendMessage()

          this.$router.push({ path: '/' })
        })
      }
    },
    sendMessage () {
      db.collection('contactMessages')
        .add({
          name: this.name,
          email: this.email,
          message: this.message
        })
        .then((docRef) => {
          this.successMessage = 'Message sent successfully'
        })
        .catch((error) => {
          this.errorMessage =
            'There was an error sending your message. Please try again later.'
          console.error('Error sending message: ', error)
        })
    }
  }
}

</script>
