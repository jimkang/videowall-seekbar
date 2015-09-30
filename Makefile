test: test-chrome test-firefox

test-chrome:
	browserify -t babelify tests/basictests.js | \
		node_modules/.bin/tap-closer | \
		node_modules/.bin/smokestack -b chrome

test-chrome-leave-up:
	browserify -t babelify tests/basictests.js | \
		node_modules/.bin/smokestack -b chrome

test-firefox:
	browserify -t babelify tests/basictests.js | \
		node_modules/.bin/tap-closer | \
		node_modules/.bin/smokestack -b firefox

pushall:
	git push origin master && git push origin gh-pages
