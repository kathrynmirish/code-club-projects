msg = ""
def send_image(address: number, brightness: number):
    global msg
    radio.set_group(address)
    msg = ""
    for row in range(5):
        for column in range(5):
            if led.point(row, column) == True:
                msg = "" + msg + convert_to_text(brightness)
            else:
                msg = "" + msg + "0"
    radio.send_string(msg)

def on_forever():
    basic.show_leds("""
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        """)
    send_image(43, 1)
    basic.pause(2000)
    basic.clear_screen()
    basic.pause(2000)
    basic.show_leds("""
        . . # . .
        . . # . .
        # # # # #
        . . # . .
        . . # . .
        """)
    send_image(45, 5)
    basic.pause(2000)
    basic.clear_screen()
    basic.pause(2000)
basic.forever(on_forever)
