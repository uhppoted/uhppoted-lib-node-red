# TODO

### IN PROGRESS

- [ ] check the `(done())`  thing - looks like it's possibly wrong
- [ ] rework _listen_ integration tests for docker
```
const os = require('os');
const interfaces = os.networkInterfaces();
let containerIP = null;

// Loop through network interfaces to find the internal IPv4 address
for (const interfaceName in interfaces) {
    for (const iface of interfaces[interfaceName]) {
        // Skip internal (loopback) and non-IPv4 addresses
        if (iface.family === 'IPv4' && !iface.internal) {
            containerIP = iface.address;
            break;
        }
    }
    if (containerIP) break;
}

msg.payload = containerIP;
return msg;
```

- [ ] 'set-firstcard' API (cf. https://github.com/uhppoted/uhppoted/issues/82)
      - [x] `set-firstcard`
      - [x] examples
      - [x] fix snake_case stuff
      - [ ] internationalisation
      - [x] integration tests
      - [x] CHANGELOG
      - [x] README

- [ ] Decoding an invalid reply throws `AggregateError` (cf. https://github.com/uhppoted/uhppoted-lib-node-red/issues/41)

## TODO

- [ ] GetEvents
- [ ] NPX integration tests
- [ ] (?) use JSON.parse if node input is a string

