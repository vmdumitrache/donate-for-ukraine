<template>
  <v-container>
    <div class="about">
      <p class="text-justify">
        Our aim is to raise awareness of the ongoing crisis in Ukraine. We want
        to do so by facilitating the process of making informed choices when
        deciding to help by not only providing relevant information, but by also
        giving necessary resources for people to do their own research. We want
        to create a place where people can easily find the information they need
        in order to give their support. This support can be in the form of
        monetary donations going directly to the organisations and institutions
        that are doing their best to help, or by simply growing public awareness
        of the situation unfolding.
      </p>
      <p>
        If you would like to get in touch with us, please fill out the form
        below. We will try to get back to you as soon as possible.
      </p>
    </div>
    <v-form @submit.prevent="validateAndSubmit" ref="form" v-model="valid">
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
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validateAndSubmit"
      >
        Send message
      </v-btn>
    </v-form>
  </v-container>
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
