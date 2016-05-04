
/************************************************/
/*				CONSTRUCTORES   				*/
/************************************************/

function Job(clase){
    this.job = clase;
    this.hit = 1;
    this.ultiHit = (this.hit*3);
    this.gold = 0;
    this.ultiPoints = 0;
    this.manoIzquierda = '';
    this.manoDerecha = '';
    this.armadura = '';
    this.casco = '';
    this.botas = '';
}

function Arm(name,damage,type,price){
    this.name = name;
    this.damage = damage;
    this.type = type;
    this.price = price;
}

/************************************************/
/*				FUNCIONES JOB					*/
/************************************************/

Job.prototype.equiparArma = function(Arm){
    this.hit += Arm.getDamage();
    
    if (Arm.getType == 'manoIzquierda'){
        this.manoIzquierda = Arm.getName();
    }else if (Arm.getType == 'manoDerecha'){
        this.manoDerecha = Arm.getName();
    }else if (Arm.getType == 'armadura'){
        this.armadura = Arm.getName();
    }else if (Arm.getType == 'casco'){
        this.casco = Arm.getName();
    }else if (Arm.getType == 'botas'){
        this.botas = Arm.getName();
    }
}

Job.prototype.venderArma = function(Arm){
    for (var x = 0; x < this.storage.length; x++){
        var tmp = this.storage[x];
        if (tmp.getName() == Arm.getName()){
            this.gold += (tmp.getPrice()/2);
            delete this.storage[x];
        }else{
            alert('Ha habido un error vendiendo '+Arm.getName()+'.<br/>Contacte con el administrador');
        }
    }
}

Job.prototype.dropearArma = function(Arm){
    for (var x = 0; x < this.storage.length; x++){
        var tmp = this.storage[x];
        if (tmp.getName() == Arm.getName()){
            delete this.storage[x];
        }else{
            alert('Ha habido un error dropeando '+Arm.getName()+'.<br/>Contacte con el administrador');
        }
    }
}
/************************************************/
/*				FUNCIONES ARM					*/
/************************************************/

/************************************************/
/*  				GETTERS	JOB					*/
/************************************************/

Job.prototype.getJob = function(){
    return this.job;
}

Job.prototype.getHit = function(){
    return this.hit;
}

Job.prototype.getGold = function(){
    return this.gold;
}

Job.prototype.getUltiPoints = function(){
    return this.ultiPoints;
}

Job.prototype.getManoIzquierda = function(){
    return this.manoIzquierda;
}

Job.prototype.getManoDerecha = function(){
    return this.manoDerecha;
}

Job.prototype.getArmadura = function(){
    return this.armadura;
}

Job.prototype.getCasco = function(){
    return this.casco;
}
Job.prototype.getBotas = function(){
    return this.botas;
}

/************************************************/
/*  				GETTERS	ARM					*/
/************************************************/

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

/************************************************/
/*					SETTERS	JOB					*/
/************************************************/

Job.prototype.setJob = function(clase){
    this.job = clase;
}

Job.prototype.setUltiHit = function(damage){
    this.ultiHit = (getHit()*3);
}

Job.prototype.setGold = function(cantidad){
    this.gold += cantidad;
}

Job.prototype.setUltiPoints = function(points){
    this.ultiPoints = points;
}

/************************************************/
/*					SETTERS	ARM					*/
/************************************************/

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

/************************************************/
/*				COMPRAR ARM					    */
/************************************************/

var tmp2 = document.getElementById('gameLocation').contentWindow;
var miOro=0;
$("#gameLocation").change(function(){
    miOro = tmp2.getOro();
});

Arm.prototype.comprarArma = function(){
    
    //var posicion = this.storage.length;
    if (this.getPrice() > miOro){
        alert('No tienes oro suficiente como para comprar este item');
    }else{
        var tipoItem = this.getType();
        switch (tipoItem){
            case 'manoIzquierda':
                tmp2.setEquipo(this,0);
                break;
            case 'manoDerecha':
                tmp2.setEquipo(this,1);
                break;
            case 'armadura':
                tmp2.setEquipo(this,2);
                break;
            case 'casco':
                tmp2.setEquipo(this,3);
                break;
            case 'armadura':
                tmp2.setEquipo(this,4);
                break;
        }
        dano = tmp2.getDamage();
        dano += this.getDamage();
        tmp2.establecerDano(dano);
        dinero = tmp2.getOro();
        dinero -= this.getPrice();
        tmp2.establecerOro(dinero);
    }
    //this.storage[posicion] = tmp;
    
}


var armas = [];
armas[0] = new Arm('Espadón', 3 , 'manoDerecha', 30);