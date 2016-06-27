const LIGHTBLOCK_T = 2;
const LIGHTBLOCK_MATERIAL = new THREE.MeshLambertMaterial({
    emissive: 0x80ccff,
    emissiveIntensity: 1,
    transparent: true,
    opacity: 0.8,
    map: TEXTURES.map.cube
});


Block.types[LIGHTBLOCK_T] = LightBlock.prototype;


function LightBlock(type){
}


LightBlock.prototype.createObject = function(){

    this.object = new THREE.Object3D();

    var cube = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        this.getMaterial()
    );

    this.add(cube);

    var  light = new THREE.PointLight(0x66c2ff, 1, 2);
    light.position.set(0,0,0);
    
    this.add(light);

    this.object.position.set(0,0,-0.6);

}


LightBlock.prototype.getMaterial = function(){
    return LIGHTBLOCK_MATERIAL;
};