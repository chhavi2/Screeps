var roleUpgrader = require('role.upgrader.js')

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false
        }
        if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
            creep.memory.building = true
        }

        if (creep.memory.building) {
            // Find and Attack Hostile creeps if present using the ATTACK body part
            var hostileCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
            if (hostileCreep !== undefined) {
                if (creep.attack(hostileCreep) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(hostileCreep)
                }
            } else {
                // If no hostile creeps, build the construction sites
                var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)
                if (target !== undefined) {
                    if (creep.build(target) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(target)
                    }
                } else {
                    // If nothing to build Upgrade the controller
                    roleUpgrader.run(creep)
                }
            }
        } else {
            // Harvest if no energy in creep
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            }
        }
    }
}

module.exports = roleBuilder
