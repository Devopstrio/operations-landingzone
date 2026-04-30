.PHONY: help build up down test lint migrate simulate-incident execute-runbook

help:
	@echo "Operations Landing Zone - Management Commands"
	@echo "---------------------------------------------"
	@echo "build              : Build all service containers"
	@echo "up                 : Start all services in the background"
	@echo "down               : Stop all services"
	@echo "test               : Run all tests (Unit + Workflow)"
	@echo "lint               : Run linting checks"
	@echo "migrate            : Run database migrations"
	@echo "simulate-incident  : Trigger a synthetic P1 incident for testing"
	@echo "execute-runbook    : Trigger an automated remediation runbook"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/api tests/workflows
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/worker
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

simulate-incident:
	docker-compose exec api python scripts/respond/trigger_synthetic_incident.py

execute-runbook:
	docker-compose exec api python scripts/automate/run_health_check_runbook.py
