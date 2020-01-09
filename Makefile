include config.mk

HOMEDIR = $(shell pwd)
BROWSERIFY = ./node_modules/.bin/browserify
UGLIFY = ./node_modules/uglify-es/bin/uglifyjs
TRANSFORM_SWITCH = -t [ babelify --presets [ es2015 ] --extensions ['.ts'] ]
PLUGIN_SWITCH = -p [tsify]

pushall: sync
	git push origin master

run:
	wzrd app.js:index.js -- \
		-d \
		$(PLUGIN_SWITCH)

build:
	$(BROWSERIFY) $(PLUGIN_SWITCH) app.js | $(UGLIFY) -c -m -o index.js
	#$(BROWSERIFY) $(PLUGIN_SWITCH) $(TRANSFORM_SWITCH) app.js > index.js

prettier:
	prettier --single-quote --write "**/*.js"
	prettier --single-quote --write "**/*.ts"

sync:
	rsync -a $(HOMEDIR)/ $(USER)@$(SERVER):/$(APPDIR) --exclude node_modules/ \
		--exclude .git/ --omit-dir-times --no-perms

deploy:
	npm version patch && make build && git commit -a -m"Build." && make pushall

encounters-index:
	node tools/build-encounter-dict.js --encounterDir encounters > encounters/index.ts
