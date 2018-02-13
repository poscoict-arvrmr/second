#!/usr/bin/env python
import skywriter
import signal
import paho.mqtt.client as mqtt

broker_address="127.0.0.1"
print("creating new client instance")
client = mqtt.Client("Pi")
client.connect(broker_address, 1883)

@skywriter.double_tap()
def doubletap(position):
	client.publish("gesture/state", "double tap")
	print('Double tap!', position)

@skywriter.tap()
def tap(position):
    if position=='west':
        client.publish("gesture/state", "right")
    elif position=='east':
        client.publish("gesture/state", "left")
    print('Tap!', position)

signal.pause()
