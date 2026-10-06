/**
 * Conflict-free pins (no display, button or I2C pins)
 */
enum MintPin {
    //% block="P0"
    P0,
    //% block="P1"
    P1,
    //% block="P2"
    P2,
    //% block="P8"
    P8,
    //% block="P12"
    P12,
    //% block="P13"
    P13,
    //% block="P14"
    P14,
    //% block="P15"
    P15,
    //% block="P16"
    P16
}

/**
 * MINTware blocks for servos and radio
 */
//% color="#1A8A87" icon="" block="Mintware"
//% groups='["Servos", "Radio"]'
namespace mintware {

    // Maps MintPin to the actual micro:bit pin
    function toPin(pin: MintPin): AnalogPin {
        switch (pin) {
            case MintPin.P0: return AnalogPin.P0
            case MintPin.P1: return AnalogPin.P1
            case MintPin.P2: return AnalogPin.P2
            case MintPin.P8: return AnalogPin.P8
            case MintPin.P12: return AnalogPin.P12
            case MintPin.P13: return AnalogPin.P13
            case MintPin.P14: return AnalogPin.P14
            case MintPin.P15: return AnalogPin.P15
            default: return AnalogPin.P16
        }
    }

    // ===== Servos =====

    // Center correction per pin for 180° servos (index = MintPin value)
    let centerOffsets: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0]

    /**
     * Corrects the center position of a 180° servo, e.g. if it is mounted a few degrees off.
     * The correction applies to all following "servo 180°" blocks on this pin.
     * @param pin pin the servo is connected to
     * @param offset correction from -10 to 10 degrees, eg: 0
     */
    //% blockId=mintware_setcenter
    //% block="set center of servo 180° at %pin to %offset °"
    //% pin.defl=MintPin.P0
    //% offset.min=-10 offset.max=10 offset.defl=0
    //% group="Servos" weight=95
    export function setCenter(pin: MintPin, offset: number): void {
        centerOffsets[pin] = Math.constrain(offset, -10, 10)
    }

    /**
     * Sets a 180° servo to an angle (including the center correction).
     * @param pin pin the servo is connected to
     * @param angle angle from 0 to 180 degrees, eg: 90
     */
    //% blockId=mintware_servo180
    //% parts="mintservo" trackArgs=0
    //% block="servo 180° at %pin to %angle °"
    //% pin.defl=MintPin.P0
    //% angle.min=0 angle.max=180 angle.defl=90
    //% group="Servos" weight=100
    export function servo180(pin: MintPin, angle: number): void {
        angle = Math.constrain(angle + centerOffsets[pin], 0, 180)
        pins.servoSetContinuous(toPin(pin), false)
        pins.servoWritePin(toPin(pin), angle)
    }

    /**
     * Turns a 360° servo at a given speed.
     * @param pin pin the servo is connected to
     * @param speed -100 (full reverse) to 100 (full forward), 0 = stop, eg: 50
     */
    //% blockId=mintware_servo360
    //% parts="mintservo" trackArgs=0
    //% block="servo 360° at %pin turn with speed %speed"
    //% pin.defl=MintPin.P1
    //% speed.min=-100 speed.max=100 speed.defl=50
    //% group="Servos" weight=90
    export function servo360(pin: MintPin, speed: number): void {
        speed = Math.constrain(speed, -100, 100)
        if (speed == 0) {
            pins.analogWritePin(toPin(pin), 0)
            return
        }
        pins.servoSetContinuous(toPin(pin), true)
        pins.servoWritePin(toPin(pin), Math.map(speed, -100, 100, 0, 180))
    }

    /**
     * Stops a servo completely by switching off the signal.
     * @param pin pin the servo is connected to
     */
    //% blockId=mintware_stopservo
    //% parts="mintservo" trackArgs=0
    //% block="stop servo at %pin"
    //% pin.defl=MintPin.P1
    //% group="Servos" weight=80
    export function stopServo(pin: MintPin): void {
        pins.analogWritePin(toPin(pin), 0)
    }

    // ===== Radio =====

    /**
     * Sets the radio group. Only micro:bits in the same group can communicate.
     * @param group radio group from 0 to 255, eg: 1
     */
    //% blockId=mintware_setgroup
    //% block="use radio group %group"
    //% group.min=0 group.max=255 group.defl=1
    //% group="Radio" color="#7AB13A" weight=70
    export function setGroup(group: number): void {
        radio.setGroup(group)
    }

    /**
     * Sends a number to all micro:bits in the same radio group.
     * @param value number to send, eg: 0
     */
    //% blockId=mintware_sendvalue
    //% block="send value %value"
    //% group="Radio" color="#7AB13A" weight=60
    export function sendValue(value: number): void {
        radio.sendNumber(value)
    }

    /**
     * Runs code when a number is received by radio.
     */
    //% blockId=mintware_onreceivedvalue
    //% block="on radio received value"
    //% draggableParameters=reporter
    //% group="Radio" color="#7AB13A" weight=50
    export function onReceivedValue(handler: (value: number) => void): void {
        radio.onReceivedNumber(handler)
    }
}
