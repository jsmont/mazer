const BLOCKDEFAULT_MATERIAL = new THREE.MeshPhongMaterial({
    map: TEXTURES.map.cube,
    shininess: 0
});

function Block(type){
    this.type = type;
    this.setSpecifics();
    this.createObject();
}

Block.types = [];

Block.prototype.createObject = function(){

    this.object = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        this.getMaterial()
    );


    this.object.position.set(0,0,-0.6);

}


Block.prototype.setPosition = function(x,y,z){

    z = typeof(z) == "undefined"?  this.object.position.z : z; 

    this.object.position.set(x,y,z);

    new TWEEN.Tween(this.object.position)
        .delay(Math.random()*2000)
        .to({x: this.object.position.x, y: this.object.position.y, z: 0.5}, 2000).start();
}


Block.prototype.getObject = function(){
    return this.object;
};

Block.prototype.getMaterial = function(){
    return BLOCKDEFAULT_MATERIAL;
}

Block.prototype.setSpecifics = function(){

    var type = Block.types[this.type];
    
    if(typeof type != "undefined"){
        type.__proto__ = this.__proto__;
        this.__proto__ = type;
    }
};