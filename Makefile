all: test

clean:
	@rm -rf build/results/

lint:
	@node build/lint.js

test: clean lint
	@node build/test.js

test-full:
	@./build/full.sh
