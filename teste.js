#!/usr/bin/env node

const STM32USARTBootloader = require('./index')
const fs = require('fs')
const path = require('path')
const argv = require('minimist')(process.argv.slice(2), {
  alias: {
    p: 'port',
  }
});

if(argv._.length === 0) {
  throw new Error('Especifice o firmware')
}

if(argv.p === undefined) {
  throw new Error('Especifique a porta')
}

let data = fs.readFileSync(path.join(__dirname, argv._[0]))


let bootloader = new STM32USARTBootloader({
  serialPortPath: argv.p
})

bootloader.flash(0x08000000, data, (err) => {
  if (err) {
    return console.error('could not flash image', err)
  }
  console.log('done')
})
