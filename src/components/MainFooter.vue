
<template>
  <v-footer
    padless
    dark
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="(link, id) in links"
        :key="id"
        color="white"
        text
        class="my-2"
        :href="link.url"
        target="_blank"
      >
        {{ link.name }}
      </v-btn>
      <v-col
        class="py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>donateforukraine.org</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
// import CookieConsentBar from '@/components/CookieConsentBar'
export default {
  components: {
  },
  data: () => ({
    links: [
      {
        name: 'Privacy Policy',
        url: 'legal/privacy-policy'
      },
      {
        name: 'Terms and Conditions',
        url: 'legal/terms-and-conditions'
      },
      {
        name: 'Cookie Policy',
        url: 'legal/cookie-policy'
      }
    ]

  })
}
</script>
