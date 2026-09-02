#!/usr/bin/env bash
# Vérifie la carte de redirections 301 sur un déploiement (preview ou prod).
#
#   ./migration/check-redirects.sh https://izika-www.pages.dev
#   ./migration/check-redirects.sh https://izika.com
#
# Pour chaque ancienne URL : attend exactement UN 301, une Location exacte
# (sans chaîne), et un 200 sur la cible.
set -u

BASE="${1:?usage: check-redirects.sh <base-url>}"
FAIL=0

check() {
  local from="$1" expected="$2"
  local response code location target_code
  response=$(curl -s -o /dev/null -w "%{http_code} %{redirect_url}" "$BASE$from")
  code="${response%% *}"
  location="${response#* }"
  if [ "$code" != "301" ]; then
    echo "FAIL $from -> attendu 301, reçu $code"
    FAIL=1
    return
  fi
  if [ "$location" != "$BASE$expected" ]; then
    echo "FAIL $from -> Location '$location', attendu '$BASE$expected'"
    FAIL=1
    return
  fi
  target_code=$(curl -s -o /dev/null -w "%{http_code}" "$location")
  if [ "$target_code" != "200" ]; then
    echo "FAIL $from -> cible $location renvoie $target_code (chaîne de redirections ?)"
    FAIL=1
    return
  fi
  echo "OK   $from -> $expected"
}

# ---- Racine et legacy ----
check "/" "/fr"
check "/vtc" "/fr/vtc-indemnites-kilometriques"
check "/indemnites-kilometriques" "/fr/indemnite-kilometrique"

# ---- Anciens alias non préfixés ----
for slug in solo team team-collectivites team-entreprises fonctionnalites \
  pricing faq security mentions-legales charte-de-confidentialite cgv \
  calculateur-indemnites-kilometriques; do
  check "/$slug" "/fr/$slug"
done
check "/desabonnement" "/fr/faq"

# ---- Anciens préfixes longs ----
check "/fr_FR" "/fr"
check "/fr_CH" "/fr"
check "/fr_FR/faq" "/fr/faq"
check "/fr_CH/pricing" "/fr/pricing"
check "/fr_FR/solutions/consultants" "/fr/solutions/consultants"

# ---- Les 37 articles (extraits de la collection) ----
for f in "$(dirname "$0")/../src/content/articles/fr/"*.md; do
  slug=$(basename "$f" .md)
  check "/$slug" "/fr/$slug"
done

if [ "$FAIL" = "0" ]; then
  echo "--- Toutes les redirections sont correctes ---"
else
  echo "--- ÉCHECS détectés ---"
  exit 1
fi
