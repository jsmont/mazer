$(document).ready(init);

var map = [
    [0,1,1,1,1],
    [0,0,0,0,1],
    [1,0,1,0,1],
    [1,0,1,0,1],
    [1,1,2,0,2],
    [1,1,0,0,0],
    [1,1,0,-1,0],
    [1,1,0,0,0],
    [1,1,1,1,1],
];


var particleOpts = {
    count: 50,
    ttl: 2000,
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

    GAME.map = new Map(map);
    GAME.scene.add(GAME.map.getObject());

}



function animate(){
    requestAnimationFrame(animate);

    TWEEN.update();

    render();
}

function render(){
    GAME.renderer.render(GAME.scene, GAME.camera);
}

$(document).on("keydown", function(e){
    console.log(e.key);

    switch(e.key){
    case "ArrowUp":
        GAME.player.forward(GAME.map.step);
        break;
    case "ArrowDown":
        GAME.player.forward(-GAME.map.step);
        break;
    case "ArrowLeft":
        GAME.player.left();
        break;
    case "ArrowRight":
        GAME.player.right();
    }
})
