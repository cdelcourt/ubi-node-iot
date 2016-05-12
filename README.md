# ubi-iot

![Ubidots Screenshot](http://img.photobucket.com/albums/v234/Anode/Screen%20Shot%202016-05-12%20at%2009.51.31%20_zpsrhzeh27d.png)

To-do: Add Arduino code

## Things you'll need to change in the script before using

You'll need to change the following items in the script:

* Ubidots API Key
* Ubidots Variable IDs
* Port name, if not /dev/ttyACM0

## Usage

I've found that using pm2 makes life easier when making it into a service:

### To start

pm2 start ubidots-release.js --name "ubi-iot"

### To make into a service

To-do, but I followed [these](http://pm2.keymetrics.io/docs/usage/startup/) instructions for great success.

## Why sleep?

Because the free ubidots account only allows for 500,000 points per month, and besides, updating every ~15 seconds or so is sufficient for my test case, but feel free to remove them otherwise

## Points about how it works

It's fairly self explanitory, but I have some code commenting to do and will explain parts of it when I have a bit of time.
