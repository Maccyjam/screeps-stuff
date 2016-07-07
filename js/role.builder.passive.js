/*
 * Only builds and repairs walls! Eventually roads too.
 */

var roleBuilderPassive = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
            // Construct walls.
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
                filter: function (object) {
                    return object.structureType == STRUCTURE_WALL;
                }
            });
            
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
                
            } else {
                // Repair Walls.
                var walls = creep.room.find(FIND_STRUCTURES, {
                    filter: function(object) {
                        return object.structureType == STRUCTURE_WALL && object.hits < 75000; // Should probably repair to full, but keep this for now.
                    }
                });
                if (walls.length) {
                    if (creep.repair(walls[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(walls[0]);
                    }
                } else {
                    // Walls repaired, now build roads.
                    targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
                        filter: function (object) {
                            return object.structureType == STRUCTURE_ROAD;
                        }
                    });
            
                    if(targets.length) {
                        if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0]);
                        }
                    }
                }
            }
            
	    } else {
	        var sources = creep.room.find(FIND_SOURCES);
	        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
	        
	    }
	}
};

module.exports = roleBuilderPassive;