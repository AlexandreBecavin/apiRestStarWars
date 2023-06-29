## Lancement du projet 

npm run start

## Auth
Post sur la route `localhost:3000/auth/login`

objet json pour la connexion
```
{
    "email": "admin@gmail.com",
    "password": "password"
}
```


## Explication modèle richardson
Le modèle richardson est une api rest qui respect quelques conventions pour rendre les apis identiques et plus facile d'utilisation. 

Régles n°1: 
On doit utiliser les verbes http pour définir notre action sur la route.
Sur mes routes j'ai les verbes GET ONE, GET ALL, POST, PUT, DELETE

Régles n°2: 
Chaque route avec son verbe http dois retourné,modifié,supprimer que une seule entité et pas récupérer des éléments de d'autre entité
ma route /films s'occupe que des films

Régles n°3: 
Les retours json doit contenir les hyperliens sur les éléments où il peut requêtes de nouveau. Les liens sur les relations avec les autres entités ou l'entité actuelles
Mon film retourne les hyperliens des entités suivantes
films
starships
vehicles
planets
characters
species

Régles n°4:
Chaque entité doit avoir qu'une seul URI pour le requêter. La différenciation se fait avec les verbes HTTP.
Mon entité film est accessible seulement sur la route http://localhost:3000/films/