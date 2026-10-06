# MINTware for micro:bit

MakeCode extension with blocks for servos and radio. Available in English, German, French and Italian.

## Use as extension

Open [https://makecode.microbit.org/](https://makecode.microbit.org/), click **Extensions** and paste the URL of this repository.

## Servos

```blocks
mintware.setCenter(MintPin.P0, -3)
mintware.servo180(MintPin.P0, 90)
mintware.servo360(MintPin.P1, 50)
mintware.stopServo(MintPin.P1)
```

* `setCenter(pin, offset)` – corrects the center of a 180° servo by -10 to 10 degrees (e.g. after mounting)
* `servo180(pin, angle)` – sets a 180° servo to an angle (0–180)
* `servo360(pin, speed)` – turns a 360° servo, speed -100 to 100 (0 = stop)
* `stopServo(pin)` – switches off the servo signal

Available pins: P0, P1, P2, P8, P12–P16 (no conflicts with display, buttons or I2C).
Servos need an external power supply via an expansion board.

## Radio

```blocks
mintware.setGroup(1)
mintware.sendValue(42)
mintware.onReceivedValue(function (value) {
    basic.showNumber(value)
})
```

## Supported targets

* for PXT/microbit
