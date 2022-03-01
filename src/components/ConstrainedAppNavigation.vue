<template>
  <span>
    <v-app-bar app color="grey darken-4" elevate-on-scroll>
      <v-container class="py-0 fill-height">
        <v-app-bar-nav-icon
          @click="drawer = true"
          class="hidden-md-and-up"
        ></v-app-bar-nav-icon>
        <v-spacer class="hidden-md-and-up"></v-spacer>
        <v-toolbar-title class="text-uppercase" style="cursor: pointer" @click="$router.push('/')" >{{ appTitle }}</v-toolbar-title>
        <v-spacer class="hidden-sm-and-down"></v-spacer>
        <v-btn
          text
          class="hidden-sm-and-down"
          v-for="(item, index) in items"
          :key="index"
          :to="item.url"
        >
          {{ item.title }}
        </v-btn>
        <v-btn
          text
          class="hidden-sm-and-down"
          v-if="user.loggedIn"
          @click.prevent="signOut"
        >
          Sign Out
        </v-btn>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6" @click="drawer = false">
            {{ appTitle }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list>
        <template v-for="(item, index) in items">
          <v-list-item :key="index" :to="item.url">
            <v-list-item-content class="text-uppercase">
              {{ item.title }}
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-list-item>
          <v-list-item-content
              class="text-uppercase"
              v-if="user.loggedIn"
              @click.prevent="signOut"
              >Sign Out</v-list-item-content
            >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from '@/services/firebase'

export default {
  name: 'AppNavigation',
  data () {
    return {
      appTitle: 'DONATE FOR UKRAINE',
      drawer: false,
      items: [
        { title: 'Where to donate', url: '/' },
        { title: 'Our Mission', url: '/our-mission' },
        { title: 'Resources', url: '/resources' },
        { title: 'Contact Us', url: '/contact' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  methods: {
    signOut () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            path: '/'
          })
        })
    }
  }
}
</script>

<style scoped>
</style>
