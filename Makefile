.PHONY: all test


all: test

lint:
	@node build/lint.js

test: lint
	@node test/core.js
