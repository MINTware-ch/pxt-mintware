// Servos
mintware.servo180(MintPin.P0, 0)
basic.pause(1000)
mintware.servo180(MintPin.P0, 180)
mintware.servo360(MintPin.P1, 50)
basic.pause(2000)
mintware.servo360(MintPin.P1, 0)
mintware.stopServo(MintPin.P1)

// Radio
mintware.setGroup(1)
mintware.sendValue(42)
mintware.onReceivedValue(function (value) {
    basic.showNumber(value)
})
