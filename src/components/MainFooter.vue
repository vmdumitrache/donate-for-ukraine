<template>
  <v-footer padless dark>
    <v-card flat width="100%" class="text-center">
      <!-- <v-divider></v-divider> -->
      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>donateforukraine.org</strong>
      </v-card-text>
    </v-card>
    <!-- <cookie-consent-bar></cookie-consent-bar> -->
  </v-footer>
</template>

<script>
// import CookieConsentBar from '@/components/CookieConsentBar'
export default {
  components: {
  },
  data: () => ({
    links: ['Contribute', 'Contact Us']

  }),

  methods: {
  }
}
</script>
