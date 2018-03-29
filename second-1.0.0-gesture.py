#!/usr/bin/env python
import skywriter
import signal
import paho.mqtt.client as mqtt
from datetime import datetime

broker_address="127.0.0.1"
print("creating new client instance")
client = mqtt.Client("Pi")
client.connect(broker_address)


basetime = datetime.now().ctime()

@skywriter.flick()
def flick(start,finish):
    global basetime
    now = datetime.now().ctime()
    if start == 'east' :
        if finish == 'west' : 
            basetime = now
            client.publish("gesture/state", "left")
            print('left', now)
    elif start == 'west' :
        if finish == 'east' :
            basetime = now
            client.publish("gesture/state", "right")
            print('right', now)
    elif start == 'north' :
        if finish == 'south' :
            basetime = now
            client.publish("gesture/state", "down")
            print('down', now)
    elif start == 'south' :
        if finish == 'north' :
            basetime = now
            client.publish("gesture/state", "up")
            print('up', now)


@skywriter.touch()
def touch(position):
    global basetime
    now = datetime.now().ctime()
    if basetime != now :
        basetime = now
        client.publish("gesture/state", "double tap")
        print('double tap', now)


'''
@skywriter.double_tap()
def doubletap(position):
    global basetime
    now = datetime.now().ctime()
    if basetime != now :
        basetime = now
        client.publish("gesture/state", "double tap")
        print('Double tap!', position, now)

@skywriter.tap()
def tap(position):
    global basetime
    now = datetime.now().ctime()
    if basetime != now :
        basetime = now
        if position == 'west' :
            client.publish("gesture/state", "right")
            print('Tap!', 'right', position, now)
        elif position == 'east' :
            client.publish("gesture/state", "left")
            print('Tap!', 'left', position, now)
'''

signal.pause()
