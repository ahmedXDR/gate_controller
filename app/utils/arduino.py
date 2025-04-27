import logging
import sys
import glob
import time

from serial import Serial, SerialException

from app.core.config import settings
from app.schemas import Command

logger = logging.getLogger("uvicorn")


def serial_ports():
    """Lists serial port names

    :raises EnvironmentError:
        On unsupported or unknown platforms
    :returns:
        A list of the serial ports available on the system
    """
    if sys.platform.startswith("win"):
        ports = ["COM%s" % (i + 1) for i in range(256)]
    elif sys.platform.startswith("linux") or sys.platform.startswith("cygwin"):
        # this excludes your current terminal "/dev/tty"
        ports = glob.glob("/dev/tty[A-Za-z]*")
    elif sys.platform.startswith("darwin"):
        ports = glob.glob("/dev/tty.*")
    else:
        raise EnvironmentError("Unsupported platform")

    result = []
    for port in ports:
        try:
            s = Serial(port)
            s.close()
            result.append(port)
        except (OSError, SerialException):
            pass
    return result


def init_arduino():
    ports = serial_ports()
    if not ports:
        logger.info("Arduino not found , waiting for connection...")
        while True:
            ports = serial_ports()
            if ports:
                break
            time.sleep(1)

    logger.info(f"Available ports: {ports}")
    logger.info(f"Using port: {ports[0]}")
    arduino = Serial(
        port=ports[0],
        baudrate=settings.BAUD_RATE,
        timeout=settings.SERIAL_TIMEOUT,
    )
    return arduino


def send_command(arduino: Serial, command: Command):
    command_id = command.value
    arduino.write(bytes(command_id, "utf-8"))
