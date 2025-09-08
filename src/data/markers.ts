import type { MapMarker } from '@/types';

export const GERMAN_MARKERS: MapMarker[] = [
	{
		id: '1',
		longitude: 13.4050,
		latitude: 52.5200,
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

> "Poor but sexy" - Former mayor Klaus Wowereit`,
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
];

export const INITIAL_VIEW_STATE_GERMANY = {
	longitude: 10.4515,
	latitude: 51.1657,
	zoom: 6,
};
