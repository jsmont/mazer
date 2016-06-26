const MAP_FLOOR_TEXTURE = THREE.ImageUtils.loadTexture("textures/map-cube.jpg");
const WALL = 1;
const START = 2;

function Map(data){

    this.data = data;
    this.width = data.length;
    this.height = data[0].length;
    this.map = [];

    this.createObject();

    this.addPlane();

    this.addWalls();

    this.step = 1;

    GAME.player = new Player(GAME.camera, this.start);
    this.add(GAME.player.getObject());
};

Map.prototype.createObject = function(data){

    this.object = new THREE.Object3D();
    this.object.position.set(0,0,0);

};

Map.prototype.getObject = function(){
    return this.object;
};

Map.prototype.add = function(o){
    this.object.add(o);
};

Map.prototype.addPlane = function(){
    
    this.plane = new THREE.Mesh(
        new THREE.PlaneGeometry(this.width*100, this.height*100),
        new THREE.MeshPhongMaterial({
            map: MAP_FLOOR_TEXTURE
        })
    );

    this.plane.up.set(0,0,1);
    this.plane.position.set(0,0,0);
    this.add(this.plane);

};

Map.prototype.addWalls = function(){
    for(var i = 0; i < this.width; ++i){
        var row = this.data[i];
        this.map[i] = [];
        var map_row = this.map[i];
        for(var j = 0; j < this.height; ++j){
            var tile = row[j];

            if(tile == WALL){
                map_row[j] = this.addWall(tile, i,j);
            } else {
                map_row[j] = null;
            }
            
            if(tile == START){
                this.start = new THREE.Vector3(
                    i - this.width/2 + 0.5,
                    j - this.height/2 + 0.5,
                    0.5
                )

            }
        }
    }

    for(var i = -1; i <= map.length; ++i){
        this.addWall(1, i,-1);
        this.addWall(1, i,map[0].length);
    }

    for(var j = 0; j < map[0].length; ++j){
        this.addWall(1, -1, j);
        this.addWall(1, map.length, j);
    }
}

Map.prototype.addWall = function(t, i, j){
    var block = new Block(t);
    
    block.setPosition(
        i - this.width/2 + 0.5,
        j - this.height/2 + 0.5
    );

    this.object.add(block.getObject());

    return block;
}



