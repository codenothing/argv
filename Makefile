.PHONY: all test


all: lint

lint:
	@node build/lint.js
