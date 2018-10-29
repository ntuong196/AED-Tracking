# QUT AED Tracking
---
### Discription:

Domain: QUT Heath, Safety and Environment (HES)

Project name: AED Tracking

Goal: Implementing the tracking device and monitoring web app for AED kit of QUT HES. 

Project components:

| Component       | Are                                     | Cost  |
| ---------------:|:---------------------------------------:| -----:|
| Sensor          | Raspberry Pi 3 Model B + NEO 6M GPS Mod | $1600 |
| API             | NodeJS + MongoDB                        |  Free |
| Web Application | Node + Express + EJS                    |  Free |

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

3) Connect to Pi Desktop using HDMI cable.

Read the instruction in [here]()

Open terminal from the Pi

`sudo apt-get distro-upgrade && sudo apt-get update && sudo apt-get upgrade -y`

#### UART config:

Enable Sensor Reading data from GPS module

Open Terminal

`sudo raspi-config`

Go to Advance option -> turn on serial hardware, turn off serial console 

#### Install GPS client software:

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

#### Clone and Run tracking software:

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
