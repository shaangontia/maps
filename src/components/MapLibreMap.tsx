import { useCallback, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/maplibre';
import type { MapViewState, MapMarker } from '@/types';
import MarkdownPopup from './MarkdownPopup';
import 'maplibre-gl/dist/maplibre-gl.css';

const INITIAL_VIEW_STATE: MapViewState = {
	longitude: -74.006,
	latitude: 40.7128,
	zoom: 10,
};

// Sample markers with markdown content
const SAMPLE_MARKERS: MapMarker[] = [
	{
		id: '1',
		longitude: -74.006,
		latitude: 40.7128,
		title: 'New York City',
		content: `# Welcome to NYC! 🗽

This is **Manhattan**, the heart of New York City.

## Key Features:
- Population: ~8.3 million
- Famous landmarks: Times Square, Central Park
- \`const city = "amazing";\`

### Things to do:
1. Visit Central Park
2. See a Broadway show
3. Walk across Brooklyn Bridge

> "The city that never sleeps"`,
	},
	{
		id: '2',
		longitude: -73.935,
		latitude: 40.73,
		title: 'Brooklyn',
		content: `# Brooklyn Borough 🌉

A diverse and vibrant borough of NYC.

## Highlights:
- **Williamsburg**: Trendy neighborhood
- **DUMBO**: Great views of Manhattan
- **Coney Island**: Historic amusement park

\`\`\`javascript
const brooklyn = {
  vibe: "artistic",
  food: "amazing",
  views: "spectacular"
};
\`\`\`

*Home to the Brooklyn Bridge!*`,
	},
	{
		id: '3',
		longitude: -73.99,
		latitude: 40.75,
		title: 'Times Square',
		content: `# Times Square ✨

The crossroads of the world!

## Facts:
- Over **300,000** pedestrians daily
- Bright LED billboards 24/7
- Theater district nearby

### Popular shows:
- The Lion King
- Hamilton
- Wicked

> "The most visited tourist attraction in the world"`,
	},
];

export default function MapLibreMap() {
	const [viewState, setViewState] = useState<MapViewState>(INITIAL_VIEW_STATE);
	const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);

	const handleMarkerClick = useCallback((marker: MapMarker) => {
		setSelectedMarker(marker);
	}, []);

	const handlePopupClose = useCallback(() => {
		setSelectedMarker(null);
	}, []);

	return (
		<div style={{ width: '100%', height: '100%' }}>
			<Map
				{...viewState}
				onMove={(evt) => setViewState(evt.viewState)}
				style={{ width: '100%', height: '100%' }}
				mapStyle='https://demotiles.maplibre.org/style.json'
				attributionControl={true}
			>
				{SAMPLE_MARKERS.map((marker) => (
					<Marker
						key={marker.id}
						longitude={marker.longitude}
						latitude={marker.latitude}
						anchor='bottom'
						onClick={() => handleMarkerClick(marker)}
					>
						<div
							style={{
								backgroundColor: '#ff6b6b',
								width: 20,
								height: 20,
								borderRadius: '50%',
								border: '2px solid white',
								cursor: 'pointer',
								boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
							}}
						/>
					</Marker>
				))}

				{selectedMarker && (
					<Popup
						longitude={selectedMarker.longitude}
						latitude={selectedMarker.latitude}
						anchor='top'
						onClose={handlePopupClose}
						closeButton={false}
						closeOnClick={false}
					>
						<MarkdownPopup marker={selectedMarker} onClose={handlePopupClose} />
					</Popup>
				)}
			</Map>
		</div>
	);
}
