<template>
  <v-form @submit.prevent="saveOrganisation" ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="name"
      :counter="255"
      :rules="stringRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="category"
      :counter="255"
      :rules="stringRules"
      label="Category"
      required
    ></v-text-field>

    <v-textarea
      v-model="description"
      name="input-7-1"
      label="Description"
      :rules="stringRules"
    ></v-textarea>

    <v-text-field
      v-model="url"
      :counter="255"
      :rules="stringRules"
      label="URL"
      required
    ></v-text-field>

    <v-checkbox
      v-model="payPal"
      label="Accepts PayPal"
      required
    ></v-checkbox>

    <v-checkbox
      v-model="creditCard"
      label="Accepts Credit Card"
      required
    ></v-checkbox>

    <v-checkbox
      v-model="bankTransfer"
      label="Accepts Bank Transfer"
      required
    ></v-checkbox>

    <v-checkbox
      v-model="crypto"
      label="Accepts Crypto"
      required
    ></v-checkbox>

    <v-btn :disabled="valid" color="success" class="mr-4" @click="saveOrganisation">
      Add Organisation
    </v-btn>
  </v-form>
</template>

<script>
import db from '@/services/db'
export default {
  name: 'new-organisation',
  data () {
    return {
      valid: false,
      name: '',
      category: '',
      description: '',
      url: '',
      payPal: false,
      creditCard: false,
      bankTransfer: false,
      crypto: false,
      stringRules: [
        v => !!v || 'Data is required',
        v => (v && v.length >= 3) || 'String must be at least than 3 characters'
      ]
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    saveOrganisation () {
      db.collection('organisations')
        .add({
          name: this.name,
          category: this.category,
          description: this.description,
          url: this.url,
          paymentMethods: {
            payPal: this.payPal,
            creditCard: this.creditCard,
            bankTransfer: this.bankTransfer,
            crypto: this.crypto
          }
        })
        .then((docRef) => {
          console.log('Organisation added: ', docRef.id)
          this.$router.push('/organisations/add')
        })
        .catch((error) => {
          console.error('Error adding organisation: ', error)
        })
    }
  }
}
</script>
