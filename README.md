# SplunkUIKitDemo

## What does this do?
This is a simple react client app demo to show some simple integration with some of the Splunk UI tools.
The app demonstrates some of the following:
- Splunk design system components
- A custom component that builds off a design system component
- Splunk design system themes/theme variables
- Splunk React Toast Notifications
- Splunk visualizations
- CRUD api operations via a simple Python/Flask backend (see this repo for code)

The app is a small adaptation in React of a hobby project originally written in Laravel that can import tournament gaming data from https://tourneybot.gg/tournaments and extract player/match information and display some information.  The app is currently setup without any authentication/authorization since it is just a small demo of attempting to make use of the Splunk UI in a short period of time.  

## Why does this exist?
This is primarily a quick proof of concept showing React and Splunk UI since example of my previous React experience is no longer live.

## What else is needed to run this?
Besides the standard yarn install to run the project, the [sample Python backend](https://github.com/bcyde/python-demo) is also needed.  Currently, this app points to http://192.167.1.78:5000 since that is where I have it running locally.  A live demo of the functionality can be provided if desired.  Some screenshots are provided below:

![Import/Listing Page](/public/screenshot-2.png?raw=true "Import/Listing Page")

![Detail/Visualization Page](/public/screenshot-1.png?raw=true "Detail/Visualization Page")