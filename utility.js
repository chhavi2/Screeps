module.exports = {
    /*
     * The creep memory is saved upon death,
     * so clear Memory.creeps.* to prevent overflowing.
     */
    handleGarbage: function () {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name]
            }
        }
    },
    towerHandling: function () {
        var towers = _.filter(Game.structures, s => s.structureType === STRUCTURE_TOWER)
        for (let tower of towers) {
            if (tower) {
                var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
                if (closestHostile) {
                    tower.attack(closestHostile)
                } else {
                    for (let name in Game.creeps) {
                        // get the creep object
                        var creep = Game.creeps[name]

                        if (creep.hits < creep.hitsMax) {
                            tower.heal(creep)
                        }
                    }
                }
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
                })
                if (closestDamagedStructure) {
                    tower.repair(closestDamagedStructure)
                }
            }
        }
    },
    getRoleCreepCount: function () {
        let roleCreepMap = {
            'harvester': 10,
            'claimer': 2,
            'upgrader': 5,
            'builder': 6,
            'repairer': 2
        }
        return roleCreepMap
    }
}
