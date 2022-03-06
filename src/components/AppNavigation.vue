<template>
  <span>
    <v-app-bar app color="grey darken-4" elevate-on-scroll>
      <v-container class="py-0 fill-height">
        <v-app-bar-nav-icon
          @click="drawer = true"
          class="hidden-md-and-up"
        ></v-app-bar-nav-icon>
        <v-spacer class="hidden-md-and-up"></v-spacer>
        <v-toolbar-title
          class="text-uppercase"
          style="cursor: pointer"
          @click="$router.push('/')"
          >{{ appTitle }}</v-toolbar-title
        >
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
        <span class="hidden-sm-and-down" v-if="user.loggedIn">
          <v-menu bottom offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text dark v-bind="attrs" color="warning" v-on="on"
                >Admin</v-btn
              >
            </template>
            <v-list dense>
              <v-list-item to="/admin/users" v-if="user.data.admin" >
                <v-list-item-title> USERS </v-list-item-title>
              </v-list-item>
              <v-list-item to="/admin/organisations" v-if="user.data.admin" >
                <v-list-item-title> ORGANISATIONS </v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click.prevent="signOut" dark>
                <v-list-item-title class="text--primary">
                  SIGN OUT
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </span>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <!-- <v-list-item-title v-else class="text-h6" @click="drawer = false">
            {{ appTitle }}
          </v-list-item-title> -->
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list>
        <template v-for="(item, index) in items">
          <v-list-item :key="index" :to="item.url">
            <v-list-item-title class="text-uppercase">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </template>
        <v-divider></v-divider>
        <span v-if="user.loggedIn">
        <v-list-item>
          <v-list-item-subtitle class="text--accent-3">
            ADMIN
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item to="/admin/users" v-if="user.data.admin">
          <v-list-item-title> USERS </v-list-item-title>
        </v-list-item>
        <v-list-item to="/admin/organisations" v-if="user.data.admin">
          <v-list-item-title> ORGANISATIONS </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click.prevent="signOut" dark>
          <v-list-item-title class="text--primary">
            SIGN OUT
          </v-list-item-title>
        </v-list-item>
        </span>
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
        { title: 'External Resources', url: '/external-resources' },
        { title: 'Contact Us', url: '/contact-us' }
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
