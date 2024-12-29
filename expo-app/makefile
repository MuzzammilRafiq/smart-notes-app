.PHONY: install start dev build clean test lint
install:
	npm install
start:
	npx expo start
web:
	npx expo start --web
android:
	npx expo start --android
ios:
	npx expo start --ios
build:
	npx expo build
clean:
	rm -rf node_modules
	rm -rf .expo
	npm cache clean --force
test:
	npm test
lint:
	npm run lint
update:
	npx expo upgrade