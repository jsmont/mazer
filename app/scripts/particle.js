function Particle(delay) {
    this.SPRITE_MATERIAL =  new THREE.SpriteMaterial( {
	    map: new THREE.CanvasTexture( this.generateSprite() ),
	    blending: THREE.AdditiveBlending
    });

    this.delay = delay !== undefined ? delay : 0;
    this.object = new THREE.Sprite(this.SPRITE_MATERIAL);
    this.init();

}

Particle.prototype.getObject = function(){
    return this.object;
}

Particle.prototype.generateSprite = function() {
    var canvas = document.createElement( 'canvas' );
    canvas.width = 16;
    canvas.height = 16;
    var context = canvas.getContext( '2d' );
    var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
    gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
    gradient.addColorStop( 0.2, 'rgba(0,255,255,1)' );
    gradient.addColorStop( 0.4, 'rgba(0,0,64,1)' );
    gradient.addColorStop( 1, 'rgba(0,0,0,1)' );
    context.fillStyle = gradient;
    context.fillRect( 0, 0, canvas.width, canvas.height );
    return canvas;
}


Particle.prototype.init = function(delay){
    this.object.position.set( 0, 0, 0 );
    this.object.scale.x = this.object.scale.y = particleOpts.scale.initial;
    this.addEffects();    
}

Particle.prototype.addEffects = function(){
    
    var theta = 2*Math.PI*Math.random();
    var alpha = Math.PI*Math.random();
    
    new TWEEN.Tween(this)
        .delay( this.delay )
        .to( {}, particleOpts.ttl )
        .onComplete( this.init )
        .start();
    new TWEEN.Tween( this.object.position )
        .delay( this.delay )
        .to( { 
            x: particleOpts.radius * Math.sin(theta)* Math.cos(alpha), 
            y: particleOpts.radius * Math.sin(theta)* Math.sin(alpha), 
            z: particleOpts.radius * Math.cos(theta), 
        }, particleOpts.ttl)
        .start();
    new TWEEN.Tween( this.object.scale )
        .delay( this.delay )
        .to( { x: particleOpts.scale.final, y: particleOpts.scale.final }, particleOpts.ttl )
        .start();

}
