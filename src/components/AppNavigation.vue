<template>
  <span>
    <v-app-bar app dense color="primary" dark>
      <v-app-bar-nav-icon
        @click="drawer = true"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <v-toolbar-title>{{ appTitle }}</v-toolbar-title>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <v-btn text class="hidden-sm-and-down" to="/">Where to donate</v-btn>
      <v-btn text class="hidden-sm-and-down" to="/about">About us</v-btn>
      <v-btn text class="hidden-sm-and-down">Contribute</v-btn>
      <v-btn text class="hidden-sm-and-down">Contact Us</v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list>
        <template v-for="(item, index) in items">
          <v-list-item :key="index" :to="item.url">
            <v-list-item-content>
              {{ item.title }}
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </span>
</template>

<script>
export default {
  name: 'AppNavigation',
  data () {
    return {
      appTitle: 'DONATE FOR UKRAINE',
      drawer: false,
      items: [
        { title: 'Where to donate', url: '/' },
        { title: 'About us', url: '/about' },
        { title: 'Contribute', url: '/contribute' },
        { title: 'Contact Us', url: '/contact' }
      ]
    }
  }
}
</script>

<style scoped>
</style>
