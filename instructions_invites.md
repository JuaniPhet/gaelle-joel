# Protocole d'Ajout d'Invités - Mariage Gaëlle & Joël

Ce document sert de guide de référence pour l'IA afin de générer le JSON des invités à partir d'images ou de listes.

## 1. Règles de Formatage des Champs
- **slug** : format `prenom-nom` (minuscules, sans accents, espaces remplacés par des tirets).
- **prenom** : prénom tel qu'écrit sur l'image (laisser vide "" si absent).
- **nom** : nom tel qu'écrit sur l'image (laisser vide "" si absent).
- **contactSms** : Toujours "237691605767".

## 2. Logique des Tables et Groupes
Analyse la colonne "Invité À" et les colonnes de tables :
- **Si l'invité est présent aux deux (VN et Soirée)** :
    - Utiliser les clés `"tableVH"` (correspond à la colonne Table VN) et `"tableDiner"` (correspond à la colonne Table Soirée).
    - **Groupes** : `["civil", "salle-royaume", "vh", "diner"]`.
- **Si l'invité est présent à un seul (soit VN, soit Soirée)** :
    - Utiliser la clé unique `"table"`.
    - **Groupes** : `["civil", "salle-royaume"]` + le tag correspondant (`"vh"` pour VN ou `"diner"` pour Soirée).

*Note importante : "VN" sur les documents source doit toujours être traduit par "vh" dans le code.*

## 3. Format JSON attendu
Chaque invité doit être un objet dans ce format :
```json
{
  "slug": "exemple-nom",
  "prenom": "Exemple",
  "nom": "NOM",
  "tableVH": "NOM_TABLE_VN",
  "tableDiner": "NOM_TABLE_SOIRÉE",
  "contactSms": "237691605767",
  "groupes": ["civil", "salle-royaume", "vh", "diner"]
}