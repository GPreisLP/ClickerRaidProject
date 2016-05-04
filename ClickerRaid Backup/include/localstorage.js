$(document).ready(function(){    
    $('#boton-guardar').click(function(){        
       
        
        var vidaactual= document.getElementById("vidaActual").innerHTML;
        var vidatotal = document.getElementById("vidaBoss").innerHTML;
        var rango = document.getElementById("RANGO").innerHTML;
        var danoactual = document.getElementById("DA").innerHTML;
        var numboss = document.getElementById("BN").innerHTML;
        
        
        
        /*Guardamos los campos en el localstorage*/
        localStorage.setItem("vidaActual", vidaactual);
        localStorage.setItem("vidaBoss", vidatotal);
        localStorage.setItem("RANGO", rango);
        localStorage.setItem("DA", danoactual);
        localStorage.setItem("BN", numboss);
        localStorage.setItem("porcentajeBarra", porcentaje);
        localStorage.setItem("porcentajeBarraUlti", ultiBalls)
        localStorage.setItem("totalDamage", damageTotal);
        localStorage.setItem("totalCriticos", criticos);
        localStorage.setItem("totalClicks", clicksTotal);
        localStorage.setItem("bossMuertosTotal", getBossMuertosTotal());
        localStorage.setItem("oroActual", oro);
        localStorage.setItem("oroObtenido", oroObtenido);
        localStorage.setItem("oroGastado", oroGastado);
        localStorage.setItem("storage", storage);
        localStorage.setItem("equipo", equipo);
  
    });   
});
$(document).ready(function(){    
    $('#boton-cargar').click(function(){        
       
        
        /*Captura de datos escrito en los inputs*/        
        array.vidaActual = localStorage.getItem("vidaActual");
        array.vidaBoss = localStorage.getItem("vidaBoss");
        array.rango = localStorage.getItem("RANGO");
        array.damage = localStorage.getItem("DA");
        var numboss = localStorage.getItem("BN");
        array.bossMuertos = (array.numboss - 1);
        array.porcentaje = localStorage.getItem("porcentajeBarra");
        array.ultiBalls = localStorage.getItem("porcentajeBarraUlti");
        increaseBarraUlti();
        array.damageTotal = localStorage.getItem("totalDamage");
        array.criticos = localStorage.getItem("totalCriticos");
        array.clicksTotal = localStorage.getItem("totalClicks");
        array.bossMuertosTotal = localStorage.getItem("bossMuertosTotal");
        array.oro = localStorage.getItem("oroActual");
        array.oroObtenido = localStorage.getItem("oroObtenido");
        array.oroGastado = localStorage.getItem("oroGastado");
        array.storage = localStorage.getItem("storage");
        equipo = localStorage.getItem("equipo");
        
        /*Cargamos los datos del local storage en los campos de la pagina, primero leeemos el elemento y hacemos un innerHTML de la variable que tenemos*/
        $("#vidaActual").html(array.vidaActual);
        $("#vidaBoss").html(array.vidaBoss);
        $("#RANGO").html(array.rango);
        $("#BN").html(array.numboss);
        $("#DA").html(array.damage);
        
        $('#imagenBoss').html(bossImagenes[array.bossMuertos]);
        cambioDeBarra();
        
    });   
});