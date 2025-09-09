import { useCallback, useState, useEffect, useRef } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/maplibre';
import type { MapRef } from 'react-map-gl/maplibre';
import type { MapViewState, MapMarker } from '@/types';
import MarkdownPopup from './MarkdownPopup';
import { GERMAN_MARKERS, INITIAL_VIEW_STATE_GERMANY } from '../data/markers';
import 'maplibre-gl/dist/maplibre-gl.css';

const DEM_SOURCE_ID = 'terrain-dem';
const DEM_TILEJSON = 'https://demotiles.maplibre.org/terrain-tiles/tiles.json';

export default function MapLibreMap() {
	const [viewState, setViewState] = useState<MapViewState>({
		...INITIAL_VIEW_STATE_GERMANY,
		// Ensure we start with some pitch/bearing so relief is visible
		pitch: INITIAL_VIEW_STATE_GERMANY.pitch ?? 70,
		bearing: INITIAL_VIEW_STATE_GERMANY.bearing ?? -20,
	});
	const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
	const mapRef = useRef<MapRef>(null);

	const handleMarkerClick = useCallback((marker: MapMarker) => {
		setSelectedMarker(marker);
	}, []);

	const handlePopupClose = useCallback(() => {
		setSelectedMarker(null);
	}, []);

	// Add DEM source, sky, and enable terrain after the map loads
	useEffect(() => {
		const map = mapRef.current?.getMap();
		if (!map) return;

		const onLoad = () => {
			try {
				// 1) DEM source (RGB-encoded, TileJSON)
				if (!map.getSource(DEM_SOURCE_ID)) {
					map.addSource(DEM_SOURCE_ID, {
						type: 'raster-dem',
						url: DEM_TILEJSON,
						tileSize: 256,
					} as any);
				}

				// 2) Optional sky for depth cues
				if (!map.getLayer('sky')) {
					map.addLayer({
						id: 'sky',
						type: 'sky',
						paint: { 'sky-type': 'atmosphere', 'sky-opacity': 1 },
					} as any);
				}

				// 3) Enable terrain
				map.setTerrain({ source: DEM_SOURCE_ID, exaggeration: 1.8 } as any);

				// 4) Optional: gentle light to enhance relief
				map.setLight?.({ anchor: 'viewport', intensity: 0.6 } as any);

				// 5) Ensure camera has enough pitch (in case initial state had none)
				map.easeTo({ pitch: 70, bearing: -20, duration: 0 });

				// 6) Optional: hillshade to make relief visible even from above
				if (!map.getLayer('hillshade')) {
					map.addLayer(
						{
							id: 'hillshade',
							type: 'hillshade',
							source: DEM_SOURCE_ID,
							paint: { 'hillshade-exaggeration': 0.6 },
						} as any,
						/* insert before labels if desired */ undefined
					);
				}

				// (Optional) Quick sanity probe once tiles are idle:
				map.once('idle', () => {
					const elev = (map as any).queryTerrainElevation?.([10.984, 47.421]); // Zugspitze
					// Should log a number (not null) if DEM tile loaded
					console.log('Sample terrain elevation (Zugspitze):', elev);
				});
			} catch (err) {
				console.error('Error enabling terrain:', err);
			}
		};

		if (map.loaded()) onLoad();
		else map.once('load', onLoad);

		return () => {
			map.off('load', onLoad);
		};
	}, []);

	return (
		<div style={{ width: '100%', height: '100%' }}>
			<Map
				ref={mapRef}
				{...viewState}
				onMove={(evt) => setViewState(evt.viewState)}
				style={{ width: '100%', height: '100%' }}
				mapStyle='https://demotiles.maplibre.org/style.json'
				attributionControl={true}
				maxPitch={85}
				antialias={true}
			>
				{GERMAN_MARKERS.map((marker) => (
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

			{/* Optional: a tiny debug button to prove 3D instantly */}
			<button
				onClick={() => {
					const map = mapRef.current?.getMap();
					if (!map) return;
					// Fly to the Alps (Zugspitze) so the relief is obvious
					map.flyTo({
						center: [10.984, 47.421],
						zoom: 12.5,
						pitch: 75,
						bearing: -30,
						duration: 1200,
					});
				}}
				style={{
					position: 'absolute',
					top: 10,
					right: 10,
					zIndex: 1000,
					padding: '8px 12px',
					borderRadius: 6,
					border: '1px solid #ddd',
					background: 'white',
					cursor: 'pointer',
				}}
			>
				🏔️ Go to Alps
			</button>
		</div>
	);
}
