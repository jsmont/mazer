$(document).ready(init);

const WALL = 1;
const START = 2;
var map = [
    [0,1,1,1,1],
    [0,0,0,0,1],
    [1,0,1,0,1],
    [1,0,1,0,1],
    [1,1,1,2,1]
];


var particleOpts = {
    count: 50,
    ttl: 3000,
    radius: 0.25,
    scale: {
        initial: 0.5,
        final: 0.05
    }
};

var GAME = {
    camera: null,
    scene: null,
    clock: null,
    renderer: null,
    player: null,
    map: null
};

var TEXTURES = {
    map: {
        cube: THREE.ImageUtils.loadTexture("textures/map-cube.jpg"),
        floor: THREE.ImageUtils.loadTexture("textures/map-cube.jpg")
    }
}

function init(){
    initGL();
    initMap();
    createPlayer();
    animate();
}

function initGL(){
    GAME.scene = new THREE.Scene();
    
    GAME.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    GAME.camera.position.set(4,4,4);
    GAME.camera.up.set(0,0,1);
    GAME.camera.lookAt(new THREE.Vector3(0,0,0));

    GAME.clock = new THREE.Clock(true);

    GAME.renderer = new THREE.WebGLRenderer();
    GAME.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(GAME.renderer.domElement); 
}

function initMap(){

    GAME.map = new THREE.Object3D();
    GAME.map.meta = {
        width: map.length,
        height: map[0].length
    };
    GAME.scene.add(GAME.map);

    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(GAME.map.meta.width*100, GAME.map.meta.height*100),
        new THREE.MeshPhongMaterial({
            map: TEXTURES.map.floor
        })
    );

    plane.up.set(0,0,1);
    plane.position.set(0,0,0);
    GAME.map.add(plane);

    addWalls();
}

function addWalls(){
    for(var i = 0; i < map.length; ++i){
        var row = map[i];
        for(var j = 0; j < row.length; ++j){
            var tile = row[j];

            if(tile == WALL){
                addWall(i,j);
            } else if(tile == START){
                GAME.map.meta.start = new THREE.Vector3(
                    i - GAME.map.meta.width/2 + 0.5,
                    j - GAME.map.meta.height/2 + 0.5,
                    0.5
                )
            }
        }
    }
}

function addWall(i,j){
    var cube = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshPhongMaterial({
            map: TEXTURES.map.cube
        })
    );

    cube.position.set(
        i - GAME.map.meta.width/2 + 0.5,
        j - GAME.map.meta.height/2 + 0.5,
        -0.6
    );

    GAME.map.add(cube);

    new TWEEN.Tween(cube.position)
        .delay(Math.random()*2000)
        .to({x: cube.position.x, y: cube.position.y, z: 0.5}, 3000).start();
}

function createPlayer(){
    GAME.player = new THREE.Object3D();

    GAME.player.position.set(
        GAME.map.meta.start.x,
        GAME.map.meta.start.y,
        GAME.map.meta.start.z
    );        
    GAME.map.add(GAME.player);

	var material = new THREE.SpriteMaterial( {
		map: new THREE.CanvasTexture( generateSprite() ),
		blending: THREE.AdditiveBlending
	} );

    var innerLight = new THREE.PointLight(0xffffff, 1, 3);
    innerLight.position.set(0,0,0);
    GAME.player.add(innerLight);


    var hoverLight = new THREE.PointLight(0xffffff, 0.5, 3);
    hoverLight.position.set(0,0,1.5);
    GAME.player.add(hoverLight);


	for ( var i = 0; i < particleOpts.count; i++ ) {
		particle = new THREE.Sprite( material );
		initParticle( particle, i * particleOpts.ttl/particleOpts.count );
        GAME.player.add( particle );
	}

    GAME.player.add(GAME.camera);
    GAME.camera.position.set(2,0,1.5);
    GAME.camera.lookAt(new THREE.Vector3(0,0,0));
    GAME.camera.up.set(0,0,1);
}

function generateSprite() {
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

function initParticle( particle, delay ) {
    particle = this instanceof THREE.Sprite ? this : particle;
    delay = delay !== undefined ? delay : 0;
    
    particle.position.set( 0, 0, 0 );
    particle.scale.x = particle.scale.y = particleOpts.scale.initial;

    var theta = Math.random()*2*Math.PI;
    var alpha = Math.random()*Math.PI;

    new TWEEN.Tween( particle )
        .delay( delay )
        .to( {}, particleOpts.ttl )
        .onComplete( initParticle )
        .start();
    new TWEEN.Tween( particle.position )
        .delay( delay )
        .to( { 
            x: particleOpts.radius * Math.sin(theta)* Math.cos(alpha), 
            y: particleOpts.radius * Math.sin(theta)* Math.sin(alpha), 
            z: particleOpts.radius * Math.cos(theta), 
        }, particleOpts.ttl)
        .start();
    new TWEEN.Tween( particle.scale )
        .delay( delay )
        .to( { x: particleOpts.scale.final, y: particleOpts.scale.final }, particleOpts.ttl )
        .start();
}

function animate(){
    requestAnimationFrame(animate);

    TWEEN.update();

    render();
}

function render(){
    GAME.renderer.render(GAME.scene, GAME.camera);
}


