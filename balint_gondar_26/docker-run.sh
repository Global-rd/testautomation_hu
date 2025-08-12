#!/bin/bash

# Docker script for running Cypress tests
# Usage: ./docker-run.sh [command]

set -e

case "${1:-all}" in
    "all")
        echo "Running all Cypress tests..."
        docker compose run --rm cypress npx cypress run
        ;;
    "e2e")
        echo "Running E2E tests only..."
        docker compose run --rm cypress npx cypress run --spec "cypress/e2e/**/*.cy.ts"
        ;;
    "component")
        echo "Running component tests only..."
        docker compose run --rm cypress npx cypress run --component --spec "cypress/component/**/*.cy.ts"
        ;;
    "specific")
        if [ -z "$2" ]; then
            echo "Please specify a test file: ./docker-run.sh specific cypress/e2e/webpark_api_ui.cy.ts"
            exit 1
        fi
        echo "Running specific test: $2"
        docker compose run --rm cypress npx cypress run --spec "$2"
        ;;
    "open")
        echo "Opening Cypress in interactive mode..."
        docker compose run --rm -p 9323:9323 cypress npx cypress open
        ;;
    "build")
        echo "Building Docker image..."
        docker compose build
        ;;
    "clean")
        echo "Cleaning up Docker containers and images..."
        docker compose down --rmi all --volumes --remove-orphans
        docker system prune -f
        ;;
    "help")
        echo "Available commands:"
        echo "  all       - Run all tests (default)"
        echo "  e2e       - Run E2E tests only"
        echo "  component - Run component tests only"
        echo "  specific  - Run a specific test file (requires file path)"
        echo "  open      - Open Cypress in interactive mode"
        echo "  build     - Build Docker image only"
        echo "  clean     - Clean up Docker containers and images"
        echo "  help      - Show this help message"
        ;;
    *)
        echo "Unknown command: $1"
        echo "Use './docker-run.sh help' for available commands"
        exit 1
        ;;
esac
