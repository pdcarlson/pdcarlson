SHELL := /bin/bash

LAMBDA_DIR := infra/contact-lambda
PROD       := infra/terraform/envs/prod

.PHONY: help dev build lambda-build tf-init tf-plan tf-apply

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?##' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'

dev: ## Next dev server on :3000
	npm run dev

build: ## Produce the static out/
	npm run build

lambda-build: ## Build the contact lambda zip
	cd $(LAMBDA_DIR) && npm install && npm run package

tf-init: ## terraform init for prod
	terraform -chdir=$(PROD) init

tf-plan: lambda-build ## terraform plan against real aws
	terraform -chdir=$(PROD) plan

tf-apply: lambda-build ## terraform apply to real aws
	terraform -chdir=$(PROD) apply
