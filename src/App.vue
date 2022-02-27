<template>
  <v-app id="inspire">
    <app-navigation></app-navigation>
    <v-main class="grey darken-4">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet class="mb-5 px-5 py-2">
              <h1 class="text-center text-uppercase" >{{ $route.name }}</h1>
            </v-sheet>
            <v-sheet min-height="70vh">
              <v-container fluid class="pa-5">
                <router-view />
              </v-container>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <main-footer></main-footer>
  </v-app>
</template>

<script>
import AppNavigation from './components/ConstrainedAppNavigation'
import MainFooter from './components/MainFooter.vue'
// import AppNavigation from './components/AppNavigation.vue'

export default {
  name: 'App',
  components: {
    AppNavigation,
    MainFooter
  },

  data: () => ({
    //
  })
}
</script>
