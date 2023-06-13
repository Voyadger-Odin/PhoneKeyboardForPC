
import os
from flask import render_template
import keyboard
import mouse
import time
import pyautogui


def index(args):
	return render_template('index.html')


def keyboardkeys(args):
	data = args['data']
	if data == 'left-arrow':
		keyboard.send('left arrow')
	elif data == 'right-arrow':
		keyboard.send('right arrow')
	elif data == 'space':
		keyboard.send('space')
	elif data == 'backspace':
		keyboard.send('backspace')
	elif data == 'enter':
		keyboard.send('enter')
	else:
		keyboard.write(args['data'])
	return 'keyboardkeys'

def mousemove(args):
	deltaX, deltaY = int(args['x']), int(args['y'])
	kx = 3
	ky = 2
	mouse.move(deltaX * kx, deltaY * ky, absolute=False)
	return 'mouse'


def mousebuttons(args):
	if (args['data'] == 'left'):
		mouse.click()
		return 'left'
	if (args['data'] == 'right'):
		mouse.right_click()
		return 'right'

def scrollmove(args):
	deltaY = int(args['y'])
	mouse.wheel(deltaY / 10)
	return 'ok'

def volume(args):
	x = 50
	a = 1

	# mute
	if args['data'] == '0':
		pyautogui.press('volumemute')
	# down
	elif args['data'] == '1':
		pyautogui.press('volumedown', a)
	# up
	elif args['data'] == '2':
		pyautogui.press('volumeup', a)

	return 'ok'