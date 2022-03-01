<template>
  <v-footer padless dark>
    <v-card flat tile width="100%" class="text-center">
      <!-- <v-card-text>
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          text
          rounded
          class="my-2"
        >
          {{ link }}
        </v-btn>
      </v-card-text> -->

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>donateforukraine.org</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      'Contribute',
      'Contact Us'
    ]
  })
}
</script>
