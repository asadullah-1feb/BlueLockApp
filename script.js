// function allowDrop(event) {
//     event.preventDefault();
// }

// function drop(event) {
//     event.preventDefault();
//     const player = event.dataTransfer.getData("text");
//     const playerElement = document.getElementById(player);
//     const teamLineup = document.getElementById("team-lineup");
//     teamLineup.appendChild(playerElement);
// }

var football_field = document.getElementById("football-field");

var field_position = football_field.getBoundingClientRect();
var field_height = football_field.offsetHeight;
var field_width = football_field.offsetWidth;


var topBound = field_position.top + field_height;
var leftBound = field_position.left + field_width;



var playerTop;
var playerLeft;
var player_position;


const playersContainer = document.getElementsByClassName("player");





var playerToChange;


var formations = document.getElementById("formation-select");


var positionVector = {
    'cf': '2,4',
    'lw': '2 / span 2,1',
    'lcf': '2, 3',
    'rcf': '2, 5',
    'rw': '2 / span 2,7',
    'lwm': '3 / span 2, 1',
    'lam' : '3 / span 2, 1 / span 2',
    'lcam': '3 / span 2, 2 / span 2',
    'cam': '3 / span 2, 4',
    'rcam': '3 / span 2, 5 / span 2',
    'ram': '3 / span 2, 6 / span 2',
    'rwm': '3 / span 2, 7',
    'lm': '5, 1',
    'lcm2': '5, 2',
    'lcm': '5, 3',
    'cm': '5, 4',
    'rcm2': '5, 6',
    'rcm': '5, 5',
    'rm': '5, 7',
    'lwb': '6 / span 2, 1',
    'ldm': '6 / span 2, 2 / span 2',
    'lcdm': '6 / span 2, 3',
    'cdm': '6 / span 2,4',
    'rcdm': '6 / span 2, 5',
    'rdm': '6 / span 2, 5 / span 2',
    'rwb': '6 / span 2, 7',
    'lb': '7 / span 2, 1',
    'lcb2': '8, 2',
    'lcb': '8,3',
    'cb': '8,4',
    'rcb':'8, 5',
    'rcb2': '8,6',
    'rb': '7 / span 2,7',
    'sw': '8 / span 2,4'
}




var formationsContainer = [
    {name:'Ubers', formation:'sw,lcb2,rcb2,cdm,lcm,rcm,rm,lm,cam,cf'},
    {name:'Bastard Munchen', formation:'rwb,rcb,lcb,lwb,cdm,cam,lwm,rwm,lcf,rcf'},
    {name:'Blue Lock Eleven', formation:'lb,lcb,rcb,rb,cm,rwm,lwm,lcam,rcam,cf'},
    {name:'Barcha', formation:'lwb,lcb,rcb,rwb,cdm,rcm,lcm,lwm,rwm,cf'},
    {name:'Manshine City', formation:'lcb2,cb,rcb2,rcm,lcm,lm,rm,lcam,rcam,cf'},
    {name:'4-1-2-1-2(N)', formation:'rb,rcb,lcb,lb,cdm,lcm2,rcm2,cam,lcf,rcf'},
    {name:'4-1-2-1-2(W)', formation:'rb,rcb,lcb,lb,cdm,lm,rm,cam,lcf,rcf'},
    {name:'5-3-2', formation:'rwb,rcb2,cb,lcb2,lwb,lcm2,cm,rcm2,lcf,rcf'},
    {name:'4-4-1-1', formation:'rb,rcb,lcb,lb,rcm,lcm,rm,lm,cam,cf'},
    {name:'4-3-3(D)', formation:'rb,rcb,lcb,lb,ldm,cm,rdm,rw,lw,cf'},
    {name:'4-2-3-1', formation:'rb,rcb,lcb,lb,lcdm,rcdm,ram,lam,cam,cf'},
    {name:'3-4-3(F)', formation:'rcb2,cb,lcb2,rcm,lcm,rm,lm,lw,rw,cf'},
    {name:'3-4-3(D)', formation:'rcb2,cb,lcb2,cdm,cam,rm,lm,lw,rw,cf'},
    {name:'4-1-4-1', formation:'rb,rcb,lcb,lb,cdm,rm,rcm,lcm,lm,cf'},
    {name:'4-3-3(H)', formation:'rb,rcb,lcb,lb,cdm,rcm2,lcm2,rw,lw,cf'},
    {name:'4-3-3(A)', formation:'rb,rcb,lcb,lb,lcm2,rcm2,cam,rw,lw,cf'},
    {name:'4-3-3(F)', formation:'rb,rcb,lcb,lb,lcm2,cm,rcm2,rw,lw,cf'},
    {name:'4-4-2', formation:'rb,rcb,lcb,lb,rcm,lcm,rm,lm,lcf,rcf'},
    {name:'4-3-2-1', formation:'rb,rcb,lcb,lb,cm,lm,rm,rcam,lcam,cf'}
]


