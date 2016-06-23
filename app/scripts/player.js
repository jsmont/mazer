function Player(camera){
    
    this.createObject();
    this.addSprite();
    this.addLights();
    this.setUpCamera(camera);

}

Player.prototype.createObject = function(){
    this.object = new THREE.Object3D();
    this.object.position.set(
        GAME.map.meta.start.x,
        GAME.map.meta.start.y,
        GAME.map.meta.start.z
    );        

}

Player.prototype.add = function(o){
    this.object.add(o)
}

Player.prototype.addLights = function(){
    this.lights = {};
    this.lights.inner = this.addPointLight(0,0,0)
    this.lights.hover = this.addPointLight(0,0,1.5,0.5);
}

Player.prototype.addPointLight = function(x, y, z, i){
    i = typeof(i) == "undefined"? 1:  i;
    var  light = new THREE.PointLight(0xffffff, i, 3);
    light.position.set(x, y, z);
    this.add(light);
    return light;
}

Player.prototype.getObject = function(){
    return this.object;
}

Player.prototype.addSprite = function(){
	for(var i = 0; i < particleOpts.count; i++ ) {
        var particle = new Particle(i * particleOpts.ttl/particleOpts.count);
        this.add(particle.getObject());
    }
}

Player.prototype.setUpCamera = function(camera){

    this.add(camera);
    camera.position.set(2,0,1.5);
    camera.lookAt(new THREE.Vector3(0,0,0));
    camera.up.set(0,0,1);

}
