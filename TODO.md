# TODO

### IN PROGRESS

- [x] fix the `(done())`  thing
    - [x] get-devices
    - [x] get-device
    - [x] set-ip
    - [x] get-time
    - [x] set-time
    - [x] get-door-control
    - [x] set-door-control
    - [x] get-listener
    - [x] set-listener
    - [x] record-special-events
    - [x] get-status
    - [x] get-cards
    - [x] get-card
    - [x] get-card-by-index
    - [x] put-card
    - [x] delete-card
    - [x] delete-all-cards
    - [x] get-time-profile
    - [x] set-time-profile
    - [x] clear-time-profiles
    - [x] add-task
    - [x] clear-task-list
    - [x] refresh-task-list
    - [x] get-event-index
    - [x] set-event-index
    - [x] get-event
    - [x] open-door
    - [x] set-pc-control
    - [x] set-interlock
    - [x] activate-keypads
    - [x] set-door-passcodes
    - [x] get-antipassback
    - [x] set-antipassback
    - [x] set-firstcard
    - [x] restore-default-parameters


- [x] rework _listen_ integration tests for docker

- [x] 'set-firstcard' API (cf. https://github.com/uhppoted/uhppoted/issues/82)
      - [x] `set-firstcard`
      - [x] examples
      - [x] fix snake_case stuff
      - [x] rework encoder to use unpacked firstcard
      - [x] allow translation for active/inactive modes
      - [x] encoder active/inactive errors
      - [x] integration tests
      - [x] CHANGELOG
      - [x] README

- [ ] Decoding an invalid reply throws `AggregateError` (cf. https://github.com/uhppoted/uhppoted-lib-node-red/issues/41)

## TODO

- [ ] GetEvents
- [ ] NPX integration tests
- [ ] (?) use JSON.parse if node input is a string

