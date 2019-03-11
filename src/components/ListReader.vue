<template>
  <div
    class="list-reader"
  >
    <q-tab-panels
      id="mae_panels"
      v-model="panel"
      animated
      class="full-width full-height"
      @before-transition="emitPanelChange"
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
          <q-item clickable v-for="cap in chapters"
            :key="cap.cap"
            tag="a"
            class="manga__cap"
            target="_blank"
            :href="cap.url"
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
              @click="deleteChapter(cap)"
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
    'historyBy'
  ],
  data () {
    return {
      panel: 'readers',
      items: [],
      mangas: [],
      sort_chapters: false,
      current_reader: null,
      current_manga: null,
      current_chapters: []
    }
  },
  methods: {
    deleteChapter (chapter) {
      const reader_index = this.items.indexOf(this.current_reader)
      const manga_index = this.items[reader_index].mangas.indexOf(this.current_manga)
      const chapter_index = this.items[reader_index].mangas[manga_index].history.indexOf(chapter)
      const to_del = {
        reader: reader_index,
        manga: manga_index,
        chapter: chapter_index
      }
      this.$store.dispatch('reader/delete_chapter',
        to_del
      ).then(resp => {
        // then we update the current chapters list
        this.$store.dispatch('reader/get_last_readers').then(resp => {
          this.items = resp
          this.mangas = this.items[reader_index].mangas
          this.current_manga = this.items[reader_index].mangas[manga_index]
          this.chapters = this.current_manga.history
        })
      })
    },
    emitPanelChange (title) {
      this.$emit('panelChange', {title: this.currentTitle()})
    },
    sortChapterLabel () {
      return this.sort_chapters ? 'Decrescent' : 'First time read'
    },
    preparePanelMangas(reader) {
      this.mangas = reader.mangas
      this.panel = 'mangas'
      this.current_reader = reader
    },
    preparePanelChapters (manga) {
      this.current_chapters = manga.history
      this.panel = 'chapters'
      this.current_manga = manga
    },
    currentTitle () {
      let title = ''
      if (this.panel === 'mangas') {
        title = this.current_reader.reader
      }
      if (this.panel === 'chapters') {
        title = this.current_manga.name
      }
      return title
    },
    getLastReaders () {
      this.$store.dispatch('reader/get_last_readers').then(resp => {
        this.items = resp
      })
    }
  },
  mounted () {
    this.getLastReaders()
  },
  computed: {
    chapters: {
      get () {
        if (this.sort_chapters) {
          return this.current_chapters.sort((a, b) => {
            if (a.cap > b.cap) {
              return -1
          }
          if (a.cap < b.cap) {
            return 1
          }
          return 0
        })
      }
      return this.current_chapters.reverse()
    },
    set (value) {
      this.current_chapters = value
    }
  },
    readers () {
      return this.items
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
