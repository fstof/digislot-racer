# Race management for Ninco N-Digital slot cars

## Works with
Ninco N-Digital power base (firmware v1.08)

## Hardware Requirements
Cable to connect the base to the PC (PS2 -> Serial/USB). More info [here](http://www.slotbaer.de/index.php/ninco-n-digital/24-n-digital-rechner-kopplung)

## Software Requirements
- Windows / Mac / Linux
- Node.js, to run the management server: [Get it](http://nodejs.org)
- HTML5 compliant browser, for the user interface: [Get it](http://www.google.com/chrome)

## Installation
- Install Node.js
- Install Bower (command line)
```
$ npm install -g bower
```
- Download and extract the zip of this project (~/digislot-racer)
- Install dependencies (command line)
```
$ cd ~/digislot-racer
$ bower install
$ npm install
```

## Running
- Start the Node.js server
```
$ npm start
```
- Open your browser to [http://localhost:3000](http://localhost:3000)
