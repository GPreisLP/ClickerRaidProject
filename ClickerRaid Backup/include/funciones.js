function barraBoss(){
    $("#vidaDelBoss").css('width','100%');
    $("#vidaDelBoss").removeClass('progress-bar-danger').addClass('progress-bar-success');
}
function indicarVidaBoss(){
    if(array.vidaActual>0){
        $('#vidaActual').html(array.vidaActual);
    }else{
        $('#vidaActual').html(array.vidaBoss);
    }
    $('#vidaBoss').html(array.vidaBoss);
}
function indicarBarraUlti(){
    $("#barraUlti").css('width','0%');
}
function increaseBarraUlti(){
    if(array.ultiBalls >= 100){
        $("#barraUlti").css('width','100%');
    }else{
        $("#barraUlti").css('width',array.ultiBalls+'%');    
    }
    
}
function cambioDeBarra(){
    $("#vidaDelBoss").css('width',array.porcentaje+'%');
    if (array.porcentaje <= 30){
        $("#vidaDelBoss").removeClass('progress-bar-success').addClass('progress-bar-danger');
    }else{
        $("#vidaDelBoss").removeClass('progress-bar-danger').addClass('progress-bar-success');
    }
}
/*------------------------------------------------GETTERS--------------------------------------------*/
function getDamage(){
    return array.damage;
}
function getDamageTotal(){
    return array.damageTotal;
}
function getBossMuertosTotal(){
    return array.bossMuertosTotal;
}
function getCriticos(){
    return array.criticos;
}
function getClicks(){
    return array.clicksTotal;
}
function getOro(){
    return array.oro;
}
function getOroObtenido(){
    return array.oroObtenido;   
}
function getOroGastado(){
    return array.oroGastado;
}
function getUltis(){
    return array.ultis;
}
function getCriticosUlti(){
    return array.criticosUlti;
}
function getUltiBalls(){
    return array.ultiBalls;
}
function getModeGame(){
    return array.modoJuego;
}