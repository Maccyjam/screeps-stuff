/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            
            // Need to be able to harvest multiple sources.
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }

        }
        else {
            // Fill all empty structures!
            var emptyStructures = creep.room.find(FIND_MY_STRUCTURES, {
                filter: function (object) {
                    return object.energy < object.energyCapacity;;
                }
            });
        
            if (emptyStructures[0] == STRUCTURE_CONTAINER) {
                if (creep.carry.energy > creep.carryCapacity) { // Only repair with half of its energy.
                    if (creep.repair(emptyStructures[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(emptyStructures[0]);
                    }
                }
            }
        
            if (creep.transfer(emptyStructures[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(emptyStructures[0]);
            }
            
            // if (Game.spawns.Spawn1.energy != Game.spawns.Spawn1.energyCapacity) {
            //     if(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(Game.spawns.Spawn1);
            //     }
            // } else {
            //     creep.say("Spawn full");
            //     var extensionsFull = true;
            //     // Fill up extensions...
            //     for (var ext in creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_EXTENSION })) {
            //         if (ext.energy != ext.energyCapacity) {
            //             extensionsFull = false;
            //             if(creep.transfer(ext, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //                 creep.moveTo(ext);
            //             }
            //         }
            //     }
            //     // If extensions full, fill container.
            //     // if (extensionsFull) {
            //     //     if(creep.transfer(creep.room.find(['577c209d47c3ef7031ae2ccf'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //     //         creep.moveTo(creep.room.structures['577c209d47c3ef7031ae2ccf']);
            //     //     }
            //     // }
            // }
        }
        
	}
};

module.exports = roleHarvester;