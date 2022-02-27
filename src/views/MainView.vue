<template>
  <div>
    <p class="text-justify">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <v-col cols="12" xs="12" md="8" offset-md="2" class="px-0" v-for="(donationItem, index) in donationItems" :key="index">
      <donation-item :donationItem="donationItem" :key="index"></donation-item>
    </v-col>
  </div>
</template>

<script>
import DonationItem from '../components/DonationItem.vue'
export default {
  components: {
    DonationItem
  },
  data: () => ({
    donationItems: [
      {
        category: 'Medical',
        org: 'Voices of Children',
        description: 'Voices of Children is a charitable foundation that focuses on addressing the psychological effect of armed conflict on children. Founded in 2015 in response to the conflict in eastern Ukraine, Voices of Children provides art therapy, mobile psychologists, and individualized support to traumatized children. Individuals can donate through bank transfer, credit/debit card, or Apple Pay via its website. ',
        url: 'https://example.com',
        paymentMethods: {
          payPal: false,
          creditCard: false,
          bankTransfer: false,
          crypto: false
        }
      },
      {
        category: 'Refugees',
        org: 'The International rescue committee',
        description: 'description for item 2',
        url: 'https://example.com',
        paymentMethods: {
          payPal: true,
          creditCard: true,
          bankTransfer: true,
          crypto: true
        }
      },
      {
        category: 'Medical',
        org: 'Sunflower of Peace',
        description: 'description for item 3',
        url: 'https://example.com',
        paymentMethods: {
          payPal: true,
          creditCard: true,
          bankTransfer: true,
          crypto: true
        }
      },
      {
        category: 'Medical2',
        org: '2Voices of Children',
        description: 'Voices of Children is a charitable foundation that focuses on addressing the psychological effect of armed conflict on children. Founded in 2015 in response to the conflict in eastern Ukraine, Voices of Children provides art therapy, mobile psychologists, and individualized support to traumatized children. Individuals can donate through bank transfer, credit/debit card, or Apple Pay via its website. ',
        url: 'https://example.com',
        paymentMethods: {
          payPal: true,
          creditCard: false,
          bankTransfer: true,
          crypto: true
        }
      },
      {
        category: 'Refugees2',
        org: '2The International rescue committee',
        description: 'description for item 2',
        url: 'https://example.com',
        paymentMethods: {
          payPal: false,
          creditCard: false,
          bankTransfer: true,
          crypto: false
        }
      },
      {
        category: 'Medical2',
        org: '2Sunflower of Peace',
        description: 'description for item 3',
        url: 'https://example.com',
        paymentMethods: {
          payPal: true,
          creditCard: false
        }
      }

    ]
  })
}
</script>
