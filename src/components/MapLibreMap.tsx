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
	});
	const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
	const [isAtAlps, setIsAtAlps] = useState(false);
	const [terrainStatus, setTerrainStatus] = useState<'loading' | 'loaded' | 'failed'>('loading');
	const mapRef = useRef<MapRef>(null);

	const handleMarkerClick = useCallback((marker: MapMarker) => {
		setSelectedMarker(marker);
	}, []);

	const handlePopupClose = useCallback(() => {
		setSelectedMarker(null);
	}, []);

	const handleToggleView = useCallback(() => {
		const map = mapRef.current?.getMap();
		if (!map) return;

		if (isAtAlps) {
			// Go back to initial view
			map.flyTo({
				center: [INITIAL_VIEW_STATE_GERMANY.longitude, INITIAL_VIEW_STATE_GERMANY.latitude],
				zoom: INITIAL_VIEW_STATE_GERMANY.zoom,
				pitch: INITIAL_VIEW_STATE_GERMANY.pitch,
				bearing: INITIAL_VIEW_STATE_GERMANY.bearing,
				duration: 1200,
			});
			setIsAtAlps(false);
		} else {
			// Go to Alps (Zugspitze)
			map.flyTo({
				center: [10.984, 47.421],
				zoom: 12.5,
				pitch: 75,
				bearing: -30,
				duration: 1200,
			});
			setIsAtAlps(true);
		}
	}, [isAtAlps]);

	// Add DEM source, sky, and enable terrain after the map loads
	useEffect(() => {
		const map = mapRef.current?.getMap();
		if (!map) return;

		let terrainRetryCount = 0;
		const maxRetries = 3;
		let sourceDataHandler: ((e: any) => void) | null = null;

		const enableTerrain = () => {
			try {
				// 2) Optional sky for depth cues
				if (!map.getLayer('sky')) {
					map.addLayer({
						id: 'sky',
						type: 'sky' as any,
						paint: { 'sky-type': 'atmosphere', 'sky-opacity': 1 } as any,
					});
				}

				// 3) Enable terrain
				map.setTerrain({ source: DEM_SOURCE_ID, exaggeration: 1.5 } as any);

				// 4) Optional: gentle light to enhance relief
				if (map.setLight) {
					map.setLight({ anchor: 'viewport', intensity: 0.6 } as any);
				}

				// 5) Optional: hillshade to make relief visible even from above
				if (!map.getLayer('hillshade')) {
					map.addLayer({
						id: 'hillshade',
						type: 'hillshade',
						source: DEM_SOURCE_ID,
						paint: { 'hillshade-exaggeration': 0.8 },
					});
				}

				console.log('Terrain enabled successfully');
				setTerrainStatus('loaded');
				
				// Remove the sourcedata handler once terrain is enabled
				if (sourceDataHandler) {
					map.off('sourcedata', sourceDataHandler);
					sourceDataHandler = null;
				}
			} catch (err) {
				console.error('Error enabling terrain:', err);
				// Retry terrain setup
				if (terrainRetryCount < maxRetries) {
					terrainRetryCount++;
					console.log(`Retrying terrain setup (${terrainRetryCount}/${maxRetries})...`);
					setTimeout(() => enableTerrain(), 1000);
				} else {
					setTerrainStatus('failed');
				}
			}
		};

		const onLoad = () => {
			try {
				// 1) DEM source (RGB-encoded, TileJSON)
				if (!map.getSource(DEM_SOURCE_ID)) {
					map.addSource(DEM_SOURCE_ID, {
						type: 'raster-dem',
						url: DEM_TILEJSON,
						tileSize: 256,
					});
				}

				// Wait for the source to be loaded before setting terrain
				sourceDataHandler = (e: any) => {
					if (e.sourceId === DEM_SOURCE_ID && e.isSourceLoaded) {
						enableTerrain();
					}
				};
				map.on('sourcedata', sourceDataHandler);

				// Fallback: Try to enable terrain after a delay even if sourcedata doesn't fire
				setTimeout(() => {
					if (map.getSource(DEM_SOURCE_ID) && !map.getTerrain()) {
						console.log('Fallback terrain initialization...');
						enableTerrain();
					}
				}, 3000);

				// (Optional) Quick sanity probe once tiles are idle:
				map.once('idle', () => {
					const elev = map.queryTerrainElevation?.([10.984, 47.421]); // Zugspitze
					// Should log a number (not null) if DEM tile loaded
					console.log('Sample terrain elevation (Zugspitze):', elev);
					
					// If terrain still not working, try one more time
					if (!elev && terrainRetryCount < maxRetries) {
						console.log('Terrain not detected, attempting final retry...');
						setTimeout(() => enableTerrain(), 1000);
					} else if (!elev) {
						setTerrainStatus('failed');
					}
				});
			} catch (err) {
				console.error('Error in terrain setup:', err);
			}
		};

		if (map.loaded()) onLoad();
		else map.once('load', onLoad);

		return () => {
			map.off('load', onLoad);
			if (sourceDataHandler) {
				map.off('sourcedata', sourceDataHandler);
			}
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
								backgroundColor: marker.title.includes('Zugspitze') || marker.title.includes('Berchtesgaden') || marker.title.includes('Black Forest') ? '#4CAF50' : '#ff6b6b',
								width: 24,
								height: 24,
								borderRadius: '50%',
								border: '3px solid white',
								cursor: 'pointer',
								boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: '12px',
								color: 'white',
								fontWeight: 'bold',
								transition: 'all 0.2s ease',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = 'scale(1.2)';
								e.currentTarget.style.zIndex = '1000';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = 'scale(1)';
								e.currentTarget.style.zIndex = 'auto';
							}}
						>
							{marker.title.includes('Zugspitze') ? '🏔️' : 
							 marker.title.includes('Berchtesgaden') ? '🏞️' : 
							 marker.title.includes('Black Forest') ? '🌲' : 
							 marker.title.includes('Berlin') ? '🏛️' :
							 marker.title.includes('Düsseldorf') ? '🏢' : '⛪'}
						</div>
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

			{/* Toggle button to switch between Alps and initial view */}
			<button
				onClick={handleToggleView}
				style={{
					position: 'absolute',
					top: 10,
					right: 10,
					zIndex: 1000,
					padding: '8px 12px',
					borderRadius: 6,
					border: '1px solid #ddd',
					cursor: 'pointer',
					backgroundColor: isAtAlps ? '#4CAF50' : 'white',
					color: isAtAlps ? 'white' : 'black',
					transition: 'all 0.2s ease',
				}}
			>
				{isAtAlps ? '🏠 Back to Overview' : '🏔️ Go to Alps'}
			</button>

			{/* Terrain status indicator */}
			{terrainStatus !== 'loaded' && (
				<div
					style={{
						position: 'absolute',
						top: 10,
						left: 10,
						zIndex: 1000,
						padding: '8px 12px',
						borderRadius: 6,
						backgroundColor: terrainStatus === 'loading' ? '#2196F3' : '#f44336',
						color: 'white',
						fontSize: '14px',
						fontWeight: 'bold',
						boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
					}}
				>
					{terrainStatus === 'loading' ? '⏳ Loading Terrain...' : '⚠️ Terrain Failed'}
				</div>
			)}
		</div>
	);
}
