---
title: "Bus Display v2 with React, D3, and Mapbox"
# subtitle: ""
# description: ""
images:
- /post/busdisplay.png
date: 2021-04-20T08:57:24+12:00
tags:
- web
- react
- buses
draft: true
---

![](/post/busdisplay.png)


Recently I've been learning [React](https://reactjs.org), a javascript framework for building responsive user interfaces (the long game is iNZight-built-with-React, but that's a long way off). The best way of learning something is by mini-projects, so recently that's what I've been doing! So, when it was pointed out to me last week that my [bus display in the University of Auckland's Science Buildling]() is broken---turns out it has been since January!---I thought "Ooh, another mini-react-project!".

The previous build of the display (shown below) used the old [Mapbox]() and drew the points with that directly. Everything else was javascript and [Sass]() (big thanks to [@consindo]() for [making it pretty]()). But the other huge huge problem with that build was that the system was overly complicated (as I was both learning several technologies, trying to deploy as quickly as possible, and to get around access control issues within the UoA network). That process was something like this:

1. Office desktop fetches latest GTFS updates, saves to dropbox
2. VM running on UoA systems processes the updates to calculate some stats (and smoothing-values-over-time), and places a file back into the dropbox
3. Javascript app fetches data from the dropbox and displays the data using mapbox+javascript

At some point, the office desktop stopped sending new data to the dropbox, and the VM is no longer processing the updates, so the app has been displaying the same data for about 4 months. My bad; let's fix it!

![](/post/busdisplay-old.png)

### React

Simply, react lets you write an interface with small component pieces, and data (!!) is passed from parent to child. When the child recieves new data, it re-renders to display the new data. React is used (was developed by) by Facebook, and many other apps, and works pretty well. It's fairly easy to learn, and there are loads of tutorials on the internet (particularly Youtube) with follow-along project builds. Essentially you can think of it as a "data-driven interface" (where usually the data is comments, posts, likes, etc, but could be, for example, bus locations).

Using React, I fetch the latest public transport data from Auckland every 20 seconds and process the data by filtering out feries, vehicles more than 5 minutes old, vehicles without positions, etc. This is mapped into a nice array which can be passed around.


### Mapbox

Mapbox is a javascript library for displaying maps. Simple. It has some pretty cool features, and while integration with React wasn't super straightfoward, there are tutorials out there and it was easy enough. So, I created a component (I'm not going into details here) and passed the vehicle location data to it. It looks something like this:
```jsx
<AppContainer>
    <VehicleMap data={vehicles} />
</AppContainer>
```
The `VehicleMap` component uses Mapbox to create a full-screen map of Auckland, zoomed in on the central city, and styles it nicely. Then we need to draw the points ...

### d3

D3 is another javascript library for data-driven graphics. With it, you can design a graph with points/bars/whatever-you-like, and map that to some data. The exciting part comes when you *change* the data (which is what is happening here): D3 lets you specify *how* the visualisation should change, in my case transitioning points from their old location to a new one.

The d3 map uses functions from Mapbox to create a container overlaying the map, and a projection function to project points from latitude-longitude to x-y coordinates. Within the `VehicleMap` component, I use React's `useEffect()` method to handle changes to the `vehicles` data object. When that happens, the points are projected into x-y coordinates and the d3 circle elements are updated with the new data---new vehicles fade in, old vehicles fade away, and all the rest transition (linearly) from the previous position to the new one.


### React Bar graphs

On the right hand panel, there are a couple of bar graphs. These just use React all by itself. When new vehicle data is obtained, I cycle through and create two table array: `occupancy` and `delays`. These are then passed to bar graph components. The app now looks a little like this:
```jsx
<AppContainer>
    <VehicleMap data={vehicles} />
    <Sidebar>
        <Bargraph data={occupancy} label="Occupancy Status" />
        <Bargraph data={delays} label="Arrival and Departure Delays" />
    </Sidebar>
</AppContainer>
```

These are two calls to the same component: `Bargraph`. This component does some cool stuff using [styled-components]() and CSS positioning etc, but essentially this is how it looks inside:
```jsx
<BargraphContainer>
    <Label>{label}</Label>

    {data.map(d => (
        <Row>
            <Bar
                size={100 * (d.count / maxCount)}
                colour={d.colour}
                />
            <BarCount>{d.count}</BarCount>
            <BarLabel>{d.label}</BarLabel>
        </Row>
    ))}
</BargraphContainer>
```
There's a lot happening here, but essentially what it's doing is iterating over the `data` (which is an array of counts with labels and a colour) and for each is creating a row containing the label, count, and the graphical bar element. The element is a magical *styled component* and uses some nifty styling to get the bar size correct.
```jsx
const Bar = styled.div`
    /* A bunch of CSS */
    &:before {
        content: '';
        /* More silly CSS stuff */
        width: ${props => props.height}%;
        background: ${props => props.colour};
    }
`
```
So, the data is passed and the bar is resized accordingly. This could be used for any array of data, and with CSS transitions can animate nicely between states (in the bus-app case, usually the changes are minor so you can't see the bars moving).

***

And that's is: a fully self-container bus display using React, Mapbox, and D3! If you want to check it out, head to the display cabinets in the ground floor of the Science Center, Building 303, University of Auckland.
