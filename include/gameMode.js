
$.getScript('../cr.js','');

function getModeGame(){
    return modoJuego;
}

function setSinglePlayer(){
    modoJuego = 'Single Player';
}

$(document).ready(function(){
    $('#button1').click(function(){
        setSinglePlayer();
    });
   
    
});