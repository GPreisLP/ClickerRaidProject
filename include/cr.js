/*------------------------------------------------VARIABLES GLOBALES------------------------------------------------*/
var array = {};
var modoJuego = localStorage.getItem("gameMode");
var bossImagenes = ['<img src="images/boss/0051.gif"/><h2>Atroce</h2>','<img src="images/boss/0052.gif"/><h2>Night Siege</h2>',
                    '<img src="images/boss/0053.gif"/><h2>Satan Morroc</h2>','<img src="images/boss/0054.gif"/><h2>Amdarias</h2>',
                    '<img src="images/boss/0055.gif"/><h2>Baphomet</h2>','<img src="images/boss/0056.gif"/><h2>Gopinich</h2>',
                    '<img src="images/boss/0057.gif"/><h2>Detale</h2>','<img src="images/boss/0058.gif"/><h2>RSX-0806</h2>',
                    '<img src="images/boss/0059.gif"/><h2>Root of Corruption</h2>','<img src="images/boss/0060.gif"/><h2>King Poring</h2>'];
var equipo = {}; //Mano Izquierda, Mano Derecha, Armadura, Casco, Botas
var shop = {};
var storage = {};
/*------------------------------------------------FIN VARIABLES GLOBALES--------------------------------------------*/


/*------------------------------------------------FUNCIONES------------------------------------------------*/
$.getScript('./include/funciones.js','');
/*------------------------------------------------FIN FUNCIONES--------------------------------------------*/

$(document).ready(function(){
   $('#singlePlayer').click(function(){
        setSinglePlayer();
    });

});
$(window).load(function() {
    $('#preloader').fadeOut('slow');
    $('body').css({'overflow':'visible'});
});
$(document).ready(function(){

    $("#ultiButton").click(function(){
       ultimateDamage();
       if (vidaActual <= 0 && bossMuertos < 10){
            dropOro();
            dropUltiBalls();
            increaseBarraUlti();
            nextBoss();
            //SI HAS MATADO 10 BICHOS, MODIFICA LAS GLOBALES
        }
        if(bossMuertos == 10){
            dropOro();
            dropUltiBalls();
            increaseBarraUlti();
            nextRange();
        }
    });
    /*$('#attackButton').click(function(){
        attack();
    });*/
});

/*------------------------------------------------LOCAL JOBS------------------------------------------------*/
document.write('<script src="./include/localstorage.js"></script>');
/*------------------------------------------------FIN LOCAL STORAGE-----------------------------------------*/
