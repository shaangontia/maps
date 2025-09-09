import type { MapMarker } from '@/types';

export const GERMAN_MARKERS: MapMarker[] = [
	{
		id: '1',
		longitude: 13.405,
		latitude: 52.52,
		title: 'Berlin',
		content: `# Berlin 🇩🇪
		
The capital and largest city of Germany.

## Key Features:
- Population: ~3.7 million
- Historic landmarks: Brandenburg Gate, Berlin Wall
- Political center of Germany
- \`const city = "vibrant";\`

### Must-see attractions:
1. Brandenburg Gate
2. Museum Island
3. East Side Gallery
4. Reichstag Building

> "The capital of Germany"`,
	},
	{
		id: '2',
		longitude: 6.7735,
		latitude: 51.2277,
		title: 'Düsseldorf',
		content: `# Düsseldorf 🏢

Fashion and art capital of Germany.

## Highlights:
- **Königsallee**: Luxury shopping street
- **Old Town**: Historic charm with breweries
- **Rhine Tower**: Panoramic city views
- Major business hub

\`\`\`javascript
const duesseldorf = {
  fashion: "world-class",
  art: "renowned",
  business: "thriving"
};
\`\`\`

*Home to Germany's largest Japanese community in Europe!*`,
	},
	{
		id: '3',
		longitude: 6.9603,
		latitude: 50.9375,
		title: 'Cologne (Köln)',
		content: `# Cologne (Köln) ⛪

One of Germany's oldest cities with over 2,000 years of history.

## Facts:
- **Cologne Cathedral**: UNESCO World Heritage Site
- Over **1 million** residents
- Cultural capital of the Rhineland
- Major media center

### Famous landmarks:
- Cologne Cathedral (Kölner Dom)
- Roman-Germanic Museum
- Ludwig Museum
- Hohenzollern Bridge

> "The secret capital of Germany" - Local saying`,
	},
	{
		id: '4',
		longitude: 10.984,
		latitude: 47.421,
		title: 'Zugspitze',
		content: `# Zugspitze 🏔️

Germany's highest peak at 2,962 meters above sea level.

## Mountain Facts:
- **Elevation**: 2,962m (9,718 ft)
- **Location**: Bavarian Alps
- **Border**: Germany-Austria
- **Access**: Cable car and cogwheel train

### Activities:
- Skiing and snowboarding
- Hiking and mountaineering
- Panoramic viewing platform
- Glacier experience

> Standing on top of Germany! 🇩🇪`,
	},
	{
		id: '5',
		longitude: 12.6269,
		latitude: 47.7295,
		title: 'Berchtesgaden',
		content: `# Berchtesgaden 🏞️

Alpine town in the Bavarian Alps near Salzburg.

## Highlights:
- **Königssee**: Crystal clear alpine lake
- **Eagle's Nest**: Historic mountain retreat
- **Salt Mine**: Underground adventure
- **National Park**: Pristine wilderness

### Natural Beauty:
- Dramatic mountain landscapes
- Pristine alpine lakes
- Traditional Bavarian culture
- World-class hiking trails

*Gateway to the German Alps!*`,
	},
	{
		id: '6',
		longitude: 7.7389,
		latitude: 47.999,
		title: 'Black Forest',
		content: `# Black Forest (Schwarzwald) 🌲

Dense forested mountain range in Baden-Württemberg.

## Features:
- **Cuckoo Clocks**: Traditional craftsmanship
- **Hiking Trails**: Over 24,000 km of paths
- **Thermal Spas**: Natural hot springs
- **Black Forest Cake**: Culinary origin

### Activities:
- Forest hiking and biking
- Spa and wellness tourism
- Traditional craft workshops
- Scenic driving routes

> Home of the famous Black Forest cake! 🍰`,
	},
];

export const INITIAL_VIEW_STATE_GERMANY = {
	longitude: 10.4515,
	latitude: 51.1657,
	zoom: 6,
	pitch: 60,
	bearing: -20,
};
