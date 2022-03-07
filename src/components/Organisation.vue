<template>
  <v-col class="ma-0 pa-0">
    <v-card outlined class="mx-auto my-4">
      <v-card-title style="word-break: normal" class="text-uppercase text-h5">
        <a
          class="text-decoration-none"
          :href="organisation.readMoreURL"
          target="_blank"
        >
          {{ organisation.name }}
          <font-awesome-icon
            icon="fa-solid fa-up-right-from-square"
            size="xs"
          />
        </a>
      </v-card-title>

      <v-card-subtitle class="text-subtitle text-uppercase">
        {{ organisation.category }}
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-card-text class="text">
        <h2 class="mb-2">DESCRIPTION</h2>
        <span v-html="organisation.description"></span>
        <h2 class="mt-7">FINANCIAL STATEMENTS PUBLIC</h2>
        <span>{{
          organisation.financialStatements ? "Yes" : "No / Not Known"
        }}</span>
        <h2 class="mt-7 mb-2">ACCEPTED PAYMENT METHODS</h2>

        <span v-for="(isActive, paymentMethod) in organisation.paymentMethods"
          :key="paymentMethod">
          <v-list-item
            v-if="isActive"
            class="mx-0 px-0 grey--text text--lighten-1"
        >
          <v-list-item-icon class="mx-0 px-0">
            <font-awesome-icon
              class="px-0"
              :icon="paymentMethodDetails[paymentMethod].icon"
            />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{
              paymentMethodDetails[paymentMethod].name
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </span>

      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-row class="my-0">
          <v-btn
            color="error"
            :href="organisation.donationsURL"
            target="_blank"
            text
            >Donations Page</v-btn
          >
          <v-btn
            color="primary"
            :href="organisation.readMoreURL"
            target="_blank"
            text
            >Read More</v-btn
          >
          <v-col class="text-right font-italic"> </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['organisation'],
  name: 'DonationItem',
  data () {
    return {
      paymentMethodDetails: {
        payPal: {
          name: 'PayPal',
          icon: 'fa-brands fa-cc-paypal'
        },
        creditCard: {
          name: 'Credit Card',
          icon: 'fa-solid fa-credit-card'
        },
        bankTransfer: {
          name: 'Bank Transfer',
          icon: 'fa-solid fa-building-columns'
        },
        crypto: {
          name: 'Crypto',
          icon: 'fa-brands fa-bitcoin'
        },
        physical: {
          name: 'Physical Donations',
          icon: 'fa-solid fa-hand-holding-medical'
        }
      }
      //
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'getUser',
      isLoggedIn: 'isLoggedIn'
    })
  }
}
</script>
