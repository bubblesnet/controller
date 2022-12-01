# Client

Client is a React/NodeJS application that provides the user interface into the BubblesNet system. Configuration of 
the station, automatic or manual control over nutrients, heat, light, humidity and airflow and real-time display of current
environmental conditions (light, temperature, pressure, co2/VOC, pH ...).

## Screens

### Station Control
This screen is animated to indicate the active/inactive status of the controlled devices
(pumps ...) and the light on/off status.

![station control screen](https://github.com/bubblesnet/documentation/raw/master/user_interface/Screen_Station_Control.png)

I spend 99.99% of operational time in the station control screen and have gone to 
extraordinary lengths to get all the information and control I need in there.

### Status
![status screen](https://github.com/bubblesnet/documentation/raw/master/user_interface/Screen_Status.png)

The status screen is a little different, read-only representation of the station 
control information. It does display raw ADC values for all ADC modules/channels which
is very useful in implementing new analog sensors.

### Automation
![automation screen](https://github.com/bubblesnet/documentation/raw/master/user_interface/Screen_Automation.png)

The automation screen allows you to configure the light-on/off times, temperature and
humidity targets for the various stages of plant life.

### Device map (i.e. module configuration)

![device map screen](https://github.com/bubblesnet/documentation/raw/master/user_interface/Screen_Device_Map.png)

The device map screen is a read-only look at how the modules/sensors of the system are
configured, in particular what i2c addresses things live at. Changing any of the values
here requires direct editing of database tables.

### Display Settings

![display settings screen](https://github.com/bubblesnet/documentation/raw/master/user_interface/Screen_Display_Settings.png)

Allows you to change fonts in the system.  Not completely baked, mostly because themes
are only half implemented.  Kind of fun to play with.

### Events

![events screen](https://github.com/bubblesnet/documentation/raw/master/user_interface/Screen_Events.png)

Should be the last X events - not implemented.

### Login

![login screen](https://github.com/bubblesnet/documentation/raw/master/user_interface/Screen_Login.png)

Log in to the system.  Password hash must be generated manually and entered into the 
database manually.

![look inside screen](https://github.com/bubblesnet/documentation/raw/master/user_interface/Screen_Look_Inside.png)

The latest picture (timestamped) from inside the cabinet. Pictures are NOT taken if
light falls below usable levels.

### Nutes

![nutes screen](https://github.com/bubblesnet/documentation/raw/master/user_interface/Screen_Nutes.png)

Dispense nutes (water, pHUp, pHDown ...) from here. Volume is dispensed by opening 
a valve for a calculated number of milliseconds and allowing gravity feed to flow the 
liquid into the reservoir.  Currently it is imprecise but "close enough" for pH control.

### Setup

![setup screen](https://github.com/bubblesnet/documentation/raw/master/user_interface/Screen_Station_Setup.png)

The setup screen allows you to configure the capabilities of the station - which sensors
and controlled devices are available in this setup. When setting up for the first time,
come here and add capabilities one at a time to bring up the edge-device gradually.

### Calibration

![calibration screen](https://github.com/bubblesnet/documentation/raw/master/user_interface/Screen_Calibration.png)

Calibration is not implemented.
