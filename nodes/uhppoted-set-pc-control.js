module.exports = function (RED) {
  const common = require('./common.js')
  const uhppoted = require('./uhppoted.js')
  const opcodes = require('../nodes/opcodes.js')

  function SetPCControlNode(config) {
    RED.nodes.createNode(this, config)

    const node = this
    const topic = config.topic
    const uhppote = RED.nodes.getNode(config.config)

    common.ok(node)

    this.on('input', function (msg, send, done) {
      const t = topic && topic !== '' ? topic : msg.topic
      const controller = common.resolve(msg.payload)
      const enable = msg.payload.enable

      const emit = function (object) {
        common.emit(node, t, {
          deviceId: object.deviceId,
          enable,
          updated: object.updated,
        })

        done()
      }

      const error = function (err) {
        common.error(node, err)
        done(err)
      }

      try {
        const context = {
          config: uhppote,
          translator: (k) => {
            return RED._('uhppoted-set-pc-control.' + k)
          },
          logger: (m) => {
            node.log(m)
          },
        }

        uhppoted
          .set(context, controller.id, opcodes.SetPCControl, { enable }, controller.address, controller.protocol)
          .then(emit)
          .catch(error)
      } catch (err) {
        error(err)
      }
    })
  }

  RED.nodes.registerType('uhppoted-set-pc-control', SetPCControlNode)
}
