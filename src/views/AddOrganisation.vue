<template>
  <v-form
    @submit.prevent="saveOrganisation"
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-alert v-if="flash.message" class="text-center" text :type="flash.type">
      {{ flash.message }}
    </v-alert>
    <v-text-field
      v-model="organisation.name"
      :counter="255"
      :rules="stringRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="organisation.category"
      :counter="255"
      :rules="stringRules"
      label="Category"
      required
    ></v-text-field>

    <v-textarea
      v-model="organisation.description"
      name="input-7-1"
      label="Description"
      :rules="stringRules"
    ></v-textarea>

    <v-text-field
      v-model="organisation.url"
      :counter="255"
      :rules="stringRules"
      label="URL"
      required
    ></v-text-field>

    <v-checkbox v-model="organisation.paymentMethods.payPal" label="Accepts PayPal" required></v-checkbox>

    <v-checkbox
      v-model="organisation.paymentMethods.creditCard"
      label="Accepts Credit Card"
      required
    ></v-checkbox>

    <v-checkbox
      v-model="organisation.paymentMethods.bankTransfer"
      label="Accepts Bank Transfer"
      required
    ></v-checkbox>

    <v-checkbox v-model="organisation.paymentMethods.crypto" label="Accepts Crypto" required></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="submitOrganisation"
    >{{ this.isEditing ? 'Update' : 'Add' }} Organisation
    </v-btn>
    <v-btn
      :disabled="!valid"
      color="error"
      class="mr-4"
      @click="goBack"
    >Cancel
    </v-btn>
  </v-form>
</template>

<script>
import db from '@/services/db'
export default {
  name: 'new-organisation',
  data () {
    return {
      organisation: {
        name: '',
        category: '',
        description: '',
        url: '',
        paymentMethods: {
          payPal: false,
          creditCard: false,
          bankTransfer: false,
          crypto: false
        }
      },
      flash: {
        message: '',
        type: ''
      },
      isEditing: false,
      valid: false,
      stringRules: [
        (v) => !!v || 'Data is required',
        (v) =>
          (v && v.length >= 3) || 'String must be at least than 3 characters'
      ]
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    submitOrganisation () {
      if (this.isEditing) {
        this.updateOrganisation()
      } else {
        this.addOrganisation()
      }
    },
    saveOrganisation () {
      const newOrganisation = {
        name: this.organisation.name,
        category: this.organisation.category,
        description: this.organisation.description,
        url: this.organisation.url,
        paymentMethods: {
          payPal: this.organisation.payPal,
          creditCard: this.organisation.creditCard,
          bankTransfer: this.organisation.bankTransfer,
          crypto: this.organisation.crypto
        }
      }

      db.collection('organisations-dev')
        .add(newOrganisation)
        .then((docRef) => {
          console.log('Organisation added: ', docRef.id)
          this.flash = {
            message: 'Organisation added successfully!',
            type: 'success'
          }
          this.$refs.form.reset()
        })
        .catch((error) => {
          this.flash = {
            message: 'Organisation could not be added, please try again.',
            type: 'error'
          }
          console.error('Error adding organisation: ', error)
        })
    },

    getOrganisationById () {
      db.collection('organisations-dev')
        .doc(this.$route.params.id)
        .get()
        .then((snapshot) => {
          console.log(snapshot.data())
          if (snapshot.exists) {
            this.organisation = snapshot.data()
            this.isEditing = true
          }
        })
    },

    updateOrganisation () {
      const organisation = {
        name: this.organisation.name,
        category: this.organisation.category,
        description: this.organisation.description,
        url: this.organisation.url,
        paymentMethods: {
          payPal: this.organisation.payPal,
          creditCard: this.organisation.creditCard,
          bankTransfer: this.organisation.bankTransfer,
          crypto: this.organisation.crypto
        }
      }
      db.collection('organisations-dev')
        .doc(this.$route.params.id)
        .update(organisation)
        .then(() => {
          this.flash = {
            message: 'Organisation updated successfully!',
            type: 'success'
          }
        })
        .catch(() => {
          this.flash = {
            message: 'Organisation could not be updated, please try again.',
            type: 'error'
          }
        })
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  mounted () {
    if ('id' in this.$route.params) {
      this.getOrganisationById()
      this.editing = true
      console.log('id')
    } else {
      console.log('ups')
      // this
    }
  }
}
</script>
