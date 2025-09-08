export interface MapMarker {
  id: string;
  longitude: number;
  latitude: number;
  title: string;
  content: string;
}

export interface MapViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  bearing?: number;
  pitch?: number;
}

export interface MarkdownPopupProps {
  marker: MapMarker;
  onClose: () => void;
}
