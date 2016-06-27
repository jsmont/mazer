const WALLBLOCK_T = 1;
const WALLBLOCK_MATERIAL = new THREE.MeshPhongMaterial({
    map: TEXTURES.map.cube,
    shininess: 0
});

Block.types.push({type: WALLBLOCK_T, class: WallBlock});

function WallBlock(type){
}

WallBlock.prototype.getMaterial = function(){
    return WALLBLOCK_MATERIAL;
};