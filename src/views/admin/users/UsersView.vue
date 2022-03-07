<template>
  <v-container class="ma-0 pa-0">
      <template v-for="user in users">
        <v-card outlined class="my-4" :key="user.uid">
            <v-card-title>{{ user.email }}</v-card-title>
            <v-card-subtitle>{{
              user.customClaims.admin ? "ADMIN" : "USER"
            }}</v-card-subtitle>
          <v-card-actions v-if="isAdmin">
              <v-btn
                :disabled="user.uid === getUser.uid"
                text
                color="primary"
                @click="toggleAdmin(user)"
              >
                {{ user.customClaims.admin ? "Revoke" : "Make" }} admin
              </v-btn>
              <v-btn
                :disabled="user.uid === getUser.uid"
                text
                :color="user.active ? 'error' : 'primary'"
                @click="toggleUserActive(user)"
              >
                {{ user.active ? "Disable" : "Enable" }}
              </v-btn>
              <v-btn
                :disabled="user.uid === getUser.uid"
                text
                color="error"
                @click="deleteUser(user)"
              >
                Delete
              </v-btn>
          </v-card-actions>
          <v-divider></v-divider>
        </v-card>
      </template>
    <ConfirmationDialog ref="confirm" />
  </v-container>
</template>

<script>
import db from '@/services/db'
import { mapGetters, mapMutations } from 'vuex'
import ConfirmationDialog from '@/components/ConfirmationDialog'
export default {
  name: 'UsersView',
  components: {
    ConfirmationDialog
  },
  data: () => ({
    users: []
  }),
  mounted () {
    db.collection('users')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const userData = {
            ...doc.data(),
            uid: doc.id
          }

          this.users.push(userData)
        })
      })
  },
  computed: {
    ...mapGetters({
      getUser: 'getUser',
      isLoggedIn: 'isLoggedIn',
      isAdmin: 'isAdmin'
    })
  },
  methods: {
    async toggleUserActive (user) {
      if (
        await this.$refs.confirm.open(
          'Please Confirm',
          'Are you sure you want to ' +
            (user.active ? 'disable' : 'enable') +
            ' this user?'
        )
      ) {
        db.collection('users')
          .doc(user.uid)
          .update({
            active: !user.active
          })
          .then(() => {
            this.users[this.users.indexOf(user)].active = !user.active
            this.setSnack({
              type: 'success',
              text: 'Successfully ' + (user.active ? 'disabled' : 'enabled') + ' user'
            })
          })
          .catch((error) => {
            this.setSnack({ type: 'error', text: error.message })
          })
      }
    },
    async toggleAdmin (user) {
      if (
        await this.$refs.confirm.open(
          'Confirm',
          'Are you sure you want to ' +
            (user.customClaims.admin ? 'revoke' : 'make') +
            ' this user an admin?'
        )
      ) {
        db.collection('users')
          .doc(user.uid)
          .update({
            customClaims: {
              admin: !user.customClaims.admin
            }
          })
          .then(() => {
            this.users[this.users.indexOf(user)].customClaims.admin =
              !user.customClaims.admin
            this.setSnack({
              type: 'success',
              text: 'Successfully ' +
                (user.customClaims.admin ? 'revoked' : 'granted') +
                ' admin rights'
            })
          })
          .catch((error) => {
            this.setSnack({ type: 'error', text: error.message })
          })
      }
    },
    async deleteUser (user) {
      if (
        await this.$refs.confirm.open(
          'Confirm',
          'Are you sure you want to delete this user?'
        )
      ) {
        db.collection('users')
          .doc(user.uid)
          .delete()
          .then(() => {
            this.users.splice(this.users.indexOf(user), 1)
            this.setSnack({ type: 'success', text: 'Successfully deleted user' })
          })
          .catch((error) => {
            this.setSnack({ type: 'error', text: error.message })
          })
      }
    },
    ...mapMutations({
      setSnack: 'SET_SNACK'
    })
  }
}
</script>
