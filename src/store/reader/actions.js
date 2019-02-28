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

export function get_last_readers () {
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