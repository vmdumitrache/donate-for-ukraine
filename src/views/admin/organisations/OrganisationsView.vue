<template>
  <v-container class="ma-0 pa-0">
    <v-row class="mb-5">
      <v-spacer></v-spacer>
      <v-btn v-if="isAdmin" text color="primary" to="/admin/organisations/add">+ Add Organisation</v-btn>
    </v-row>
      <template v-for="organisation in organisations">
        <v-card outlined class="my-4" :key="organisation.uid">
            <v-card-title>{{ organisation.name }}</v-card-title>
            <v-card-subtitle class="text-uppercase">{{ organisation.category }}</v-card-subtitle>
          <v-card-actions v-if="isAdmin">

              <v-btn
                text
                color="warning"
                :to="'/admin/organisations/edit/'+ organisation.uid"
              >
                Edit
              </v-btn>
              <v-btn
                text
                color="error"
                @click="deleteOrganisation(organisation)"
              >
                Delete
              </v-btn>
          </v-card-actions>
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
  name: 'OrganisationsView',
  components: {
    ConfirmationDialog
  },
  data: () => ({
    organisations: []
  }),
  mounted () {
    db.collection('organisations')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const organisationData = {
            ...doc.data(),
            uid: doc.id
          }

          this.organisations.push(organisationData)
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
    async deleteOrganisation (organisation) {
      if (
        await this.$refs.confirm.open(
          'Confirm',
          'Are you sure you want to delete this organisation?'
        )
      ) {
        db.collection('organisations')
          .doc(organisation.uid)
          .delete()
          .then(() => {
            this.organisations.splice(this.organisations.indexOf(organisation), 1)
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
