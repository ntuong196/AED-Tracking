#! /usr/bin/python3
import json,time
from gps import *
from os import system
from datetime import datetime
from pymongo import MongoClient
import requests as req

def main():
    gpsd = gps(mode=WATCH_ENABLE|WATCH_JSON)
    # '\t' = TAB to try and output the data in columns.
    dbUrl = 'mongodb://raspi:pipi123@ds235053.mlab.com:35053/aed'
    client = MongoClient(dbUrl)
    db = client['aed']
    collection = db['gp01']
    moved = False
    try:
        while True:
            report = gpsd.next()
            system("clear")
            print ('latitude\tlongitude\ttime utc\t\taltitude\tspeed' )
            if (report['class'] == 'TPV') & (getattr(report,'lat',0.0) != 0):
                
                is_moving = False if (getattr(report,'speed', 0.0) <= 2) else True
                moved = moved ^ is_moving
                aed_locate = {
                    'time' : datetime.now(),
                    'lat' : getattr(report,'lat',0.0),
                    'long' : getattr(report,'lon',0.0),
                    'alt' : getattr(report,'alt',0.0),
                    'speed' : getattr(report,'speed',0.0),
                    'moved' : moved
                }
                print (getattr(report,'lat',0.0),"\t",
                    getattr(report,'lon',0.0),"\t",
                    getattr(report,'time',''),"\t",
                    getattr(report,'alt','nan'),"\t",
                    getattr(report,'speed','nan'),"\t")
                # req.post("http://192.168.0.8:3000/stream", data = aed_locate)
                collection.insert_one(aed_locate)
            else:
                ipLocation = req.get("http://ip-api.com/json").json()
                lat = ipLocation['lat']
                lon = ipLocation['lon']
                aed_locate = {
                    'time': datetime.now(),
                    'lat':lat,
                    'long':lon,
                    'alt' : 0,
                    'speed' : 0,
                    'moved' : 0
                }
                print(lat,lon,datetime.now())
                # req.post("http://192.168.0.8:3000/stream", data = aed_locate)
                collection.insert_one(aed_locate)
            time.sleep(0.8)

    except (KeyboardInterrupt): #when you press ctrl+c
        sys.exit()

if __name__ == '__main__':
    main()