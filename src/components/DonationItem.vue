<template>
  <v-col class="ma-0 pa-0">
    <v-card outlined class="mx-auto my-4">
      <v-card-title style="word-break: normal" class="text-uppercase">
        {{ donationItem.org }}
        <v-spacer></v-spacer>
      </v-card-title>

      <v-card-subtitle class="text-overline">
        {{ donationItem.category }}
      </v-card-subtitle>
      <!-- <v-divider></v-divider> -->
      <v-card-text class="text-justify text body-1">
        {{ donationItem.description }}
        <v-row>
          <v-col
            xs="12"
            class="
              mx-3
              px-0
              py-0
              my-0
              pt-15
              text-caption text-uppercase text-right
            "
          >
            Accepted payment methods
            <v-container class="ml-0 px-0 pt-0 text-h6">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <font-awesome-icon
                    v-if="donationItem.paymentMethods.payPal"
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
                    v-if="donationItem.paymentMethods.creditCard"
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
                    v-if="donationItem.paymentMethods.bankTransfer"
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
                    v-if="donationItem.paymentMethods.crypto"
                    class="ml-1"
                    icon="fa-brands fa-bitcoin"
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <span>Crypto</span>
              </v-tooltip>

            </v-container>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-row>
          <v-col>
            <v-btn
              color="primary"
              outlined
              :href="donationItem.url"
              target="_blank"
              text
              >Donate</v-btn
            >
          </v-col>
          <v-col class="text-right font-italic">
            <v-btn color="error" :href="donationItem.url" target="_blank" text
              >Report</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: ['donationItem'],
  name: 'DonationItem',
  data () {
    return {
      //
    }
  }
}
</script>
