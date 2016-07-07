var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleBuilderPassive = require('role.builder.passive');

var HARVESTER_NUMBER = 3;
var BUILDER_NUMBER = 1;
var UPGRADER_NUMBER = 2;
var PASSIVE_BUILDER_NUMBER = 1;

module.exports.loop = function () {

    // Memory cleaning!
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'passivebuilder') {
            roleBuilderPassive.run(creep);
        }
    }
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if (harvesters.length < HARVESTER_NUMBER) {
        var newHarvester = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newHarvester);
    }
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if (builders.length < BUILDER_NUMBER) {
        var newBuilder = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newBuilder);
    }
    
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if (upgraders.length < UPGRADER_NUMBER) {
        var newUpgrader = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newUpgrader);
    }
    
    var passiveBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'passivebuilder');
    if (passiveBuilders.length < PASSIVE_BUILDER_NUMBER) {
        var newPBuilder = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'passivebuilder'});
        console.log('Spawning new passivebuilder: ' + newPBuilder);
    }
}