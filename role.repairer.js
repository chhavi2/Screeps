var roleBuilder = require('role.builder.js')

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.repairing && creep.carry.energy === 0) {
            creep.memory.repairing = false
        }
        if (!creep.memory.repairing && creep.carry.energy === creep.carryCapacity) {
            creep.memory.repairing = true
        }

        if (creep.memory.repairing) {
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL
            })
            if (structure !== undefined) {
                // try to repair it
                if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
                    // if its out of range move towards it
                    creep.moveTo(structure)
                }
            } else {
                // Construct Sites
                roleBuilder.run(creep)
            }
        } else {
            // Harvest energy if no enrgy present
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            }
        }
    }
}

module.exports = roleRepairer
