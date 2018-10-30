#! /usr/bin/python3
import pkgutil
from gps import *
from os import system
from datetime import datetime
from pymongo import MongoClient
import webbrowser           #import package for opening link in browser

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
                map_link = 'http://maps.google.com/?q=' + getattr(report,'lat',0.0) + ',' + getattr(report,'lon',0.0)
                print (getattr(report,'lat',0.0),"\t",
                    getattr(report,'lon',0.0),"\t",
                    getattr(report,'time',''),"\t",
                    getattr(report,'alt','nan'),"\t",
                    getattr(report,'speed','nan'),"\t")
                collection.insert_one(aed_locate)

    except (KeyboardInterrupt): #when you press ctrl+c
        webbrowser.open(map_link)        #open current position information in google map
        sys.exit()

if __name__ == '__main__':
    main()