module.exports = function (RED) {
  const common = require('./common.js')
  const uhppoted = require('./uhppoted.js')
  const opcodes = require('../nodes/opcodes.js')

  function SetFirstCardNode(config) {
    RED.nodes.createNode(this, config)

    const node = this
    const topic = config.topic
    const uhppote = RED.nodes.getNode(config.config)

    common.ok(node)

    this.on('input', function (msg, send, done) {
      const t = topic && topic !== '' ? topic : msg.topic
      const controller = common.resolve(msg.payload)
      const door = msg.payload.door
      const firstcard = msg.payload.firstcard

      const emit = function (object) {
        common.emit(node, t, object)
      }

      const error = function (err) {
        common.error(node, err)
      }

      try {
        const context = {
          config: uhppote,
          translator: this.translate,
          logger: (m) => {
            node.log(m)
          },
        }

        // unpack firstcard

        const mode = (m) => {
          switch (m) {
            case 'controlled':
              return opcodes.Controlled

            case 'normally-open':
              return opcodes.NormallyOpen

            case 'normally-closed':
              return opcodes.NormallyClosed

            case 'first-card only':
              return opcodes.FirstCardOnly

            default:
              throw new Error(`invalid first-card mode (${m})`)
          }
        }

        const weekday = (day) => {
          return firstcard?.weekdays?.some((d) => d.toLowerCase().startsWith(day.substring(0, 2))) ?? false
        }

        uhppoted
          .set(
            context,
            controller.id,
            opcodes.SetFirstCard,
            {
              door: door,
              startTime: firstcard.startTime,
              endTime: firstcard.endTime,
              modes: {
                active: mode(firstcard.activeMode),
                inactive: mode(firstcard.inactiveMode),
              },
              weekdays: {
                monday: weekday('monday'),
                tuesday: weekday('tuesday'),
                wednesday: weekday('wednesday'),
                thursday: weekday('thursday'),
                friday: weekday('friday'),
                saturday: weekday('saturday'),
                sunday: weekday('sunday'),
              },
            },
            controller.address,
            controller.protocol,
          )
          .then((object) => emit(object))
          .then(done())
          .catch((err) => error(err))
      } catch (err) {
        error(err)
      }
    })

    this.translate = function (key) {
      return RED._('uhppoted-set-firstcard.' + key)
    }
  }

  RED.nodes.registerType('uhppoted-set-firstcard', SetFirstCardNode)
}
