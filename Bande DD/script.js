// Transformation des Map en tableaux
var albumsArray = Array.from(albums.values())
var seriesArray = Array.from(series.values())
var auteursArray = Array.from(auteurs.values())



document.getElementById('rechercher').addEventListener('click', function () {
    var termeRecherche = document.getElementById('barreDeRecherche').value.toLowerCase();

    // Recherche des auteurs correspondant au terme de recherche
    var resultatsAuteurs = auteursArray.filter(function (auteur) {
        return auteur.nom.toLowerCase().includes(termeRecherche);
    });

    // Recherche des albums correspondant au terme de recherche
    var resultatsAlbums = albumsArray.filter(function (album) {
        return album.titre.toLowerCase().includes(termeRecherche);
    });

    // Recherche des séries correspondant au terme de recherche
    var resultatsSeries = seriesArray.filter(function (serie) {
        return serie.nom.toLowerCase().includes(termeRecherche);
    });

    afficherResultats(resultatsAuteurs, resultatsAlbums, resultatsSeries);
});

// Fonction pour afficher les résultats dans la liste
function afficherResultats(resultatsAuteurs, resultatsAlbums, resultatsSeries) {
    var cardDiv = document.getElementById('card');
    cardDiv.innerHTML = ''; // Efface le contenu précédent de la div card

    // Affichage des résultats des auteurs
    resultatsAuteurs.forEach(function (auteur) {
        var p = document.createElement('p');
        p.textContent = 'Auteur: ' + auteur.nom;
        cardDiv.appendChild(p);

        // Afficher tous les albums de l'auteur
        var albumsAuteur = albumsArray.filter(function (album) {
            return album.idAuteur === auteur.id;
        });
        albumsAuteur.forEach(function (album) {
            var albumDiv = document.createElement('div');
            albumDiv.textContent = 'Album: ' + album.titre + ' | Prix: ' + album.prix + ' EUR';
            cardDiv.appendChild(albumDiv);
        });

        // Afficher toutes les séries de l'auteur
        var seriesAuteur = seriesArray.filter(function (serie) {
            return albumsAuteur.some(function (album) {
                return album.idSerie === serie.id;
            });
        });
        seriesAuteur.forEach(function (serie) {
            var serieDiv = document.createElement('div');
            serieDiv.textContent = 'Série: ' + serie.nom + ' | Prix: ' + serie.prix + ' EUR';
            cardDiv.appendChild(serieDiv);
        });
    });

    // Affichage des résultats des albums
    resultatsAlbums.forEach(function (album) {
        var div = document.createElement('div');
        div.textContent = 'Album: ' + album.titre;
        cardDiv.appendChild(div);

        // Récupération de l'auteur correspondant à cet album
        var auteurAlbum = auteursArray.find(function (auteur) {
            return auteur.id === album.idAuteur;
        });

        if (auteurAlbum) {
            var auteurDiv = document.createElement('div');
            auteurDiv.textContent = '   Auteur: ' + auteurAlbum.nom;
            cardDiv.appendChild(auteurDiv);
        }

        // Afficher tous les albums de la série
        var albumsSerie = albumsArray.filter(function (alb) {
            return alb.idSerie === album.idSerie;
        });
        albumsSerie.forEach(function (alb) {
            var albDiv = document.createElement('div');
            albDiv.textContent = '   - Album: ' + alb.titre + ' | Prix: ' + alb.prix + ' EUR';
            cardDiv.appendChild(albDiv);
        });
    });

    // Affichage des résultats des séries
    resultatsSeries.forEach(function (serie) {
        var div = document.createElement('div');
        div.textContent = 'Série: ' + serie.nom + ' | Prix: ' + serie.prix + ' EUR';
        cardDiv.appendChild(div);

        // Récupération de l'auteur correspondant à cette série
        var auteurSerie = auteursArray.find(function (auteur) {
            return auteur.id === serie.idAuteur;
        });

        if (auteurSerie) {
            var auteurDiv = document.createElement('div');
            auteurDiv.textContent = '   Auteur: ' + auteurSerie.nom;
            cardDiv.appendChild(auteurDiv);
        }
    });
}


