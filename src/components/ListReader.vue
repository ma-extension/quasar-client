<template>
  <div
    class="list-reader"
  >
    <q-tab-panels
      v-model="panel"
      animated
      class="full-width full-height"
    >
      <q-tab-panel
        name="readers"
        style="padding: 0px;"
      >
        <q-list>
          <q-item clickable v-for="(reader, index) in items" :key="index" @click="preparePanelMangas(reader)">
        
            <q-item-section avatar>
              <q-avatar>
                <img :src="reader.icon">
              </q-avatar>
            </q-item-section>
            <q-item-section>{{ reader.reader }}</q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
      <q-tab-panel
        name="mangas"
        style="padding: 0px;"
      >
        <div class="bg-grey-1">
          <div class="q-gutter-sm">
            <q-radio v-model="sort_chapters" :val="false" label="First time read" />
            <q-radio v-model="sort_chapters" :val="true" label="Decrescent" />
          </div>
          <div class="q-px-sm">
            Order chapters by: <strong>{{ sortChapterLabel() }}</strong>
          </div>
        </div>

        <q-list>
          <q-item clickable
            v-for="(manga, m_index) in mangas"
            :key="m_index"
            @click="preparePanelChapters(manga)"
          >
            <q-item-section avatar>
              <q-icon 
                name="bookmarks"
              />
            </q-item-section>
            <q-item-section>{{ manga.name }}</q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
      <q-tab-panel
        name="chapters"
        style="padding: 0px;"
      >
        <q-list>
          <q-item clickable v-for="(cap, c_index) in chapters"
            :key="c_index"
            class="manga__cap"
          >
          <q-item-section left>
            Cap: {{ cap.cap }}
          </q-item-section>
          <q-item-section main></q-item-section>
          <q-item-section right
            class="flex"
            style="align-items: center"
          >
            <q-btn
              round
              flat
            >
              <q-avatar size="24px">
                <img style="filter: invert(.8)" src="../assets/baseline-delete-24px.svg">
              </q-avatar>
            </q-btn>
          </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: [
    'historyBy',
    'tabview'
  ],
  data () {
    return {
      items: [],
      mangas: [],
      current_hostname: null,
      sort_chapters: false,
      current_chapters: []
    }
  },
  methods: {
    sortChapterLabel () {
      return this.sort_chapters ? 'Decrescent' : 'First time read'
    },
    preparePanelMangas(reader) {
      this.mangas = reader.mangas
      this.panelName = 'mangas'
      this.$emit('clickReader', {title: reader.reader, parentPanel: 'readers', panel: 'mangas'})
    },
    preparePanelChapters (manga) {
      this.current_chapters = manga.history
      this.panelName = 'chapters'
      this.$emit('clickReader', {title: manga.name, parentPanel: 'mangas', panel: 'chapters'})
    }

  },
  mounted () {
    this.$store.dispatch('reader/get_last_readers').then(resp => {
      this.items = resp
    })
  },
  computed: {
    chapters () {
      if (this.sort_chapters) {
        return [...this.current_chapters].sort((a, b) => {
          if (a.cap > b.cap) {
            return -1
          }
          if (a.cap < b.cap) {
            return 1
          }
          return 0
        })
      }
      return [...this.current_chapters]
    },
    readers () {
      return this.items
    },
    panel () {
      return this.tabview
    }
  }
}
</script>

<style>
.manga {
  /* font-size: 16px; */
  font-weight: bold;
  text-transform: uppercase;
}
.manga__cap {
  text-transform: capitalize;
  font-size: 12px;
  font-weight: normal;
  /* color: white; */
  /* filter: invert(100); */
  transition: .5s ease;
}
.manga__cap:hover {
  /* filter: invert(0); */
  /* background: #3db9cc; */
  /* background: wheat; */
}
</style>
