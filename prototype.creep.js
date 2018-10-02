var roles = {
    harvester: require('role.harvester.js'),
    upgrader: require('role.upgrader.js'),
    builder: require('role.builder.js'),
    repairer: require('role.repairer.js')
}

Creep.prototype.runRole =
    function () {
        roles[this.memory.role].run(this)
    }
