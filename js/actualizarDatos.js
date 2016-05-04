$(document).ready(function(){
    $("#estadisticas").click(function(){
        
        $("#damageActual").empty();
        $("#damageActual").html(getDamage());
    
        $("#totalDamage").empty();
        $("#totalDamage").html(getDamageTotal());
        
        $("#totalBosses").empty();
        $("#totalBosses").html(getBossMuertosTotal());
        
        $("#totalCriticos").empty();
        $("#totalCriticos").html(getCriticos());
        
        $("#totalClicks").empty();
        $("#totalClicks").html(getClicks());
        
        $("#totalOro").empty();
        $("#totalOro").html(getOro());
        
        $("#totalOroObtenido").empty();
        $("#totalOroObtenido").html(getOroObtenido());
        
        $("#totalOroGastado").empty();
        $("#totalOroGastado").html(getOroGastado());
        
        $("#totalUltis").empty();
        $("#totalUltis").html(getUltis());
        
        $("#totalCriticosUlti").empty();
        $("#totalCriticosUlti").html(getCriticosUlti());
        
        $('#modoDeJuego').empty();
        $('#modoDeJuego').html(getModeGame());
    });
    $("#inventario").click(function(){
        $("#capacidadStorage").html((getStorageMax()+1));
        var x = getStorageContador();
        inventario = getStorage();
        for (var y = 0; y < x; y++){
            var name = inventario[y].getName();
            var desc = inventario[y].getDesc();
            var img = inventario[y].getImg();
            $("#inventario"+(y+1)+"-nombre").html(name);
            $("#inventario"+(y+1)+"-desc").html(desc);
            $("#inventario"+(y+1)+"-img").html(img);
        }
    });
   
   $("#equipacion").click(function(){
        var x = getStorageContador();
        for (var y = 0; y < x; y++){
            var name = inventario[y].getName();
            var desc = inventario[y].getDesc();
            var img = inventario[y].getImg();
            var comprobar = inventario[y].getEquiped();
            if(comprobar == 'Si'){
                var tipoItem = inventario[y].getType();
                switch (tipoItem){
                    case 'manoIzquierda':
                        $("#izquierda-nombre").html(name);
                        $("#izquierda-desc").html(desc);
                        $("#izquierda-img").html(img);
                    break;
                    case 'manoDerecha':
                        $("#derecha-nombre").html(name);
                        $("#derecha-desc").html(desc);
                        $("#derecha-img").html(img);
                    break;
                    case 'armadura':
                        $("#armadura-nombre").html(name);
                        $("#armadura-desc").html(desc);
                        $("#armadura-img").html(img);
                    break;
                    case 'casco':
                        $("#casco-nombre").html(name);
                        $("#casco-desc").html(desc);
                        $("#casco-img").html(img);
                    break;
                    case 'botas':
                        $("#botas-nombre").html(name);
                        $("#botas-desc").html(desc);
                        $("#botas-img").html(img);
                    break;
                }
            }
        }
        
    });
    $('#shop').click(function(){
	   $('#item1Name').html(shop['item1'].name);
	   $('#item1Damage').html(shop['item1'].damage);
	   
	   $('#item1Image').attr('src', shop['item1'].image);
	   $('#item1Click').attr('onclick', shop['item1'].comprarArma());
	});
});
