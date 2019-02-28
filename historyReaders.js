/*
    HistoryReaders.js library.
    See the following rules to register a new Reader in the extension:
        - Add a new object with the three mandatory attributes:
            name: 'A literal name of the extension, used to find them and display in popup'
            hostname: 'the base url of the reader, whithout protocol part and bar at end. valid example -> "myreader.com.br"'
            regex_expression: 'used to rescue the name, cap and page of the current mangá that the user are reading,
                               be attempt with the named groups, there are crucial for the extension work well.'
            exclusive_for(optional): 'the name of the mangá, if the reader is exclusive for it.'

    Above, you have two examples of the readers registered in the extension
*/

const READERS = [
    {
        name: 'onepiece-ex',
        hostname: 'onepiece-ex.com.br',
        regex_expression: /https:\/\/onepiece-ex\.com\.br\/mangas\/leitor\/(?<cap>[a-zA-Z0-9\-\_\%]*)\/#(?<page>[0-9]*)/,
        exclusive_for: 'One Piece',
        icon: 'https://onepiece-ex.com.br/favicon/favicon-32x32.png'

    },
    {
        name: 'central-de-mangas',
        hostname: 'cdmnet.com.br',
        regex_expression: /http:\/\/cdmnet\.com\.br\/titulos\/(?<manga>[a-zA-Z0-9\-\_\%]*)\/manga\/ler-online\/(?<cap>[a-zA-Z0-9\-\_\%]*)#(?<page>[0-9]*)$/,
        icon: 'http://cdmnet.com.br/favicon.ico'
    }
]

function getCurrentReader () {
    let reader = READERS.filter((curr) => {
        return curr.hostname === location.hostname
    })

    return (reader.length > 0) ? reader[0] : null
}

function extractCurrentMangaInfo (reader) {
    /*  if the user are reading something, extract manga infos by url
        if not, just pass away
    */
    let match = reader.regex_expression.exec(location.href)
    if (!match) {
        return null
    }

    let groups = match.groups
    
    if (reader.exclusive_for) {
        /*  verify if the reader is exclusive for some manga
            and add/replace 'manga' field in infos within the reader.exclusive_for
        */
        groups = {...groups, ...{manga: reader.exclusive_for}}
    }

    return groups
}
function updateReaderHistory(current, manga_infos) {
    // loop into mangás to find the manga, and then your chapter to update them or add something
    let isMangaFound = false

    current.mangas.forEach((element, index) => {
        if (current.mangas[index].name === manga_infos.name) {
            let isCapFound = false
            current.mangas[index].history.forEach((el, i) => {
                // finds the chapter and update the last page read
                if (current.mangas[index].history[i].cap === manga_infos.history[0].cap) {
                    current.mangas[index].history[i].page = manga_infos.history[0].page
                    isCapFound = true
                }
            })
            if (!isCapFound) {
                current.mangas[index].history.push(manga_infos.history[0])
                console.log('INSERIDO NOVO CAPITULO NO HISTORICO')
            }
            isMangaFound = true
        }
    })
    // if not find the manga in history to update, add them
    if (!isMangaFound) current.mangas.push(manga_infos)
    
    return current
}

function addHistoryReadersInlocalStorage () {
    // if not in reader, just pass away
    let reader = getCurrentReader()
    if (!reader) return;
    
    // if not reading something in the reader, just pass away
    let manga_infos = extractCurrentMangaInfo(reader)
    if (!manga_infos) return;
    
    // at this point, assumes that the user is reading something

    let manga_history = [
        // prototype object of history
        {
            reader: reader.name,
            hostname: reader.hostname,
            icon: reader.icon,
            mangas: [
                {
                    name: manga_infos.manga,
                    history: [
                        {
                            cap: manga_infos.cap,
                            page: manga_infos.page,
                            url: location.href
                        }
                    ]
                }
            ]
        }
    ]

    // get history object from storage
    chrome.storage.sync.get(['historyReaders'], function(items) {
        let history_readers = items.historyReaders
        
        if (history_readers) {
            console.log('ENTRANDO NO HISTORY READERS')
            let isReaderFound = false

            history_readers.forEach((element, index) => {
                if (element.reader === reader.name) {
                    /*
                    This point is important to explain,
                    if the reader is not in storage, add them using the prototype history object,
                    if is, just update the last page read.     
                    */
                   isReaderFound = true
                    console.log('ATUALIZANDO HISTORICO')
                    history_readers[index] = updateReaderHistory(history_readers[index], manga_history[0].mangas[0])
                }
            })

            if (!isReaderFound) history_readers.push(manga_history[0])
        
        } else {
            history_readers = manga_history
        }
        // put the new history object into the storage
        chrome.storage.sync.set({ historyReaders: history_readers }, function () {
            console.log('Histórico salvo/atualizado com sucesso!')
        })
    })
};

// call block
window.addEventListener('load', function load(event) {
    window.removeEventListener('load', load, false);
    addHistoryReadersInlocalStorage();
})
