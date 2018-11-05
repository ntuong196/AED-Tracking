<p align="center">
  <img src="https://github.com/ntuong196/AED-Tracking/raw/master/Screenshots/logo.png" width="300">
  
  [![Build Status](https://travis-ci.org/angular/angular.svg?branch=master)](https://travis-ci.org/angular/angular)
  [![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=LzF3RzBVVGt6VWE2S0hHaC9uYllOZz09LS1BVjNTclBKV0x4eVRlcjA4QVY1M0N3PT0=--eb4ce8c8dc2c1c5b2b5352d473ee12a73ac20e06)](https://www.browserstack.com/automate/public-build/LzF3RzBVVGt6VWE2S0hHaC9uYllOZz09LS1BVjNTclBKV0x4eVRlcjA4QVY1M0N3PT0=--eb4ce8c8dc2c1c5b2b5352d473ee12a73ac20e06)
  [![npm version](https://badge.fury.io/js/%40angular%2Fcore.svg)](https://www.npmjs.com/@angular/core)
</p>


# QUT AED Tracking
---
### Discription:

Domain: QUT Heath, Safety and Environment (HES)

Project name: AED Tracking

Goal: Implementing the tracking device and monitoring web app for AED kit of QUT HES. 

Project components:

| Component       | Specification                              | Cost  |
| ---------------:|:------------------------------------------:| -----:|
| Sensor          | Raspberry Pi 3 Model B + NEO 6M GPS Module |  $100 |
| API             | NodeJS + MongoDB                           |  Free |
| Web Application | NodeJS + React                             |  Free |

---
### Prerequisite: (For Windows Machine)
This prerequisite similar with MacOS and Linux machine.

1) Install Git bash [here](https://nodejs.org/en/download/current/)

For version control and SSH to control the Sensor (Raspberry Pi)

2) Install Node and NPM [here](https://nodejs.org/en/download/current/)

For Web development environment.

---
### Raspberry Pi: 

#### Installation:

Initial configurtion is based on the guide for unit IFB102 of Prof.Paul Roe.

The document can be found in [Guide Folder](https://github.com/ntuong196/aed-tracking/Guide)

1) Connect to Raspberry Pi by Internal IP Address.

Open Git Bash installed

`ssh pi@<RASP_PI_IP_ADDRESS>`

,eg. `ssh pi@192.168.0.18`

This Internal IP Address can be found by terminal command.

`ifconfig`

Find IP Address of the `wlan0` interface.

2) Connect to Raspberry Pi using Putty.

Read the instruction in [Guide Folder](https://github.com/ntuong196/aed-tracking/Guide)

3) Connect to Pi Desktop using HDMI or Ethernet cable.

Read the instruction in [here](https://www.instructables.com/id/How-to-connect-raspberry-pi-to-laptop-display/)

Open terminal from the Pi

`sudo apt-get distro-upgrade && sudo apt-get update && sudo apt-get upgrade -y`

#### Wiring Raspberry Pi with the GPS Module:

<p align="center">
  <img src="https://github.com/ntuong196/AED-Tracking/raw/master/Screenshots/wiring.png">
</p>

Wiring table:

| NEO-6M GPS       | Raspberry Pi       | Note        |
| ----------------:|:------------------:| -----------:|
| VCC              | Pin 1              |  3.3V       |
| TX               | Pin 10             |  RX(GPIO15) |
| RX               | Pin 8              |  TX(GPIO14) |
| GND              | Pin 6              |  GND        |

#### UART config:

This configration will allows Raspberry Pi reading the data from GPS module. 

Open Terminal from the Raspberry Pi

`sudo raspi-config`

Go to Advance option -> turn on serial hardware, turn off serial console 

#### Install GPS client software:

Open Terminal from the Raspberry Pi

```
sudo apt-get install gpsd-clients gpsd -y
sudo killall gpsd
sudo nano /etc/default/gpsd
```

then add '/dev/serial0' to DEVICE in gpsd file

```
sudo systemctl enable gpsd.socket
sudo systemctl start gpsd.socket
```

Test gps module with command 

`cgps` 

or `gpsmon`

Remember to terminate those processes to continue the set-up with `CTRL + C`

#### Clone and Run tracking software:

Clone the software 

```
git clone https://github.com/ntuong196/aed-tracking`
cd /aed-tracking/RaspberryPi/py_server`
python3 gpsdserver.py
```

---
### NodeJS Server:

On windows (macOs, linux) machine, open terminal (command line)

```
git clone https://github.com/ntuong196/aed-tracking
cd /aed-tracking/NodeServer
npm install
npm start
```

Open Web browser in address `localhost:3000/` to view the web page.

<p align="center">
  <img src="https://github.com/ntuong196/AED-Tracking/raw/master/Screenshots/Signin.JPG">
</p>

Login with default username: `n9776001@qut.edu.au` and password: `toor@101`

<p align="center">
  <img src="https://github.com/ntuong196/AED-Tracking/raw/master/Screenshots/home.jpg">
</p>

---
### Additional Control the Sensor:

#### VNC Server Remote desktop:
```
sudo apt-get remove xrdp vnc4server tightvncserver
sudo apt-get install xrdp -y
```
then enable VNC interface in raspi-config

Download [VNC Server](https://www.realvnc.com/en/connect/download/vnc/)

Connect to the Raspberry Pi through External IP Address,eg. `192.168.0.18`

#### Alternative way to find Raspberry Pi IPv4 (Internal)

Run command line in windows `ipconfig`

Find computer's IP address, eg. `192.168.0.8`

Run command line 

```
<!-- Then ping the network broadcast Address -->
ping 192.168.0.255

arp -a
``` 

Find all connection in the table connect with `192.168.0.8`

#### Send File(Code, etc.) to Raspberry Pi

Open Git Bash and Run 

```
scp gpsdserver.py pi@192.168.0.18:Desktop/py_server
dos2unix gpsdserver.py
python3 gpsdserver.py
```