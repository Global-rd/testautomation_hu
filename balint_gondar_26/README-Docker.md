# Cypress Docker Setup

Ez a projekt Docker konténerben futtatható Cypress teszteket tartalmaz a `cypress/included` image használatával.

## Előfeltételek

- Docker
- Docker Compose

## Gyors indítás

### 1. Minden teszt futtatása
```bash
./docker-run.sh
# vagy
docker compose run --rm cypress npx cypress run
```

### 2. Csak E2E tesztek
```bash
./docker-run.sh e2e
```

### 3. Csak komponens tesztek
```bash
./docker-run.sh component
```

### 4. Konkrét teszt fájl futtatása
```bash
./docker-run.sh specific cypress/e2e/webpark_api_ui.cy.ts
```

### 5. Interaktív mód (Cypress GUI)
```bash
./docker-run.sh open
```

## Docker parancsok

### Alapvető parancsok
```bash
# Tesztek futtatása
docker compose run --rm cypress npx cypress run

# Egyszeri futtatás (konténer törlése után)
docker compose run --rm cypress

# Tisztítás
docker compose down --rmi all --volumes
```

### Speciális parancsok
```bash
# Csak E2E tesztek
docker compose run --rm cypress npx cypress run --spec "cypress/e2e/**/*.cy.ts"

# Csak komponens tesztek
docker compose run --rm cypress npx cypress run --component

# Konkrét spec fájl
docker compose run --rm cypress npx cypress run --spec "cypress/e2e/webpark_api_ui.cy.ts"

# Interaktív mód (port forwarding szükséges)
docker compose run --rm -p 9323:9323 cypress npx cypress open
```

### Teszt futtatási idő csökkentése
- Parallel execution
- Spec fájlok szétválasztása
- Cache használata

## Biztonság

- Non-root user használata
- Minimális jogosultságok
- Frissített base image
- Vulnerability scanning
