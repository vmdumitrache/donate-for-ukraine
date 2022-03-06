<template>
  <v-flex xs12 sm8 offset-sm-2 md6 offset-md3>
    <v-form @submit.prevent="submit" ref="form" v-model="valid">
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
    </v-form>

    <v-container class="text-center">
      <v-btn :disabled="!valid" color="primary" class="mr-4" @click="submit">
        Login
      </v-btn>
    </v-container>
    <v-container class="text-center">
      <v-btn color="success" class="mr-4" @click="signInWithGoogle">
        Login with Google
      </v-btn>
    </v-container>
    <v-container class="text-center">
      <p>Don't have an account?</p>
      <v-btn color="secondary" class="mr-4" to="/admin/register">
        Sign Up
      </v-btn>
    </v-container>
  </v-flex>
</template>

<script>
import firebase from '@/services/firebase'
import { mapMutations } from 'vuex'
export default {
  name: 'RegisterView',
  data () {
    return {
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
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    async submit () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          this.$router.push({ path: '/' })
          this.setSnack({ type: 'success', text: 'Successfully logged in' })
        })
        .catch((error) => {
          this.setSnack({ type: 'error', text: error.message })
        })
    },
    async signInWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          this.setSnack({ type: 'success', text: 'Successfully logged in' })
          this.$router.push({ path: '/' })
        })
        .catch((error) => {
          this.setSnack({ type: 'error', text: error.message })
        })
    },
    ...mapMutations({
      setSnack: 'SET_SNACK'
    })
  }
}
</script>
