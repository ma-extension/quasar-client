<template>
  <q-list bordered class="rounded-borders">
      <q-expansion-item v-for="(reader, index) in items" :key="index">
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar>
            <img :src="reader.icon">
          </q-avatar>
        </q-item-section>
        <q-item-section>{{ reader.reader }}</q-item-section>
      </template>
        <q-card>
          <q-list>
            <q-expansion-item v-for="(manga, m_index) in reader.mangas"
              :key="m_index"
              :label="manga.name"
            >
              <q-list>
                <q-item v-for="(cap, c_index) in manga.history"
                  :key="c_index"
                >
                  Cap: {{ cap.cap }}
                </q-item>
              </q-list>
            </q-expansion-item>
          </q-list>
        </q-card>
      </q-expansion-item>
    </q-list>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: [
    'historyBy'
  ],
  data () {
    return {
      items: [],
      current_hostname: null
    }
  },
  mounted () {
    this.$store.dispatch('reader/get_last_readers').then(resp => {
      this.items = resp
    })
  },
  computed: {
    readers () {
      return this.items
    }
  }
}
</script>

<style>
</style>
