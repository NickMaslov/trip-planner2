const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker.js");

mapboxgl.accessToken = 'pk.eyJ1IjoidGxhaTExMjIiLCJhIjoiY2pnd2MwaGxoMXJwdDJxcnRsbnQxcWJrcCJ9.t8g4oB30qLJysdNnnk1QNw';

const fullstackCoords = [-74.009, 40.705] // NY
// const fullstackCoords = [-87.6320523, 41.8881084] // CHI

const map = new mapboxgl.Map({
  container: "map",
  center: fullstackCoords, // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
});

const marker = buildMarker("activities", fullstackCoords);
marker.addTo(map);



const selectH = document.getElementById(`hotels-choices`);
const selectR = document.getElementById(`restaurants-choices`);
const selectA = document.getElementById(`activities-choices`);
fetch('/api/attractions')
  .then(result => result.json())
  .then(data => {
    const { hotels, restaurants, activities } = data;
    console.log('**', hotels);
    for (var i in hotels) {
      var optionH = document.createElement('option')
      optionH.text = hotels[i].name;
      selectH.add(optionH);
    }
    for (var i in restaurants) {
      var optionR = document.createElement('option')
      optionR.text = restaurants[i].name;
      selectR.add(optionR);
    }
    for (var i in activities) {
      var optionA = document.createElement('option')
      optionA.text = activities[i].name;
      selectA.add(optionA);
    }

  })
  .catch(console.error)



// Get the select dom element

document.getElementById('hotels-add').addEventListener('click', () => {
  var node = document.createElement("LI");
  var textnode = document.createTextNode(selectH.options[selectH.selectedIndex].text);
  node.appendChild(textnode);
 document.getElementById(`hotels-list`).appendChild(node);
})

document.getElementById('restaurants-add').addEventListener('click', () => {
  var node = document.createElement("LI");
  var textnode = document.createTextNode(selectR.options[selectR.selectedIndex].text);
  node.appendChild(textnode);
 document.getElementById(`restaurants-list`).appendChild(node);
})

document.getElementById('activities-add').addEventListener('click', () => {
  var node = document.createElement("LI");
  var textnode = document.createTextNode(selectA.options[selectA.selectedIndex].text);
  node.appendChild(textnode);
 document.getElementById(`activities-list`).appendChild(node);
})

// const todoItems = ["Buy Milk", "Learn JavaScript", "Plan a Trip"];

// todoItems.forEach(function(item) {
//   const button = document.createElement("button");
//   document.body.append(button);
//   button.onclick = function() {
//     console.log(item)
//   }
// })
