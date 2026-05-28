SHELL := /bin/bash

COMPOSE ?= docker compose
TF      := $(COMPOSE) run --rm terraform
LAMBDA_DIR := infra/contact-lambda

.PHONY: help up down logs build shell rebuild \
	lambda-build \
	tf-init-local tf-plan-local tf-apply-local tf-destroy-local \
	tf-init-prod tf-plan-prod tf-apply-prod \
	awslocal-check

help:
	@grep -E '^[a-zA-Z_-]+:.*?##' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-22s\033[0m %s\n", $$1, $$2}'

## --- dev ---
up: ## Start web + localstack
	$(COMPOSE) up -d web localstack
	@echo "web:        http://localhost:3000"
	@echo "localstack: http://localhost:4566"

down: ## Stop everything
	$(COMPOSE) down

logs: ## Tail web logs
	$(COMPOSE) logs -f web

shell: ## Shell into the web container
	$(COMPOSE) exec web sh

rebuild: ## Rebuild web image
	$(COMPOSE) build --no-cache web

build: ## Produce the static `out/` via the builder stage
	docker build --target builder -t pdcarlson-portfolio:builder .
	docker create --name _build pdcarlson-portfolio:builder
	rm -rf out && docker cp _build:/app/out ./out
	docker rm _build

## --- lambda ---
lambda-build: ## Build the contact lambda zip
	cd $(LAMBDA_DIR) && npm install && npm run package

## --- terraform: local (localstack) ---
tf-init-local: ## terraform init for the local env
	$(TF) -chdir=infra/terraform/envs/local init

tf-plan-local: ## terraform plan against localstack
	$(TF) -chdir=infra/terraform/envs/local plan

tf-apply-local: lambda-build ## Apply infra to localstack
	$(TF) -chdir=infra/terraform/envs/local apply -auto-approve

tf-destroy-local: ## Tear down localstack infra
	$(TF) -chdir=infra/terraform/envs/local destroy -auto-approve

## --- terraform: prod (real aws) ---
tf-init-prod: ## terraform init for prod
	$(TF) -chdir=infra/terraform/envs/prod init

tf-plan-prod: ## terraform plan against real aws (read-only)
	$(TF) -chdir=infra/terraform/envs/prod plan

tf-apply-prod: lambda-build ## Apply infra to real aws
	$(TF) -chdir=infra/terraform/envs/prod apply

awslocal-check: ## Show LocalStack service health
	@curl -s http://localhost:4566/_localstack/health | jq .
