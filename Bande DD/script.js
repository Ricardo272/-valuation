// Transformation des Map en tableaux
var albumsArray = Array.from(albums.values())
var seriesArray = Array.from(series.values())
var auteursArray = Array.from(auteurs.values())



document.getElementById('rechercher').addEventListener('click', function () {
    var termeRecherche = document.getElementById('barreDeRecherche').value.toLowerCase();

    if (termeRecherche.trim() === '') {
        afficherMessageErreur();
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

function afficherMessageErreur() {
    var cardDiv = document.getElementById('card');
    cardDiv.innerHTML = `

    <h2 id="titreBD">Titre de la Bande Dessinée</h2>

    <p id="nomAuteur">Auteur: Nom de l'auteur</p>

    <p id="prixAlbum">Prix: XX.XX EUR</p>

    <img id="couvertureBD" src="assets/albums/Arkezone-01-Le dôme.jpg" alt="Couverture de la Bande Dessinée">

    <p id="descriptionAlbum">Description de la bande dessinée...</p> 
    ` ;
}



function afficherResultats(resultatsAuteurs, resultatsAlbums, resultatsSeries) {
    var cardDiv = document.getElementById('card');
    cardDiv.innerHTML = ''; // Efface le contenu précédent de la div card

    // Fusion de tous les résultats en un seul tableau
    var tousResultats = [...resultatsAuteurs, ...resultatsAlbums, ...resultatsSeries];

    // Parcours de tous les résultats (auteurs, albums et séries)
    tousResultats.forEach(function (resultat) {
        var div = document.createElement('div');
        if (resultat.nom) {
            // Résultat est un auteur
            div.innerHTML = `

                <h2>Auteur: ${resultat.nom}</h2>

            `;
        } else if (resultat.titre) {
            // Résultat est un album
            div.innerHTML = `

                <h2 id="titreBD">${resultat.titre}</h2>

                <p id="nomAuteur">Auteur: ${resultat.auteur}</p>

                <p id="prixAlbum">Prix: ${resultat.prix} EUR</p>

                <img src="${resultat.image}.png" alt="Couverture de la Bande Dessinée">

            `;
        } else if (resultat.nom) {
            // Résultat est une série
            div.innerHTML = `

                <h2>Série: ${resultat.nom}</h2>
                
            `;
        }
        cardDiv.appendChild(div);
    });
}
