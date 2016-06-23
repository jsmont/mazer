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

    GAME.player = new Player(GAME.camera);
    GAME.map.add(GAME.player.getObject());
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
        .to({x: cube.position.x, y: cube.position.y, z: 0.5}, 2000).start();
}

function animate(){
    requestAnimationFrame(animate);

    TWEEN.update();

    render();
}

function render(){
    GAME.renderer.render(GAME.scene, GAME.camera);
}


