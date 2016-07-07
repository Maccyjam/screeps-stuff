var roleMaintainerContainer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var containers = creep.room.find(FIND_STRUCTURES, {
                filter: function (object) {
                    return object.structureType == STRUCTURE_CONTAINER;
                }
        });
        
        if (creep.carry.energy < creep.carryCapacity) {
            if (containers[0].transfer(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0]);
            }
        }
        
        if (containers[0].hits != containers[0].hitsMax) {
            if (creep.repair(containers[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0]);
            }
        }
    }
}

module.exports = roleMaintainerContainer;