<template>
  <v-container class="text-center py-0">
    <v-bottom-sheet v-model="showBar" overlay-opacity="0.3">
      <v-sheet class="text-center" height="auto" color="grey darken-3">
        <v-btn
          class="mt-6 mx-3"
          text
          outlined
          color="success"
          @click="acceptCookies"
        >
          Accept Additional Cookies
        </v-btn>
        <v-btn
          class="mt-6 mx-3"
          text
          outlined
          color="error"
          @click="rejectCookies"
        >
          Reject Additional Cookies
        </v-btn>
        <v-divider class="mt-5"></v-divider>
        <v-container class="py-3">
          We use some essential cookies to make this website work.
          <br />We’d like to set additional cookies to understand how you use
          this website.
          <span class="text-caption text-right">
            <br />You can read more about how we use cookies
            <a href="/legal/cookie-policy">here</a>.
          </span>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
export default {
  name: 'CookieConsentBar',
  data: () => ({
    showBar: true
  }),
  methods: {
    acceptCookies () {
      this.$cookie.set('acceptedCookies', true, 30)
      this.$router.go(this.$router.currentRoute)
      this.showBar = false
    },
    rejectCookies () {
      this.$cookie.set('acceptedCookies', false, 30)
      this.resetCookies()
      this.$router.go(this.$router.currentRoute)
      this.showBar = false
    },
    resetCookies () {
      this.$cookie.delete('_ga')
      this.$cookie.delete('_ga_XHHDMJLZSD')
    }
  },
  created () {
    if (this.$cookie.get('acceptedCookies')) {
      this.showBar = false
    }
  }
}
</script>
