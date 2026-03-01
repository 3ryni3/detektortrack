# DetektorTrack v3 – Instrukcja wdrożenia

## Struktura projektu
```
detektortrack/
├── netlify.toml              ← konfiguracja Netlify
├── public/
│   ├── index.html            ← główna aplikacja
│   └── manifest.json         ← PWA manifest
├── netlify/
│   └── functions/
│       ├── geoportal.js      ← proxy Geoportal (omija CORS)
│       └── community.js      ← API wspólnej mapy
└── SUPABASE_SCHEMA.sql       ← struktura bazy danych
```

## Krok 1 – Supabase (baza danych)

1. Wejdź na https://supabase.com i załóż projekt
2. Wejdź w SQL Editor → New Query
3. Wklej zawartość pliku `SUPABASE_SCHEMA.sql` i kliknij Run
4. Wejdź w Settings → API i skopiuj:
   - **Project URL** (np. https://xxxxx.supabase.co)
   - **anon public key** (długi klucz)

## Krok 2 – GitHub (repozytorium)

1. Załóż konto na https://github.com
2. Utwórz nowe repozytorium np. `detektortrack`
3. Wgraj wszystkie pliki z tego folderu zachowując strukturę katalogów

## Krok 3 – Netlify (hosting)

1. Wejdź na https://netlify.com i załóż konto
2. Kliknij "Add new site" → "Import from Git" → wybierz GitHub
3. Wybierz repozytorium `detektortrack`
4. Build settings zostaw puste (netlify.toml wszystko skonfiguruje)
5. Kliknij Deploy

## Krok 4 – Zmienne środowiskowe (klucze Supabase)

W Netlify wejdź w:
Site Settings → Environment Variables → Add variable

Dodaj dwie zmienne:
- `SUPABASE_URL` = twój Project URL z Supabase
- `SUPABASE_ANON_KEY` = twój anon key z Supabase

Kliknij "Trigger deploy" aby ponownie wdrożyć z nowymi zmiennymi.

## Krok 5 – Własna domena (opcjonalnie)

W Netlify możesz ustawić własną domenę np. detektortrack.pl
lub zostać przy darmowej np. detektortrack.netlify.app

## Gotowe!

Aplikacja będzie dostępna pod adresem Netlify.
Wyślij link znajomym poszukiwaczom – działka z Geoportalu,
wspólna mapa znalezisk i raport PDF dla WKZ.
