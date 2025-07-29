# GitHub Actions Workflows - Oktatási Anyag

Ez a mappa különböző GitHub Actions workflow példákat tartalmaz, amelyek bemutatják a CI/CD folyamatok különböző aspektusait.

## 📋 Workflow Lista

### 1. **playwright.yml** - Alapvető Playwright Tesztek
- **Trigger:** Push a `balint_gondar_20` branch-re
- **Funkció:** Alapvető Playwright tesztek futtatása
- **Tanulási cél:** Alapvető workflow struktúra, Node.js setup, artifact feltöltés

### 2. **parallel-tests.yml** - Párhuzamos Böngésző Tesztek
- **Trigger:** Push és Pull Request a `balint_gondar_20` branch-re
- **Funkció:** Chrome, Firefox és Safari tesztek párhuzamos futtatása
- **Tanulási cél:** Párhuzamos job-ok, különböző böngészők tesztelése

### 3. **manual-trigger.yml** - Manuális Trigger Bemeneti Paraméterekkel
- **Trigger:** Manuális (workflow_dispatch)
- **Funkció:** Felhasználó által választott böngésző, teszttagek és környezet
- **Tanulási cél:** Workflow inputs, feltételes végrehajtás, GitHub Script

### 4. **matrix-strategy.yml** - Matrix Stratégia
- **Trigger:** Push és Pull Request a `balint_gondar_20` branch-re
- **Funkció:** Több Node.js verzió és böngésző kombináció tesztelése
- **Tanulási cél:** Matrix stratégia, cache használata, fail-fast beállítás

### 5. **conditional-execution.yml** - Feltételes Végrehajtás
- **Trigger:** Push, Pull Request és ütemezett (cron)
- **Funkció:** Különböző tesztek különböző eseményekre
- **Tanulási cél:** Feltételes job-ok, PR kommentek, ütemezett workflow-ok

### 6. **environment-secrets.yml** - Környezeti Változók és Titkok
- **Trigger:** Push és manuális trigger
- **Funkció:** Környezeti változók, secrets, deployment
- **Tanulási cél:** Environment secrets, biztonsági ellenőrzések, deployment

## 🚀 Használati Útmutató

### Manuális Workflow Indítása
1. Menj a GitHub repository Actions fülére
2. Válaszd ki a "Manual Test Runner" workflow-ot
3. Kattints a "Run workflow" gombra
4. Töltsd ki a bemeneti paramétereket
5. Kattints a "Run workflow" gombra

### Workflow Paraméterek
- **browser:** chrome, firefox, safari, all
- **test_tags:** @smoke, @regression, stb.
- **environment:** development, staging, production
- **headless:** true/false

## 📊 Workflow Áttekintés

| Workflow | Trigger | Párhuzamos | Matrix | Secrets | PR Comment |
|----------|---------|------------|--------|---------|------------|
| playwright.yml | Push | ❌ | ❌ | ❌ | ❌ |
| parallel-tests.yml | Push/PR | ✅ | ❌ | ❌ | ❌ |
| manual-trigger.yml | Manual | ❌ | ❌ | ❌ | ✅ |
| matrix-strategy.yml | Push/PR | ✅ | ✅ | ❌ | ❌ |
| conditional-execution.yml | Push/PR/Cron | ✅ | ❌ | ❌ | ✅ |
| environment-secrets.yml | Push/Manual | ❌ | ❌ | ✅ | ✅ |

## 🔧 Konfiguráció

### Szükséges Secrets (Settings > Secrets and variables > Actions)
- `API_BASE_URL`: API alap URL
- `TEST_USER`: Teszt felhasználó
- `TEST_PASSWORD`: Teszt jelszó
- `DEPLOY_KEY`: Deployment kulcs

### Environment Protection Rules
- **production:** Requires review before deployment
- **staging:** Automatic deployment allowed

## 📈 Teljesítmény Optimalizálás

### Cache Használata
```yaml
- name: Cache node modules
  uses: actions/cache@v3
  with:
    path: balint_gondar_20/node_modules
    key: ${{ runner.os }}-node-${{ matrix.node-version }}-${{ hashFiles('balint_gondar_20/package-lock.json') }}
```

### Párhuzamos Futtatás
```yaml
strategy:
  fail-fast: false  # Ne állítsd le a többi job-ot ha egy hibázik
```

### Feltételes Végrehajtás
```yaml
if: github.event_name == 'pull_request' || github.ref == 'refs/heads/main'
```

## 🐛 Hibaelhárítás

### Gyakori Problémák
1. **Workflow nem triggerelődik:** Ellenőrizd a branch nevet és a trigger feltételeket
2. **Secrets nem elérhetők:** Ellenőrizd az environment beállításokat
3. **Cache nem működik:** Ellenőrizd a cache key-t és path-ot
4. **Matrix job-ok hibáznak:** Ellenőrizd a fail-fast beállítást

### Debug Logok
```yaml
- name: Debug info
  run: |
    echo "Event: ${{ github.event_name }}"
    echo "Ref: ${{ github.ref }}"
    echo "Actor: ${{ github.actor }}"
    echo "Repository: ${{ github.repository }}"
```

## 📚 További Források
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright GitHub Actions](https://playwright.dev/docs/ci-intro)
- [GitHub Actions Examples](https://github.com/actions/starter-workflows) 