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
      <br /><a class="text-decoration-none" href="/contact-us"
        >get in touch with us</a
      >.
    </p>
    <v-card fixed v-if="isLoading === false && organisations.length > 0">
      <v-toolbar dense flat shaped >
        <v-toolbar-title>FILTERS</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="resetFilters"> Reset Filters </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-select
          class="text-break"
          multiple
          v-model="selectedCategories"
          :items="categories"
          item-text="value"
          item-value="slug"
          label="Categories"
        ></v-select>
        <v-select
          multiple
          v-model="selectedPaymentMethods"
          :items="paymentMethods"
          item-text="value"
          item-value="slug"
          label="Payment Methods"
        ></v-select>
        <v-row class="ma-0 pa-0 text-caption text-uppercase grey--text text--darken-2">
          <v-spacer></v-spacer>
          Showing {{filteredOrganisations.length}}
         {{ filteredOrganisations.length === 1 ? 'organisation' : 'organisations' }}
         out of {{organisations.length}}
        </v-row>

      </v-card-text>
    </v-card>
    <v-skeleton-loader
      v-if="isLoading"
      type="card, actions"
    ></v-skeleton-loader>
    <v-col
      class="px-0"
      v-for="organisation in filteredOrganisations"
      :key="organisation.id"
    >
      <organisation-item
        :organisation="organisation"
        :key="organisation.id"
      ></organisation-item>
    </v-col>
  </div>
</template>

<script>
import OrganisationItem from '@/components/Organisation.vue'
import db from '@/services/db'

export default {
  components: {
    OrganisationItem
  },
  data: () => ({
    isLoading: true,
    organisations: [],
    selectedCategories: [],
    selectedPaymentMethods: [],
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
    paymentMethods: [
      { value: 'Pay Pal', slug: 'payPal' },
      { value: 'Credit Card', slug: 'creditCard' },
      { value: 'Bank Transfer', slug: 'bankTransfer' },
      { value: 'Crypto', slug: 'crypto' },
      { value: 'Physical Donations', slug: 'physical' }
    ]
  }),
  created () {
    db.collection('organisations')
      .orderBy('category', 'asc')
      .get()
      .then((querySnapshot) => {
        this.isLoading = false
        querySnapshot.forEach((doc) => {
          const organisationData = {
            id: doc.id,
            name: doc.data().name,
            category: doc.data().category,
            description: doc.data().description,
            readMoreURL: doc.data().readMoreURL,
            donationsURL: doc.data().donationsURL,
            financialStatements: doc.data().financialStatements,
            paymentMethods: {
              payPal: doc.data().paymentMethods.payPal,
              creditCard: doc.data().paymentMethods.creditCard,
              bankTransfer: doc.data().paymentMethods.bankTransfer,
              crypto: doc.data().paymentMethods.crypto,
              physical: doc.data().paymentMethods.physical
            }
          }
          this.organisations.push(organisationData)
        })
      })
  },
  computed: {
    filteredOrganisations () {
      let returnOrganisations = this.organisations
      if (this.selectedCategories.length > 0) {
        returnOrganisations = returnOrganisations.filter((organisation) => {
          return this.selectedCategories.includes(organisation.category.toLowerCase())
        })
      }

      if (this.selectedPaymentMethods.length > 0) {
        returnOrganisations = returnOrganisations.filter((organisation) => {
          return this.selectedPaymentMethods.some((paymentMethod) => {
            return organisation.paymentMethods[paymentMethod]
          })
        })
      }
      return returnOrganisations
    }
  },
  methods: {
    resetFilters () {
      this.selectedCategories = []
      this.selectedPaymentMethods = []
    }
  }
}
</script>
