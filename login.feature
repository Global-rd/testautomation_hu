Feature: Login

  Scenario: Sikeres login valós felhasználóval
    Given a regisztrált felhasználó a login oldalon van
    When helyes email címet és jelszót ad meg
    Then sikeresen belép az alkalmazásba

  Scenario: Sikertelen login hibás jelszóval
    Given a regisztrált felhasználó a login oldalon van
    When helyes email címet és hibás jelszót ad meg
    Then hibaüzenetet kap