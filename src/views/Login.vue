<template>

  <v-form @submit.prevent="submit" ref="form" v-model="valid">
    <v-alert class="text-center" text v-if="error" type="error">{{error}}</v-alert>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Email"
      required
    ></v-text-field>

    <v-text-field
      type="password"
      v-model="password"
      :rules="passwordRules"
      label="Password"
      required
    ></v-text-field>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="submit">
      Login
    </v-btn>
  </v-form>
</template>

<script>
import firebase from '@/services/firebase'

export default {
  name: 'RegisterView',
  data () {
    return {
      error: '',
      valid: false,
      email: '',
      password: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        (v) => !!v || 'Data is required',
        (v) =>
          (v && v.length >= 8) || 'String must be at least than 8 characters'
      ]
    }
  },
  created () {
    firebase.auth().onAuthStateChanged(userAuth => {
      if (userAuth) {
        firebase
          .auth()
          .currentUser.getIdTokenResult(true)
          .then(tokenResult => {
            console.log(tokenResult)
          })
      }
    })
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    submit () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          console.log(data)
          this.$router.replace({ path: '/organisations/add' })
        })
        .catch((err) => {
          this.error = err.message
        })
    }
  }
}
</script>
