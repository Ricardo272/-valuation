// Transformation des Map en tableaux
var albumsArray = Array.from(albums.values())
var seriesArray = Array.from(series.values())
var auteursArray = Array.from(auteurs.values())



document.getElementById('rechercher').addEventListener('click', function () {
    var termeRecherche = document.getElementById('barreDeRecherche').value.toLowerCase();

    if (termeRecherche.trim() === '') {
        afficherDonneesFictives();
    } else {
        var resultatsAuteurs = auteursArray.filter(function (auteur) {
            return auteur.nom.toLowerCase().includes(termeRecherche);
        });

        var resultatsAlbums = albumsArray.filter(function (album) {
            return album.titre.toLowerCase().includes(termeRecherche);
        });

        var resultatsSeries = seriesArray.filter(function (serie) {
            return serie.nom.toLowerCase().includes(termeRecherche);
        });

        afficherResultats(resultatsAuteurs, resultatsAlbums, resultatsSeries);
    }
});

function afficherDonneesFictives() {
    var cardDiv = document.getElementById('card');
    cardDiv.innerHTML = `

    <h2 id="titreBD">Titre de la Bande Dessinée</h2>

    <p id="nomAuteur">Auteur: Nom de l'auteur</p>

    <p id="prixAlbum">Prix: XX.XX EUR</p>

    <img id="couvertureBD" src="assets/albums/Arkezone-01-Le dôme.jpg" alt="Couverture de la Bande Dessinée">

    <p id="descriptionAlbum">Description de la bande dessinée...</p> 
    ` ;
}

function getAlbumImg(album) {
    // nous allons chercher le nom de la série via idSerie de l'album et nous supprimons les caractères spéciaux à l'aide du replace
    let serieName = series.get(album.idSerie).nom.replace(/'|!|\?|\.|"|:|\$/g, "");

    // Nous supprimons les caractères spéciaux à l'aide du replace
    let titre = album.titre.replace(/'|!|\?|\.|"|:|\$/g, "");

    // Nous définissons l'extension de l'image
    let extension = 'jpg';

    // il nous reste plus qu'à retourner le nom de l'image avec le format suivant : {nom-de-la-série}-{numéro-de-l'album}-{titre-de-l'album}.{extension}
    return `${serieName}-${album.numero}-${titre}.${extension}`;
}

function afficherResultats(resultatsAuteurs, resultatsAlbums, resultatsSeries) {
    var cardAlbumsDiv = document.getElementById('cardAlbums');
    var cardSeriesDiv = document.getElementById('cardSeries');
    var cardAuteursDiv = document.getElementById('cardAuteurs');

    // Nettoie le contenu précédent des divs
    cardAlbumsDiv.innerHTML = '';
    cardSeriesDiv.innerHTML = '';
    cardAuteursDiv.innerHTML = '';

    // Fonction pour générer le contenu HTML pour chaque type de résultat
    function genererHTML(resultats, type) {
        var html = '';
        resultats.forEach(function (resultat) {
            if (type === 'auteurs') {
                html += `<div>Auteur: ${resultat.nom}</div>`;
            } else if (type === 'albums') {
                html += `<div>Titre: ${resultat.titre}</div>`;
            } else if (type === 'series') {
                html += `<div>Série: ${resultat.nom}</div>`;
            }
        });
        return html;
    }

    // Génère le contenu HTML pour chaque type de résultat
    var htmlAuteurs = genererHTML(resultatsAuteurs, 'auteurs');
    var htmlAlbums = genererHTML(resultatsAlbums, 'albums');
    var htmlSeries = genererHTML(resultatsSeries, 'series');

    // Injecte le contenu HTML dans les divs respectives
    cardAuteursDiv.innerHTML = htmlAuteurs;
    cardAlbumsDiv.innerHTML = htmlAlbums;
    cardSeriesDiv.innerHTML = htmlSeries;
}


// const resultsPerPage = 10; // Nombre de résultats à afficher par page
// let currentPage = 0; // Page actuelle

// function loadMoreResults() {
//     const resultsContainer = document.getElementById('resultsContainer');

//     // Calcule l'indice de début et de fin pour les résultats à afficher
//     const startIndex = currentPage * resultsPerPage;
//     const endIndex = (currentPage + 1) * resultsPerPage;

//     // Récupère les résultats pour la page actuelle
//     const currentResults = tousResultats.slice(startIndex, endIndex);

//     // Affiche les résultats dans le conteneur
//     currentResults.forEach(result => {
//         const resultElement = document.createElement('div');
//         // Utilise result pour afficher les détails du résultat
//         resultElement.textContent = result.nom; // Remplace cette ligne avec la logique d'affichage de ton résultat
//         resultsContainer.appendChild(resultElement);
//     });

//     currentPage++; // Passe à la page suivante pour la prochaine fois
// }

// // Écoute l'événement de défilement de la page
// window.addEventListener('scroll', () => {
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//         // L'utilisateur a atteint le bas de la page, charge plus de résultats
//         loadMoreResults();
//     }
// });

// // Charge les premiers résultats au chargement de la page
// loadMoreResults();
