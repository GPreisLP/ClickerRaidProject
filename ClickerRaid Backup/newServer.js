//VARIABLES DE CONTROL DEL JUEGO
var array = {
    bossLife: 300,
    bossPorRango: 10,
    rango: 1,
    bossMuertos: 0,
    vidaBoss: 300,
    clicks: 0,
    clicksTotal: 0,
    damage: 1,
    vidaActual: 300,
    porcentaje: 100,
    criticos: 0,
    damageTotal: 0,
    bossMuertosTotal: 0,
    oro: 0,
    oroGastado: 0,
    oroObtenido: 0,
    ultiBalls: 0,
    ultis: 0,
    criticosUlti: 0,
    storageContador: 0,
    storageMax: 19,
    maxCriticValue: 50,
    startGold: 10
};
var bossImagenes = [,'<img src="images/boss/0052.gif"/><h2>Night Siege</h2>',
                    '<img src="images/boss/0053.gif"/><h2>Satan Morroc</h2>','<img src="images/boss/0054.gif"/><h2>Amdarias</h2>',
                    '<img src="images/boss/0055.gif"/><h2>Baphomet</h2>','<img src="images/boss/0056.gif"/><h2>Gopinich</h2>',
                    '<img src="images/boss/0057.gif"/><h2>Detale</h2>','<img src="images/boss/0058.gif"/><h2>RSX-0806</h2>',
                    '<img src="images/boss/0059.gif"/><h2>Root of Corruption</h2>','<img src="images/boss/0060.gif"/><h2>King Poring</h2>'];
