const LIGHTBLOCK_T = 2;
const LIGHTBLOCK_MATERIAL = new THREE.MeshLambertMaterial({
    emissive: 0x094766,
    emissiveIntensity: 0.5,
    map: TEXTURES.map.cube
});

Block.types.push({type: LIGHTBLOCK_T, class: LightBlock});

function LightBlock(type){
}

LightBlock.prototype.getMaterial = function(){
    return LIGHTBLOCK_MATERIAL;
};