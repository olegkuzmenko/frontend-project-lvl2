
install: 
	npm ci

publish:
	npm publish --dry-run

link:
	npm link

start: install link

lint:
	npx eslint .
