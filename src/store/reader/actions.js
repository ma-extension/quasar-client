const dev_history_example = JSON.parse('[{"hostname":"cdmnet.com.br","icon":"http://cdmnet.com.br/favicon.ico","mangas":[{"history":[{"cap":"070","page":"1","url":"http://cdmnet.com.br/titulos/rain/manga/ler-online/071#1"}, {"cap":"071","page":"1","url":"http://cdmnet.com.br/titulos/rain/manga/ler-online/070#1"}],"name":"rain"}],"reader":"central-de-mangas"},{"hostname":"onepiece-ex.com.br","icon":"https://onepiece-ex.com.br/favicon/favicon-32x32.png","mangas":[{"history":[{"cap":"931","page":"1","url":"https://onepiece-ex.com.br/mangas/leitor/931/#1"}],"name":"One Piece"}],"reader":"onepiece-ex"}]')

export function url_domain (fullPath) {
  let a_element = document.createElement('a')
  a_element.href = fullPath

  return a_element.hostname
}

export function current_url () {
  return new Promise((resolve, reject) => {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
          resolve(tabs[0].url)
      })
  })
}

export function hostname ({commit, dispatch}) {
  return new Promise((resolve, reject) => {
      current_url().then((resp) => {
          resolve(url_domain(resp))
      })
  })
}

export function get_last_readers ({commit, dispatch}) {
  // the original function, uncomment it when build
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['historyReaders'], function(items) {
      let result = items.historyReaders
      if (!result) {
        result = []
      }
      resolve(result)
    })
  })
}

export function delete_chapter({commit, dispatch}, to_del) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['historyReaders'], function(items) {
      items.historyReaders[to_del.reader]
      .mangas[to_del.manga]
      .history.splice(to_del.chapter, 1)

      chrome.storage.sync.set({ historyReaders: items.historyReaders }, function () {
        resolve('Histórico salvo/atualizado com sucesso!')
      })
    })
  })
}

// export function get_last_readers ({commit, dispatch}) {
//   return new Promise((resolve, reject) => {
//       resolve(dev_history_example)
//     })
// }