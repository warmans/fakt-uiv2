PROJECT_OWNER=warmans
PROJECT_NAME=fakt-ui
PROJECT_VERSION=2.1.1
DOCKER_NAME=$(PROJECT_OWNER)/$(PROJECT_NAME)

# Go
#-----------------------------------------------------------------------

.PHONY: test
test:
	@go test

.PHONY: build
build:
	GO15VENDOREXPERIMENT=1 NOCGO=true go build -ldflags "-X main.Version=$(PROJECT_VERSION)" -o .build/$(PROJECT_NAME)

.PHONY: build-ui
build-ui: 
	cd ui; ng build --prod --aot

# Packaging
#-----------------------------------------------------------------------

.PHONY: docker-build
docker-build:
	docker build -t $(DOCKER_NAME):$(PROJECT_VERSION) .

.PHONY: docker-publish
docker-publish:
	docker push $(DOCKER_NAME):$(PROJECT_VERSION)

# Meta
#-----------------------------------------------------------------------

.PHONY: publish
publish: build build-ui docker-build docker-publish
