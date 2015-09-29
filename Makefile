test:
	browserify -t babelify tests/basictests.js | \
		node_modules/.bin/tap-closer | \
		node_modules/.bin/smokestack -b chrome

test-firefox:
	browserify -t babelify tests/basictests.js | \
		node_modules/.bin/tap-closer | \
		node_modules/.bin/smokestack -b firefox

pushall:
	git push origin master && git push origin gh-pages
