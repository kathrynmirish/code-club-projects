input.onButtonPressed(Button.A, function () {
    basic.showLeds(`
        . # # . .
        . # . # .
        . # # . .
        . # . # .
        . # . # .
        `)
    send_image(1, 1, 9)
    basic.showLeds(`
        . # # # .
        . # . . .
        . # # # .
        . # . . .
        . # # # .
        `)
    send_image(1, 2, 9)
    basic.showLeds(`
        . . # . .
        . # . # .
        . # . . .
        . # . # .
        . . # . .
        `)
    send_image(2, 1, 9)
    basic.showLeds(`
        . # . # .
        . # . # .
        . . # . .
        . . # . .
        . . # . .
        `)
    send_image(2, 2, 9)
    basic.pause(200)
    basic.showLeds(`
        . . # . .
        . # . # .
        . # . . .
        . # . # .
        . . # . .
        `)
    send_image(1, 1, 9)
    basic.showLeds(`
        . # . . .
        . # . . .
        . # . . .
        . # . . .
        . # # # .
        `)
    send_image(1, 2, 9)
    basic.showLeds(`
        . # # # .
        . # . . .
        . # # # .
        . # . . .
        . # # # .
        `)
    send_image(2, 1, 9)
    basic.showLeds(`
        . . # . .
        . . # . .
        . . # . .
        . . . . .
        . . # . .
        `)
    send_image(2, 2, 9)
    basic.pause(200)
    basic.showLeds(`
        . . . # #
        . . # . .
        . # . . .
        # . . . .
        # . . . .
        `)
    send_image(1, 1, 9)
    basic.showLeds(`
        # # . . .
        . . # . .
        . # . # .
        # # # # #
        . # # # .
        `)
    send_image(1, 2, 9)
    basic.showLeds(`
        . . # . .
        . . . . .
        . . . # .
        . . # . .
        # # . . .
        `)
    send_image(2, 2, 9)
    basic.showLeds(`
        # . . . .
        # . . . .
        . # . . .
        . . # . .
        . . . # #
        `)
    send_image(2, 1, 9)
})
// This function is the main part of the Controller code. It is required because there isn't a built-in one that can send an Image over the Radio. This function has three parameters:
// - `row` and `column` -> these are used to select which micro:bit we want to send the image to. The micro:bits that form the big display will be arranged in rows and columns, and this is a handy way to pick which one we want.
// - `brightness` -> this is how bright we want the LEDs on the receiver to be. It must be a number between 1 (very dim) and 9 (very bright).
// 
// The function has to be called after a "show leds" block has been used to display an Image on the Controller micro:bit.
// 
// The function then checks which LEDs are ON and which are OFF. It does that by checking each individual LED, starting at the top left, and going right and across. 
// 
// There are 25 LEDs in total, arranged in a 5 x 5 square. Top left LED has an (x, y) of (0, 0), and bottom right has an (x, y) of (4, 4). The x shows us in which column we are, while the y shows us in which row we are. Therefore, we use two nested loops to go through all the LEDs. The first one counts rows, and the second one counts column. The logic is that for every row we have to go through all of the columns.
// 
// The function uses a string variable, called `msg` to record the results of our checks. We first initialise the variable to "", or an empty string. Then, if an LED is ON, we append the `brightness` to the string. For example, if `brightness` was 5, and the first two LEDs were ON, our `msg` would be "55". If the LED is OFF, we append 0 instead. Continuing the example, if the remaining three LEDs were OFF, our `msg` would end up as "55000".
// 
// Once we have checked an entire row, we then use the Radio to send `msg` to our chosen receiver. Once we have sent the `msg`, we then set it back to an empty string, to be ready for the next row.
// 
// We also include a short pause, of 10 ms, between rows, to give the receiver micro:bit plenty of time to receive and process the `msg` we have just sent.
// 
// Finally, once we've gone through all the rows, we exit the function.
function send_image (row: number, column: number, brightness: number) {
    address = 10 * row + column
    radio.setGroup(address)
    msg = ""
    for (let i = 0; i <= 4; i++) {
        for (let j = 0; j <= 4; j++) {
            if (led.point(j, i) == true) {
                msg = "" + msg + convertToText(brightness)
            } else {
                msg = "" + msg + "0"
            }
        }
        radio.sendString(msg)
        msg = ""
        basic.pause(10)
    }
}
let msg = ""
let address = 0
basic.showIcon(IconNames.Yes)
basic.pause(2000)
basic.clearScreen()
