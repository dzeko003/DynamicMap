var map = L.map('map').setView([-4.23288, 15.27802], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const coords = [[-4.23264, 15.27755], [-4.23271, 15.27811], [-4.23341, 15.27761], [-4.23189, 15.27794], [-4.23346, 15.27892], [-4.23248, 15.27799]];

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
