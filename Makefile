test: test-chrome test-firefox

BROWSERIFYCMD = browserify -d -t [babelify --optional runtime]

SMOKECHROME = node_modules/.bin/tap-closer | \
	node_modules/.bin/smokestack -b chrome

SMOKEFIREFOX = node_modules/.bin/tap-closer | \
	node_modules/.bin/smokestack -b firefox

test-chrome:
	$(BROWSERIFYCMD) tests/basictests.js | $(SMOKECHROME)
	$(BROWSERIFYCMD) tests/seek-tests.js | $(SMOKECHROME)

test-chrome-leave-up:
	$(BROWSERIFYCMD) tests/seek-tests.js | node_modules/.bin/smokestack -b chrome

test-firefox:
	$(BROWSERIFYCMD) tests/basictests.js | $(SMOKEFIREFOX)
	$(BROWSERIFYCMD) tests/seek-tests.js | $(SMOKEFIREFOX)

pushall:
	git push origin master && git push origin gh-pages
