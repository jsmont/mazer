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

    this.direction = new THREE.Vector3(-1,0,0);
    this.locks = {
        move: false,
        rotate: false,
    };

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
    var  light = new THREE.PointLight(0xffffff, i, 2);
    light.position.set(x, y, z);
    this.add(light);

    return light;
}

Player.prototype.getObject = function(){
    return this.object;
}

Player.prototype.addSprite = function(){
	for(var i = 0; i < particleOpts.count; i++ ) {
        var particle = new Particle(i * particleOpts.ttl/particleOpts.count );
        this.add(particle.getObject());
    }
}

Player.prototype.setUpCamera = function(camera){

    this.add(camera);
    camera.position.set(2,0,1.5);
    camera.lookAt(new THREE.Vector3(0,0,0));
    camera.up.set(0,0,1);

}

Player.prototype.forward = function(step){
    if(!this.locks.move){
        this.locks.move = true;
        new TWEEN.Tween(this)
            .to({}, 500)
            .onComplete(this.unlockMove)
            .start();
        new TWEEN.Tween(this.object.position)
            .delay(0)
            .to({
                x: this.object.position.x + this.direction.x*step,
                y: this.object.position.y + this.direction.y*step,
                z: this.object.position.z
            }, 500)
            .start();
    }
}

Player.prototype.unlockMove = function(){
    this.locks.move = false;
}

Player.prototype.left = function(){

    if(!this.locks.rotate){
        this.locks.rotate = true;

        new TWEEN.Tween(this)
            .to({}, 500)
            .onComplete(this.unlockRotate)
            .start();
        new TWEEN.Tween(this.object.rotation)
            .delay(0)
            .to({
                x : this.object.rotation.x,
                y : this.object.rotation.y,
                z : this.object.rotation.z + Math.PI/2
            }, 500)
            .start();

        this.direction.z = this.direction.x;
        this.direction.x = -this.direction.y;
        this.direction.y = this.direction.z;
        this.direction.z = 0;
    }    
}
Player.prototype.right= function(){
    if(!this.locks.rotate){
        this.locks.rotate = true;

        new TWEEN.Tween(this)
            .to({}, 500)
            .onComplete(this.unlockRotate)
            .start();
        new TWEEN.Tween(this.object.rotation)
            .delay(0)
            .to({
                x : this.object.rotation.x,
                y : this.object.rotation.y,
                z : this.object.rotation.z - Math.PI/2
            }, 500)
            .start();

        this.direction.z = this.direction.x;
        this.direction.x = this.direction.y;
        this.direction.y = -this.direction.z;
        this.direction.z = 0;
    }
}

Player.prototype.unlockRotate = function(){
    this.locks.rotate= false;
}


