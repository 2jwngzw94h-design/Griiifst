
# Grist IIIF Viewer

Ce widget permet d'afficher un **manifest IIIF** stocké dans une cellule d'un document Grist.

Le visualiseur utilisé est **Mirador**, qui permet de naviguer dans les images d'un manifest IIIF directement depuis une vue Grist.

URL du widget :

https://2jwngzw94h-design.github.io/Griiifst/

---

# Utiliser le widget dans Grist

## 1. Préparer la table

Dans votre document Grist, créez une table contenant une colonne avec les URLs de manifests IIIF.

Exemple :

| id | titre | manifest_url |
|---|---|---|
| 1 | Manuscrit A | https://example.org/manifest.json |
| 2 | Manuscrit B | https://example.org/manifest.json |

La colonne peut avoir **n’importe quel nom**, car le widget utilise le système de **Column Mapping** de Grist.

---

## 2. Ajouter le widget à la page

Dans Grist :

1. cliquer sur **Add New**
2. cliquer sur **Add Widget to Page**
3. dans **Select Widget**, choisir **Custom**
4. dans **Select Data**, sélectionner la table contenant les manifests
5. dans **Select By**, choisir **la même table**
6. cliquer sur **Add to Page**

---

## 3. Configurer l’URL du widget

Dans les **Widget options**, renseigner le champ **Custom URL** :

https://2jwngzw94h-design.github.io/Griiifst/

---

## 4. Autoriser l'accès aux données

Dans les options du widget, vérifier le paramètre :

Access Level

Choisir :

Read selected table

⚠️ Sans ce droit, le widget ne pourra pas lire les données de la table.

---

## 5. Configurer le Column Mapping

Dans les options du widget, trouver la section :

Column mapping

Une entrée apparaît :

Manifest IIIF

Associer cette entrée à la colonne contenant les URLs de manifest.

Exemple :

Manifest IIIF → manifest_url

---

## 6. Utiliser le widget

Une fois configuré :

1. cliquer sur une ligne dans la table
2. le widget lit l’URL du manifest dans la colonne mappée
3. Mirador charge le manifest et affiche les images

Pour afficher un autre manifest, il suffit de **cliquer sur une autre ligne de la table**.

---

# Pièges fréquents

## Le widget s’affiche mais aucune image ne charge

Vérifier le paramètre :

Access Level → Read selected table

Sans ce droit, le widget ne reçoit aucune donnée.

---

## Le widget affiche toujours le même manifest

Vérifier le paramètre :

Select By

Il doit pointer vers **la table contenant les manifests**.

Sinon le widget ne reçoit pas les changements de sélection.

---





---