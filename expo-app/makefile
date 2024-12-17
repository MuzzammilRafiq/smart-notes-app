# Expo App Makefile

.PHONY: install start dev build clean test lint

# Install dependencies
install:
	npm install

# Start expo development server
start:
	npx expo start

# Start expo development server in web mode
web:
	npx expo start --web

# Start expo development server in android mode
android:
	npx expo start --android

# Start expo development server in ios mode
ios:
	npx expo start --ios

# Build for production
build:
	npx expo build

# Clean project
clean:
	rm -rf node_modules
	rm -rf .expo
	npm cache clean --force

# Run tests
test:
	npm test

# Run linter
lint:
	npm run lint

# Update Expo and dependencies
update:
	npx expo upgrade