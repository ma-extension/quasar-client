<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-red-10">
      <q-toolbar>

        <q-toolbar-title>
          Manga Agenda Extension
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-black">
      <q-toolbar>
        <q-toolbar-title></q-toolbar-title>
        <q-btn
          icon="favorite"
          flat
          rounded
          no-caps
          label="Github"
        />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