var allSelectablePlayers = document.getElementById("all-selectable-players");


for (var k = 0; k < playerDatabase.length; k++){
    var selectablePlayerContainer = document.createElement("div");
    selectablePlayerContainer.classList.add("selectable-player-container");
    var unseletable_node = document.createElement("div");
    unseletable_node.classList.add("unselectable-cover");
    var selectable_node = document.createElement("div");
    selectable_node.classList.add("selectable-player");
    var selectable_image = document.createElement("img");
    selectable_image.src = playerDatabase[k].imageString;
    var selectable_name = document.createElement("h3");
    selectable_name.innerText = playerDatabase[k].playerName;


    selectable_node.appendChild(selectable_image);
    selectable_node.appendChild(selectable_name);
    
    selectablePlayerContainer.appendChild(unseletable_node);   
    selectablePlayerContainer.appendChild(selectable_node);
    


    allSelectablePlayers.appendChild(selectablePlayerContainer);

}


var selectablePlayers = document.querySelectorAll(".selectable-player");

selectablePlayers.forEach(selectablePlayer => {
    selectablePlayer.addEventListener("click", function (event){ changePlayer(event, selectablePlayer)}, false);
}); 

function changePlayer(event, selectablePlayer){
    playerToChange.getElementsByTagName('img')[0].src = selectablePlayer.getElementsByTagName('img')[0].src;
    selectablePlayer.parentNode.getElementsByClassName("unselectable-cover")[0].style.display = 'block';
    modal.style.display = "none";
}

var playerTop1;
var playerLeft1;

var modal = document.getElementById("myModal");

document.addEventListener("DOMContentLoaded", function () {
    const players = document.querySelectorAll(".player");

    players.forEach(player => {
        player.addEventListener("dragstart", function (event) {


            football_field = document.getElementById("football-field");
            field_position = football_field.getBoundingClientRect();
            field_height = football_field.offsetTop;
            field_width = football_field.offsetLeft;


            event.dataTransfer.setData("text", event.target.id);
            player_position = player.getBoundingClientRect();
            
            playerTop1 = player_position.top - event.y;
            playerLeft1 = player_position.left - event.x;

            playerTop = player_position.top - event.y;
            playerLeft = player_position.left - event.x;
        });
        player.addEventListener("dragend", function (event) {
            
            playerTop = player.clientHeight;
            playerLeft = player.clientWidth;
            if ((event.x < leftBound && event.x > field_position.left) && (event.y < topBound && event.y > field_position.top)){
                player.style.position = 'absolute';
                player.style.transform = 'translate(' + (event.clientX - field_width - (playerLeft / 2)) + 'px,' + (event.clientY - field_height - (playerTop / 2)) + 'px)';

            }

        });

        player.addEventListener("click", function(event){
            playerToChange = player;
            modal.style.display = 'block';
        });

    });
});


changeFormation(formations.value);

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}



// var span = document.getElementsByClassName("close")[0];

// span.onclick = function() {
//   modal.style.display = "none";
// }


window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}


function changeFormation(ind){
    var formationString = formationsContainer[ind];
    playerPositions = formationString.formation.split(",");

    for (var i=0; i < playerPositions.length; i++){
        var posLocation = positionVector[playerPositions[i]].split(',');
        var currentPlayer = playersContainer[i+1];
        currentPlayer.setAttribute("class", "");
        currentPlayer.classList.add("player");
        currentPlayer.classList.add(playerPositions[i]);
        currentPlayer.style.transform = null;
        currentPlayer.style.position = 'static';
        currentPlayer.style.setProperty('--row', posLocation[0]);
        currentPlayer.style.setProperty('--column', posLocation[1]);
    }





}




formations.addEventListener("change", (event) => {
    changeFormation(event.target.value);
});