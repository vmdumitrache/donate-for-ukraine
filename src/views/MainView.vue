<template>
  <div>
    <v-progress-linear
    v-if="isLoading === true"
    color="grey darken-3"
    absolute
    top
    :indeterminate="true"
  ></v-progress-linear>
    <p class="text-justify">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <v-col
      cols="12"
      xs="12"
      md="8"
      offset-md="2"
      class="px-0"
      v-for="(organisation, index) in organisations"
      :key="index"
    >
      <donation-item :organisation="organisation" :key="index"></donation-item>
    </v-col>
  </div>
</template>

<script>
import DonationItem from '../components/DonationItem.vue'
import db from '../services/db'

export default {
  components: {
    DonationItem
  },
  data: () => ({
    isLoading: true,
    organisations: []
  }),
  created () {
    db.collection('organisations')
      .get()
      .then((querySnapshot) => {
        this.isLoading = false
        querySnapshot.forEach((doc) => {
          const organisationData = {
            name: doc.data().name,
            category: doc.data().category,
            description: doc.data().description,
            url: doc.data().url,
            paymentMethods: {
              payPal: doc.data().paymentMethods.payPal,
              creditCard: doc.data().paymentMethods.creditCard,
              bankTransfer: doc.data().paymentMethods.bankTransfer,
              crypto: doc.data().paymentMethods.crypto
            }
          }
          this.organisations.push(organisationData)
        })
      })
  }
}
</script>
