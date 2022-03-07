<template>
  <div class="text-center">
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :color="this.type"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  created: function () {
    this.$store.watch(state => state.snack, () => {
      const { text, type } = this.$store.state.snack
      if (text !== '') {
        this.open(type, text)
      }
    })
  },
  data: () => ({
    snackbar: false,
    text: null,
    timeout: 5000,
    type: 'primary'
  }),
  methods: {
    open (type, text) {
      this.snackbar = true
      this.type = type
      this.text = text
    }
  }
}
</script>
