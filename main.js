require('spawn.factory.js');
require('prototype.creep.js');
var utils = require('utility.js')

module.exports.loop = function () {
    // delete garbage
    utils.handleGarbage()
    utils.towerHandling()

    // Generate Creeps using StructureSpawn prototype
    for (let spawnName in Game.spawns) {
        Game.spawns[spawnName].generateCreeps()
    }

    for (let name in Game.creeps) {
        // run creep logic
        Game.creeps[name].runRole()
    }
}
