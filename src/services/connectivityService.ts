import * as Network from "expo-network";

/**
 * Servicio para detectar el estado de conectividad a internet
 */
export interface NetworkState {
	isConnected: boolean;
	isInternetReachable: boolean | null;
	type: string;
}

type ConnectivityListener = (state: NetworkState) => void;

class ConnectivityService {
	private listeners: Set<ConnectivityListener> = new Set();
	private currentState: NetworkState = {
		isConnected: false,
		isInternetReachable: null,
		type: "unknown",
	};

	constructor() {
		this.initialize();
	}

	/**
	 * Inicializar el servicio y obtener estado inicial
	 */
	private async initialize(): Promise<void> {
		try {
			await this.checkConnectivity();

			// TODO: ver si es necesario agregar un listener global para cambios de red
		} catch (error) {
			console.error("Error inicializando ConnectivityService:", error);
		}
	}

	/**
	 * Verificar el estado actual de conectividad
	 */
	async checkConnectivity(): Promise<NetworkState> {
		try {
			const state = await Network.getNetworkStateAsync();

			this.currentState = {
				isConnected: state.isConnected ?? false,
				isInternetReachable: state.isInternetReachable ?? null,
				type: state.type || "unknown",
			};

			return this.currentState;
		} catch (error) {
			console.error("Error verificando conectividad:", error);
			return this.currentState;
		}
	}

	/**
	 * Obtener estado actual
	 */
	getCurrentState(): NetworkState {
		return this.currentState;
	}

	/**
	 * Verificar si hay conexión a internet
	 */
	async isOnline(): Promise<boolean> {
		const state = await this.checkConnectivity();
		return state.isConnected && state.isInternetReachable !== false;
	}

	/**
	 * Verificar si está offline
	 */
	async isOffline(): Promise<boolean> {
		const online = await this.isOnline();
		return !online;
	}

	/**
	 * Suscribirse a cambios de conectividad
	 */
	subscribe(listener: ConnectivityListener): () => void {
		this.listeners.add(listener);

		return () => {
			this.listeners.delete(listener);
		};
	}

	/**
	 * Notificar a todos los listeners de cambios
	 */
	private notifyListeners(state: NetworkState): void {
		this.listeners.forEach((listener) => {
			try {
				listener(state);
			} catch (error) {
				console.error("Error en listener de conectividad:", error);
			}
		});
	}

	/**
	 * Obtener tipo de conexión (wifi, cellular, none, unknown)
	 */
	async getConnectionType(): Promise<string> {
		const state = await this.checkConnectivity();
		return state.type;
	}

	/**
	 * Verificar si está conectado a WiFi
	 */
	async isWiFi(): Promise<boolean> {
		const type = await this.getConnectionType();
		return type === "WIFI";
	}

	/**
	 * Verificar si está conectado a datos móviles
	 */
	async isCellular(): Promise<boolean> {
		const type = await this.getConnectionType();
		return type === "CELLULAR";
	}
}

export const connectivityService = new ConnectivityService();
