module.exports = function (RED) {
  const common = require('./common.js')
  const uhppoted = require('./uhppoted.js')
  const opcodes = require('../nodes/opcodes.js')

  function AddTaskNode(config) {
    RED.nodes.createNode(this, config)

    const node = this
    const topic = config.topic
    const uhppote = RED.nodes.getNode(config.config)

    common.ok(node)

    this.on('input', function (msg, send, done) {
      const t = topic && topic !== '' ? topic : msg.topic
      const controller = common.resolve(msg.payload)
      const task = msg.payload.task

      const emit = function (object) {
        common.emit(node, t, object)
        done()
      }

      const error = function (err) {
        common.error(node, err)
        done(err)
      }

      try {
        const context = {
          config: uhppote,
          translator: this.translate,
          logger: (m) => {
            node.log(m)
          },
        }

        uhppoted.set(context, controller.id, opcodes.AddTask, { task }, controller.address, controller.protocol).then(emit).catch(error)
      } catch (err) {
        error(err)
      }
    })

    this.translate = function (key) {
      return RED._('uhppoted-add-task.' + key)
    }
  }

  RED.nodes.registerType('uhppoted-add-task', AddTaskNode)
}
