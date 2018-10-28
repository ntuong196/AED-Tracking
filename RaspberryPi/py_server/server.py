#! /usr/bin/python3
import requests, serial, pynmea2, json
from time import sleep
from datetime import datetime
from sys import exit

global gp01
gp01 = {}
gp01['aed_id'] = 'gp01'
gp01['location']=[]
gp01['is_online']=[]
gp01['is_moving']=[]


def convert_to_degrees(raw_value):
    decimal_value = raw_value/100.00
    degrees = int(decimal_value)
    mm_mmmm = (decimal_value - int(decimal_value))/0.6
    position = degrees + mm_mmmm
    position = "%.4f" %(position)
    return position

def print_console(time, lat, lon, alt):
    print("Time: ", time, "\n")
    print("Latitude: ", lat," Longtitude: ", lon, " Alitude: ", alt, "m \n")

def post_request():
    apiUrl = ''
    locate = ''
    payload = ''
    req = requests.post(apiUrl,json=payload)

def read_sensor(buffered):
    local_time = datetime.now()
    latitude = float(buffered[1])
    longtitude = float(buffered[3])
    alitude = buffered[8]
    if buffered[2] == 'S':
        latitude = latitude*(-1)
    if buffered[4] == 'W':
        longtitude = longtitude*(-1)
    latitude = convert_to_degrees(latitude)
    longtitude = convert_to_degrees(longtitude)
    gp01['location'].append({
        'time': local_time,
        'lat': latitude,
        'long': longtitude,
        'alitude': alitude
    })
    print_console(local_time, latitude, longtitude,alitude)

def main():
    try:
        gps = serial.Serial("/dev/serial0", baudrate = 9600, timeout = 0.5)
        gpgga_info = "$GPGGA,"
        dbUrl = ''
        while True:
            gps_data = (str)(gps.readline())
            data_availability = gps_data.find(gpgga_info)
            if (data_availability >0):
                #store data coming after "$GPGGA," string
                GPGGA_buffered = gps_data.split("$GPGGA,",1)[1]

                NMEA_buffered = GPGGA_buffered.split(",")

                try:
                    read_sensor(NMEA_buffered)
                except:
                    continue
    except KeyboardInterrupt:
        exit(0)

if __name__ == '__main__':
    main()