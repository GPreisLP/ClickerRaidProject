function setDamage(){
    $("#damageActual").html(damage);
}

function setDamageTotal(){
    $("#totalDamage").html(damageTotal);
}

function setTotalBoss(){
    $("#totalBosses").html(bossMuertosTotal);
}

function setCriticos(){
    $("#totalCriticos").html(criticos);
}

function setClicks(){
    $("#totalClicks").html(clicks);
}

$(document).ready(function(){    
    $('#estadisticas').click(function(){        
        setDamage();
        setDamageTotal();
        setTotalBoss();
        setCriticos();
        setClicks();
    });   
});