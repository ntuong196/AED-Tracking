## Connecting
##########################################################################

## connect to py
ssh pi@192.168.0.18
# ethernet
ssh pi@168.254.71.188
# desktop view
192.168.0.18:3389

## remote desktop
sudo apt-get remove xrdp vnc4server tightvncserver
sudo apt-get install xrdp -y
# then enable VNC interface in raspi-config

## connect wifi
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
# hash:e97e42c532db2d984227964a8b65500d
sudo ifconfig wlan0 up
sudo ifup --force wlan0
sudo reboot

## change ip
# Private kit: 17
# QUT kit: 19
sudo nano /etc/dhcpcd.conf

interface wlan0

static ip_address=192.168.0.17/24
static routers=192.168.0.1
static domain_name_servers=192.168.0.1 8.8.8.8

sudo reboot

## UART config 
# Advance option -> turn on serial hardware, turn off serial console 
sudo raspi-config

## Serial config
dmesg | grep tty
ls -l /dev/serial0
cat /dev/serial0

sudo apt-get install minicom -y

## GPS client
sudo apt-get install gpsd-clients gpsd -y
sudo killall gpsd
sudo nano /etc/default/gpsd
# add /dev/serial0 to DEVICE
sudo systemctl enable gpsd.socket
sudo systemctl start gpsd.socket
# test gps
gpsmon
cgps
gpspipe -r

## Deploy server
###########################################################################

## Compile server to executable file
python3 -m py_compile server.py
chmod 755 +x server.pyc server.py

## transfer file from computer to pi
scp testserver.py pi@192.168.0.18:Desktop/py_server

## kill old process acessing UART
sudo fuser -k /dev/serial0

## start up script
sudo nano .bashrc
./scriptserver.py

## Additional code
###########################################################################
# check temprature
vcgencmd measure_temp

# network check
# insert if missing
sudo route -n
cat /etc/resolv.conf


# Save 700MB
sudo apt-get purge wolfram-engine
sudo apt-get autoremove

# distro update 
sudo nano /etc/apt/sources.list

# add those lines to file
# deb http://archive.raspbian.org/raspbian jessie main contrib non-free
# deb-src http://archive.raspbian.org/raspbian jessie main contrib non-free

sudo apt-get distro-upgrade && sudo apt-get update && sudo apt-get upgrade

# pip3 list
python3
# import pip
# installed_packages = pip.get_installed_distributions()
# print (installed_packages)

## file transfer (download)
scp server.py pi@192.168.0.18:Desktop/py_server

## raw gps data
sudo nano gpspipe

#!/bin/bash
#gpspipe -r -o /media/pi/*******/rawgps.txt

sudo nano .bashrc

#./gpspipe

sudo chmod 755 gpspipe

## Windows service on port
netstat -abno