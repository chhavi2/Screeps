var listOfRoles = ['upgrader', 'harvester', 'builder', 'repairer']
var utils = require('utility.js')

StructureSpawn.prototype.generateCreeps =
    function () {
        let room = this.room
        let creepsInRoom = room.find(FIND_MY_CREEPS)
        let numberOfCreeps = { 'harvester': 0, 'upgrader': 0, 'claimer': 0, 'builder': 0, 'repairer': 0 }
        let roleCountMap = utils.getRoleCreepCount()

        // Detect current count of each role Creeps
        for (let role of listOfRoles) {
            numberOfCreeps[role] = _.sum(creepsInRoom, (c) => c.memory.role === role)
        }
        let maxEnergy = room.energyCapacityAvailable
        // maxEnergy = Game.spawns['Spawn1'].energy
        let name

        if (name === undefined) {
            for (let role of listOfRoles) {
                if (name === undefined) {
                    /*
             * Generate creep if its count is lesser than
             * the Creeps required for that role
             */
                    if (numberOfCreeps[role] < roleCountMap[role]) {
                        name = this.createCustomCreep(maxEnergy, role)
                    }
                }
            }
        }
    }

StructureSpawn.prototype.createCustomCreep =
    function (energy, role) {
        var numberOfParts = Math.floor(energy / 200)
        numberOfParts = Math.min(numberOfParts, Math.floor(50 / 3))
        var body = []
        for (let i = 0; i < numberOfParts; i++) {
            body.push(WORK)
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(CARRY)
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(MOVE)
        }
        if (numberOfParts > 0) {
            if (role === 'builder') {
                body.push(ATTACK)
            } else if (role === 'harvester') {
                body.push(MOVE)
            } else {
                body.push(WORK)
            }
        }
        return Game.spawns['Spawn1'].createCreep(body, undefined, { 'role': role })
    }
