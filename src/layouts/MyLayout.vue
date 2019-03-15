<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-black">
      <q-toolbar>
        <q-btn
        push
        color="cyan"
        no-caps
        type="a"
        target="_blank"
        href="#/profile"
      >
        <q-icon
          name="book"
        />
        Profile
      </q-btn>
        <q-toolbar-title></q-toolbar-title>
        <q-btn
          icon="favorite"
          flat
          rounded
          no-caps
          push
          label="Github"
          type="a"
          href="https://github.com/ma-extension/quasar-client"
          target="_blank"
          rel="noopener noreferrer"
        >
        </q-btn>
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
