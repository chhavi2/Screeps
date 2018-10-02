var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {
        // Harvest energy if no energy present
        if (creep.carry.energy === 0) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            }
        } else {
            // Upgrade controller for RCL upgrade
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller)
            }
        }
    }
}

module.exports = roleUpgrader
