Feature: Kontaktok kezelése

  Scenario: Új kontakt létrehozása
    Given a felhasználó be van jelentkezve
    When új kontaktot hoz létre helyes adatokkal
    Then a kontakt megjelenik a listában

  Scenario: Kontakt szerkesztése
    Given egy létező kontakt a listában
    When a felhasználó módosítja a kontakt adatait
    Then a változások mentésre kerülnek

  Scenario: Kontakt törlése
    Given egy létező kontakt a listában
    When a felhasználó törli a kontaktot
    Then a kontakt eltűnik a listából

  Scenario Outline: Új kontakt létrehozása különböző adatokkal
    Given a felhasználó be van jelentkezve
    When új kontaktot hoz létre a következő adatokkal:
      | name   | email           |
      | <name> | <email>         |
    Then a kontakt megjelenik a listában

    Examples:
      | name    | email              |
      | Teszt1  | teszt1@email.com   |
      | Teszt2  | teszt2@email.com   |