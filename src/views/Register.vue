<template>
  <v-form
    @submit.prevent="submit"
    ref="form"
    v-model="valid"

  >
    <v-text-field
      v-model="name"
      :rules="stringRules"
      label="Name"
      required
    ></v-text-field>

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

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="submit"
    >
      Register
    </v-btn>
  </v-form>
</template>

<script>
import firebase from '@/services/firebase'

export default {
  name: 'RegisterView',
  data () {
    return {
      valid: false,
      name: '',
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      stringRules: [
        v => !!v || 'Data is required',
        v => (v && v.length >= 3) || 'String must be at least than 3 characters'
      ],
      passwordRules: [
        v => !!v || 'Data is required',
        v => (v && v.length >= 8) || 'String must be at least than 8 characters'
      ]
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    submit () {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user
            .updateProfile({
              displayName: this.name
            })
            .then(() => {})
        })
        .catch((err) => {
          this.error = err.message
        })
    }
  }
}
</script>
