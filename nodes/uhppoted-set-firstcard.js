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

        // unpack firstcard
        const modes = new Map([
          ['controlled', opcodes.Controlled],
          ['normally open', opcodes.NormallyOpen],
          ['normally closed', opcodes.NormallyClosed],
          ['first-card only', opcodes.FirstCardOnly],

          [this.translate('modeControlled'), opcodes.Controlled],
          [this.translate('modeNormallyOpen'), opcodes.NormallyOpen],
          [this.translate('modeNormallyClosed'), opcodes.NormallyClosed],
          [this.translate('modeFirstCardOnly'), opcodes.FirstCardOnly],
        ])

        const mode = (m) => {
          if (!modes.has(m)) {
            throw new Error(`invalid first-card mode (${m})`)
          }

          return modes.get(m)
        }

        const weekday = (day) => {
          return firstcard?.weekdays?.some((d) => d.toLowerCase().startsWith(day.substring(0, 2))) ?? false
        }

        const request = {
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
        }

        uhppoted.set(context, controller.id, opcodes.SetFirstCard, request, controller.address, controller.protocol).then(emit).catch(error)
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
