import { useCallback, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/maplibre';
import type { MapViewState, MapMarker } from '@/types';
import MarkdownPopup from './MarkdownPopup';
import { GERMAN_MARKERS, INITIAL_VIEW_STATE_GERMANY } from '../data/markers';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function MapLibreMap() {
	const [viewState, setViewState] = useState<MapViewState>(INITIAL_VIEW_STATE_GERMANY);
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
		</div>
	);
}
