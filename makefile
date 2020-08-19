
install: 
	npm ci

publish:
	npm publish --dry-run

link:
	npm link

start: install link

lint:
	npx eslint .

test:
	npm run test

test-coverage:
	npm test -- --coverage