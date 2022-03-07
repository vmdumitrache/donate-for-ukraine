<template>
  <v-form
    @submit.prevent="submitOrganisation"
    ref="form"
    v-model="valid"

  >
    <v-text-field
      v-model="organisation.name"
      :counter="255"
      :rules="stringRules"
      label="Name"
      required
    ></v-text-field>

    <v-select
      :items="categories"
      v-model="organisation.category"
      label="Category"
      required
      item-text="value"
      item-value="slug"
    >

    </v-select>

    <v-textarea
      v-model="organisation.description"
      name="input-7-1"
      label="Description"
      :rules="stringRules"
    ></v-textarea>

    <v-text-field
      v-model="organisation.readMoreURL"
      :counter="255"
      :rules="stringRules"
      label="Read More URL"
    ></v-text-field>

    <v-text-field
      v-model="organisation.donationsURL"
      :counter="255"
      :rules="stringRules"
      label="Donations URL"
    ></v-text-field>

    <v-checkbox
      v-model="organisation.financialStatements"
      label="Financial Statements Available"
      required
    ></v-checkbox>

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
      color="error"
      class="mr-4"
      @click="goBack"
    >Cancel
    </v-btn>
  </v-form>
</template>

<script>
import db from '@/services/db'
import { mapMutations } from 'vuex'
export default {
  name: 'new-organisation',
  data () {
    return {
      categories: [
        { value: 'General Support', slug: 'general support' },
        { value: 'Medical', slug: 'medical' },
        { value: 'Military', slug: 'military' },
        { value: 'Children', slug: 'children' },
        { value: 'Independent Media', slug: 'independent media' },
        { value: 'LGBTQIA', slug: 'lgbtqia' },
        { value: 'Religious and Ethnic Minority Aid', slug: 'religious and ethnic minority aid' },
        { value: 'Veterans and Internally Displaced People', slug: 'veterans and internally displaced people' }
      ],
      organisation: {
        name: null,
        category: null,
        description: null,
        readMoreURL: null,
        donationsURL: null,
        financialStatements: false,
        paymentMethods: {
          payPal: false,
          creditCard: false,
          bankTransfer: false,
          crypto: false
        }
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
    addOrganisation () {
      const newOrganisation = {
        name: this.organisation.name,
        category: this.organisation.category,
        description: this.organisation.description,
        readMoreURL: this.organisation.readMoreURL,
        donationsURL: this.organisation.donationsURL,
        financialStatements: this.organisation.financialStatements,
        paymentMethods: {
          payPal: this.organisation.paymentMethods.payPal,
          creditCard: this.organisation.paymentMethods.creditCard,
          bankTransfer: this.organisation.paymentMethods.bankTransfer,
          crypto: this.organisation.paymentMethods.crypto
        }
      }

      db.collection('organisations')
        .add(newOrganisation)
        .then((docRef) => {
          this.setSnack({ type: 'success', text: 'Organisation added successfully!' })
          this.$refs.form.reset()
          this.goBack()
        })
        .catch(() => {
          this.setSnack({ type: 'error', text: 'Organisation could not be updated, please try again.' })
        })
    },

    getOrganisationById () {
      db.collection('organisations')
        .doc(this.$route.params.id)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            this.organisation = snapshot.data()
            this.isEditing = true
          }
        })
    },

    updateOrganisation () {
      const organisation = {
        name: this.organisation.name || null,
        category: this.organisation.category || null,
        description: this.organisation.description || null,
        readMoreURL: this.organisation.readMoreURL || null,
        donationsURL: this.organisation.donationsURL || null,
        financialStatements: this.organisation.financialStatements || false,
        paymentMethods: {
          payPal: this.organisation.paymentMethods.payPal || false,
          creditCard: this.organisation.paymentMethods.creditCard || false,
          bankTransfer: this.organisation.paymentMethods.bankTransfer || false,
          crypto: this.organisation.paymentMethods.crypto || false
        }
      }
      db.collection('organisations')
        .doc(this.$route.params.id)
        .update(organisation)
        .then(() => {
          this.setSnack({ type: 'success', text: 'Organisation updated successfully!' })
          this.goBack()
        })
        .catch(() => {
          this.setSnack({ type: 'error', text: 'Organisation could not be updated, please try again.' })
        })
    },
    goBack () {
      this.$router.go(-1)
    },
    ...mapMutations({
      setSnack: 'SET_SNACK'
    })
  },
  mounted () {
    if ('id' in this.$route.params) {
      this.getOrganisationById()
      this.editing = true
    }
  }
}
</script>
