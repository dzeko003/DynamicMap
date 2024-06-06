// Initialiser la carte sans vue prédéfinie
var map = L.map('map');

// Définir l'icône rouge pour la position de l'utilisateur
var userIcon = L.icon({
    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png', // Assurez-vous de changer l'URL pour votre propre icône rouge
    // shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
    iconSize: [38, 95],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76]
});

// Fonction pour gérer la localisation réussie
function onLocationFound(e) {
    var radius = e.accuracy / 2;

    // Centrer la carte sur la position de l'utilisateur
    map.setView(e.latlng, 13);

    // Ajouter un marqueur pour la position de l'utilisateur
    var userMarker = L.marker(e.latlng, { icon: userIcon }).addTo(map).bindPopup("Vous êtes ici").openPopup();

    // Ajouter un cercle autour de la position de l'utilisateur
    L.circle(e.latlng, radius).addTo(map);

    // Ajouter les marqueurs des appartements
    addApartmentMarkers();
}

// Fonction pour gérer les erreurs de localisation
function onLocationError(e) {
    alert(e.message);
}

// Ajouter les marqueurs des appartements
function addApartmentMarkers() {
    const coords = [[-4.23264, 15.24955], [-4.23271, 15.37811], [-4.23341, 15.27961], [-4.23189, 15.29994], [-4.23346, 15.29992], [-4.23248, 15.29799]];

    // rent
    const rent = ["850 $", "150 $", "855 $", "450 $", "700 $", "300 $"];

    // areas
    const areas = ["80 m2", "50 m2", "35 m2", "60 m2", "70 m2", "25 m2"];

    // rooms
    const rooms = ["4", "2", "1", "3", "4", "1"];

    // images
    const images = ["img/appartement-1.jpg", "img/appartement-2.jpg", "img/appartement-3.jpg", "img/appartement-4.jpg", "img/appartement-5.jpg", "img/appartement-6.jpg"];

    var apart1 = document.querySelector('#appart1');
    var apart2 = document.querySelector('#appart2');
    var apart3 = document.querySelector('#appart3');
    var apart4 = document.querySelector('#appart4');
    var apart5 = document.querySelector('#appart5');
    var apart6 = document.querySelector('#appart6');

    var aparts = [apart1, apart2, apart3, apart4, apart5, apart6];

    for (let i = 0; i < coords.length; i++) {

        // popup
        var popup = L.popup({
            closeOnClick: true
        }).setContent("<h4> Area: " + areas[i] + "<br> Rooms: " + rooms[i] + "</h4><img src='" + images[i] + "' style='height: 100px;' />");

        // marker
        var marker = L.marker(coords[i]).addTo(map).bindPopup(popup);

        // tooltip
        var tooltip = L.tooltip({
            permanent: true
        }).setContent(rent[i]);

        marker.bindTooltip(tooltip);

        // zoom in fly to
        aparts[i].addEventListener("mouseover", () => {
            map.flyTo(coords[i], 18);
        });
    }
}

// Demander la géolocalisation de l'utilisateur
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

// Définir les tuiles de la carte
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Lancer la localisation de l'utilisateur
map.locate({setView: true, maxZoom: 16});
