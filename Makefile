build-extension:
	quasar build
	cp historyReaders.js dist/spa/historyReaders.js
	cp manifest.json dist/spa/manifest.json