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
      As the conflict in Ukraine unfolds, more and more people are becoming
      displaced and are having their lives turned upside down. People fighting
      in Ukraine, refugees, and the Ukrainian Armed Forces are in need of
      support, be it in the form of food and hygiene products, medical supplies,
      or military equipment.
    </p>
    <p class="text-justify">
      You can help by making donations, however small, to the charities and
      organisations that are working towards providing such aide and relief.
    </p>
    <p class="text-justify">
      We have provided a non-exhaustive list of legitimate organisations and
      charities where your help is greatly needed.
    </p>
    <p class="text-justify">
      We are actively working on adding more organisations to our list, as well
      as more resources. If you would like to contribute,
      <br/><a class="text-decoration-none" href="/contact-us">get in touch with us</a>.
    </p>
    <v-col

      class="px-0"
      v-for="(organisation, index) in organisations"
      :key="index"
    >
      <donation-item :organisation="organisation" :key="index"></donation-item>
    </v-col>
  </div>
</template>

<script>
import DonationItem from '@/components/DonationItem.vue'
import db from '@/services/db'

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
      .orderBy('category', 'asc')
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
