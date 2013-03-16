all: test

lint:
	@node build/lint.js

test: lint
	@node build/test.js
