<template>
  <v-col class="ma-0 pa-0">
    <v-card outlined class="mx-auto my-4">
      <v-card-title style="word-break: normal" class="text-uppercase text-h5">
        <a class="text-decoration-none" :href="organisation.readMoreURL" target="_blank">
          {{ organisation.name }}
          <font-awesome-icon icon="fa-solid fa-up-right-from-square" size="xs"/>
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

        <v-row>
          <v-col>
            <v-container class="ml-0 px-0 pt-0 text-h5 text-truncate">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <font-awesome-icon
                    v-if="organisation.paymentMethods.payPal"
                    class="mr-1"
                    icon="fa-brands fa-cc-paypal"
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <span>PayPal</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <font-awesome-icon
                    v-if="organisation.paymentMethods.creditCard"
                    class="mx-1"
                    icon="fa-solid fa-credit-card"
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <span>Card</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <font-awesome-icon
                    v-if="organisation.paymentMethods.bankTransfer"
                    class="mx-1"
                    icon="fa-solid fa-building-columns"
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <span>Bank Transfer</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <font-awesome-icon
                    v-if="organisation.paymentMethods.crypto"
                    class="ml-1"
                    icon="fa-brands fa-bitcoin"
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <span>Crypto</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <font-awesome-icon
                    v-if="organisation.paymentMethods.physical"
                    class="ml-1"
                    icon="fa-solid fa-hand-holding-medical"
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <span>Physical Donations</span>
              </v-tooltip>
            </v-container>
          </v-col>
        </v-row>
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
