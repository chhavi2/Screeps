var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            // Harvest from closest energy source if can carry more energy
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            }
        } else {
            // Tranfer energy to Tower if it needs energy
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType === STRUCTURE_TOWER) &&
                            s.energy < s.energyCapacity
            })
            if (structure !== undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure)
                }
            } else {
                // Transfer to Spawn or extensions that have lesser energy than their capacity
                var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType === STRUCTURE_SPAWN ||
                            s.structureType === STRUCTURE_EXTENSION) &&
                            s.energy < s.energyCapacity
                })
                if (structure !== undefined) {
                    if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure)
                    }
                }
            }
        }
    }
}

module.exports = roleHarvester