var equipo = {
    manoI: '',
    manoD: '',
    armadura: '',
    casco: '',
    botas: ''
}; //Mano Izquierda, Mano Derecha, Armadura, Casco, Botas
var storage = {
    slot0: '0',
    slot1: '1',
    slot2: '2',
    slot3: '3',
    slot4: '',
    slot5: '',
    slot6: '',
    slot7: '',
    slot8: '',
    slot9: '',
    slot10: '',
    slot11: '',
    slot12: '',
    slot13: '',
    slot14: '',
    slot15: '',
    slot16: '',
    slot17: '',
    slot18: '',
    slot19: ''
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//SOCKET
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*{*/
var http = require('http');
var fs = require('fs');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);




router.use(express.static(__dirname));
router.use("/css", express.static(__dirname + '/css'));
router.use("/js", express.static(__dirname + '/js'));
router.use("/include", express.static(__dirname+'/include'));
router.use("/bootstrap", express.static(__dirname + '/bootstrap'));
router.use("/fonts", express.static(__dirname + '/fonts'));
router.use("/images", express.static(__dirname + '/images'));
router.use("/images/arms", express.static(__dirname + '/images/arms'));

router.get('/', function(req, res){
   res.sendfile('index.html')
});
server.listen(process.env.PORT, process.env.IP);

io.on('connection',function(socket){
    console.log(process.env.IP);
    console.log('usuario conectado');
    io.sockets.emit('datosIniciales', array, storage, shop);
    
    socket.on('sendAttack', function(){
        attack();
        io.sockets.emit('attack_recived', array);
    });
});

function attack(){
    var dmg = array.damage;
    critico();
    array.vidaActual -= array.damage;
    //SI EL DAÑO QUE LE HACEMOS ES MAYOR A 1, LLAMAMOS  A LA FUNCION MASDAMAGE
    if (array.damage > 1){
        masDamage(array.damage);
        array.damage = dmg;
    //SI EL DAÑO QUE LE HACEMOS ES 1, HACE LA FUNCION NORMAL DE RESTA DE VIDA
    }else{
        damageDe1();
    }
    //SI LA VIDA DEL BOSS ACTUAL ES 0, CAMBIA DE BOSS Y CARGA OTRA BARRA DE VIDA NUEVA
    if (array.vidaActual <= 0 && array.bossMuertos < 10){
        dropOro();
        dropUltiBalls();
        nextBoss();
        //SI HAS MATADO 10 BICHOS, MODIFICA LAS GLOBALES
    }
    if(array.bossMuertos == 10){
        dropOro();
        dropUltiBalls();
        nextRange();
    }
}
function critico(){
    var random = Math.floor(Math.random() * array.maxCriticValue) + 1  ;
    //SI RANDOM ES 7, DAÑO * 2 (DAÑO CRITICO)
    if (random == 7){
        array.damage *= 2;
        array.criticos ++;
    }
}
function ultimateDamage(){
    if (array.ultiBalls >= 100){
        array.ultiBalls = 100;
        var dmg = array.damage;
        array.damage *= 5;
        var random = Math.floor(Math.random() * 47) + 1  ;
        //SI RANDOM ES 7, DAÑO * 2 (DAÑO CRITICO)
        if (random == 7){
            array.damage *= 2;
            array.criticosUlti ++;
        }
        array.vidaActual -= array.damage;
        masDamage(array.damage);
        indicarVidaBoss();
        array.damage = dmg;
        array.ultiBalls = 0;
        array.ultis++;
        indicarBarraUlti();
    }
}
function masDamage(valor){
    for(var x = 0; x < valor; x++){
        array.clicks++;
    }
    
    array.clicksTotal++;
    array.damageTotal += valor;
    
    array.porcentaje -= (100/array.vidaBoss)*valor;
    
    
    if(array.porcentaje <= 1){
        array.porcentaje = 1;
    }
}
function nextBoss(){
    array.vidaActual = array.vidaBoss;
    array.bossMuertos++;
    array.bossMuertosTotal++;
    array.clicks = 0;
    array.porcentaje = 100;
}
function nextRange(){
    array.rango += 1;
    array.bossMuertos = 0;
    array.bossMuertosTotal++;
    array.clicks=0;
    
    array.vidaBoss = array.bossLife*array.rango;
    array.vidaActual = array.vidaBoss;
    array.porcentaje = 100;
}
function damageDe1(){
    array.clicks++;
    array.clicksTotal++;
    array.damageTotal ++;
    
    array.porcentaje = array.porcentaje - (array.damage * (100/array.vidaBoss));
}
function dropOro(){
    if (array.rango>1){
        array.oro += Math.floor(Math.random() * (array.startGold*array.rango)) + ((array.rango-1)*array.startGold);
    }else{
        array.oro += Math.floor(Math.random() * (array.startGold*array.rango)) + 1  ;
    }
    array.oroObtenido += array.oro;
}
function dropUltiBalls(){
    array.ultiBalls += Math.floor(Math.random() * 100) +1;
}

/******************************************************************************/
/*  				     ARMAS      Y       ARMADURAS                         */
/******************************************************************************/


/************************************************/
/*				CONSTRUCTORES   				*/
/************************************************/

function Arm(name,damage,type,price,imageURL,desc,equiped){
    this.name = name;
    this.damage = damage;
    this.type = type;
    this.price = price;
    this.image = imageURL;
    this.desc = desc;
    this.equiped = equiped;
}

function Armor (name,type,price,imageURL,desc,equiped,goldUpgrade, criticUpgrade, damageUpgrade){
    this.name = name;
    this.type = type;
    this.price = price;
    var image = new Image();
    image.src = imageURL;
    this.image = image;
    this.desc = desc;
    this.equiped = equiped;
    
    this.goldUpgrade = damage;
    this.criticUpgrade = damage;
    this.damageUpgrade = damage;
}

/************************************************/
/*			GETTERS	ARMA Y ARMADURA				*/
/************************************************/

/*--------------------------ARMA--------------------------*/
Arm.prototype.getName = function(){
    return this.name;
}
Arm.prototype.getDamage = function(){
    return this.damage;
}
Arm.prototype.getType = function(){
    return this.type;
}
Arm.prototype.getPrice = function(){
    return this.price;
}
Arm.prototype.getImg = function(){
    return this.image;
}
Arm.prototype.getDesc = function(){
    return this.desc;
}
Arm.prototype.getEquiped = function(){
    return this.equiped;
}
/*------------------------ARMADURA------------------------*/
Armor.prototype.getName = function(){
    return this.name;
}
Armor.prototype.getDamage = function(){
    return this.damage;
}
Armor.prototype.getType = function(){
    return this.type;
}
Armor.prototype.getPrice = function(){
    return this.price;
}
Armor.prototype.getImg = function(){
    return this.image;
}
Armor.prototype.getDesc = function(){
    return this.desc;
}
Armor.prototype.getEquiped = function(){
    return this.equiped;
}
Armor.prototype.getGoldUpgrade = function(){
    return this.goldUpgrade;
}
Armor.prototype.getCriticUpgrade = function(){
    return this.criticUpgrade;
}
Armor.prototype.getDamageUpgrade = function(){
    return this.damageUpgrade;
}
/************************************************/
/*				SETTERS	ARMA					*/
/************************************************/

/*--------------------------ARMA--------------------------*/

Arm.prototype.setName = function(name){
    this.name = name;
}
Arm.prototype.setDamage = function(damage){
    this.damage = damage;
}
Arm.prototype.setType = function(type){
    this.type = type;
}
Arm.prototype.setPrice = function(price){
    this.price = price;
}
Arm.prototype.setImg = function(img){
    this.image = img;
}
Arm.prototype.setDesc = function(desc){
    this.desc = desc;
}
Arm.prototype.setEquiped = function(equiped){
    this.equiped = equiped;
}

/*------------------------ARMADURA------------------------*/
Armor.prototype.setName = function(name){
    this.name = name;
}
Armor.prototype.setType = function(type){
    this.type = type;
}
Armor.prototype.setPrice = function(price){
    this.price = price;
}
Armor.prototype.setImg = function(img){
    this.image = img;
}
Armor.prototype.setDesc = function(desc){
    this.desc = desc;
}
Armor.prototype.setEquiped = function(equiped){
    this.equiped = equiped;
}
Armor.prototype.setGoldUpgrade = function(goldUpgrade){
    this.goldUpgrade = goldUpgrade;
}
Armor.prototype.setCriticUpgrade = function(criticUpgrade){
    this.criticUpgrade = criticUpgrade;
}
Armor.prototype.setDamageUpgrade = function(damageUpgrade){
    this.damageUpgrade = damageUpgrade;
}

/************************************************/
/*  				FUNCIONES				    */
/************************************************/
/*function setEquipo(item, posicion){
    item.setEquiped('Si');
    
}*/
function setEquipoStorage(item){
    if(array.storageContador >= array.storageMax){
        alerta("Intenvario lleno, no puede comprar más objetos");
    }else{
        slot = 'slot' + array.storageContador;
        storage.slot = item;
        array.storageContador++;
    }
}

function getEquipo(){
    return equipo;
}
function establecerOro(dinero){
    oro = dinero;
    if(oro>oroObtenido){
        
        oroObtenido += oro;
    }
}
function getArmas(){
    return armas;
}
function getStorage(){
    return storage;
}
function getStorageContador(){
    return storageContador;
}
function getStorageMax(){
    return storageMax;
}
/************************************************/
/*	         EQUIPAR ARMA Y ARMADURA			*/
/************************************************/

/************************************************/
/*               EQUIPAR ARMA       			*/
/************************************************/
Arm.prototype.equiparArma = function(item, tipoArma){
    
    equipo.tipoArma = item;
    
    
    if (tipoArma == "manoI"){
        if(equipo.manoD != null){
            array.damage += item.getDamage();
            array.damage += equipo.manoD.getDamage();
        }else{
            array.damage += item.getDamage();
        }
    }else if (tipoArma == "manoD"){
        if(equipo.manoI != null){
            array.damage += item.getDamage();
            array.damage += equipo.manoI.getDamage();
        }else{
            array.damage += item.getDamage();
        }
    }
    
    alert(item.getDamage() + " equipado");
}

Armor.prototype.equiparArmadura = function(posicionItem){
    setEquipo(this, posicionItem);
    if (this.goldUpgrade != "-"){
        startGold *= this.goldUpgrade;
    }else if (this.criticUpgrade != "-"){
        maxCriticValue /= this.maxCriticValue;
    }else if (this.damageUpgrade != "-"){
        damage *= this.damageUpgrade;
        establecerDamage(damage);
        $("#DA").html(damage);
    }
    alert("Equipado");
    
}
/************************************************/
/*				COMPRAR ARM					    */
/************************************************/
/*Arm.prototype.comprarArma = function(){
    var posicionItem;
    //var posicion = this.storage.length;
    if (this.getPrice() > array.oro){
        alert('No tienes oro suficiente como para comprar este item');
    }else{
        var x = confirm("Esta usted seguro?");
        if(x == true){
            this.setEquipoStorage(this);
            var tipoItem = this.getType();
            switch (tipoItem){
                case 'manoIzquierda':
                    posicionItem = 'manoI';
                break;
                case 'manoDerecha':
                    posicionItem = 'manoD';
                break;
            }
            var dinero = getOro();
            dinero -= this.getPrice();
            oroGastado +=this.getPrice();
            
            establecerOro(dinero);
            
            alert("Objeto comprado");
            
            var y = confirm("Desea equipar este item?");
            if(y == true){
                switch (tipoItem){
                case 'manoIzquierda':
                    this.equiparArma(posicionItem);
                break;
                case 'manoDerecha':
                    this.equiparArma(posicionItem);
                break;
            }
                
            }else{
                alert("Equipo enviado al inventario");
            }
            
        }else{
            alert("Compra cancelada");
        }
    }
}*/


Arm.comprarArma = function(){
    if(this.price > array.oro){
        alert('No tienes oro suficiente como para comprar este item');
    }else{
        var x = confirm("¿Esta usted seguro que quiere comprar " + this.name + "?");
        if(x == true){
            this.setEquipoStorage(this);
            array.oro -= this.price;
            array.oroGastado += this.price;
            alert("Has comprado: " + this.name);
            var y = confirm("Desea equipar este item?");
            if (y == true){
                switch(this.type){
                    case 'manoI':
                        this.equiparArma(this, 'manoI');
                        break;
                    case 'manoD':
                        this.equiparArma(this, 'manoD');
                        break;
                }
            }else{
                alert(this.name + " enviado al inventario");
            }
        }else{
            alert("Compra de " + this.name + " cancelada.");
        }
    }
}

/************************************************/
/*				COMPRAR ARMADURA			    */
/************************************************/
Armor.prototype.comprarArmadura = function(){
    var posicionItem;
    //var posicion = this.storage.length;
    if (this.getPrice() > oro){
        alert('No tienes oro suficiente como para comprar este item');
    }else{
        var x = confirm("Esta usted seguro?");
        if(x == true){
            setEquipoStorage(this);
            var tipoItem = this.getType();
            switch (tipoItem){
                case 'armadura':
                    posicionItem = 2;
                break;
                case 'casco':
                    posicionItem = 3;
                break;
                case 'botas':
                    posicionItem = 4;
                break;
            }
            var dinero = getOro();
            dinero -= this.getPrice();
            oroGastado +=this.getPrice();
            
            establecerOro(dinero);
            
            alert("Objeto comprado");
            
            var y = confirm("Desea equipar este item?");
            if(y == true){
                switch (tipoItem){
                case 'armadura':
                    this.equiparArmadura(posicionItem);
                break;
                case 'casco':
                    this.equiparArmadura(posicionItem);
                break;
                case 'botas':
                    this.equiparArmadura(posicionItem);
                break;
            }
                
            }else{
                alert("Equipo enviado al inventario");
            }
            
        }else{
            alert("Compra cancelada");
        }
    }
}
var shop = {
    item1: new Arm('Espadón', 3 , 'manoD', 30, 'https://clickerraid-multiplayer-gpreislp.c9users.io/images/arms/espadon.png', '+3 DMG', 'No'),
    item2: new Arm('Pico', 2 , 'manoI', 20, 'https://clickerraid-multiplayer-gpreislp.c9users.io/images/arms/pico.png', '+2 DMG', 'No'),
}
/*armas[2] = new Armor('FlyHead', 'casco', 100, 'https://clickerraid-multiplayer-gpreislp.c9users.io/images/arms/flyHead.png', 'Daño al equipar equipo x2 ', 'No', "-", "-", 2);*/