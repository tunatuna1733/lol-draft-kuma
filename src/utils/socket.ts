import { usePhaseData } from '@/stores/PhaseData';
import { useRoomDataStore } from '@/stores/RoomData';
import { useMyData } from '@/stores/MyData';
import type { CurrentPhase, MakeSpec, ResultMessage, RoomData, StartPhase } from '@/types/room';
import { useEffect, useState } from 'react';

const useWebSocket = () => {
	const [ws, setWs] = useState<WebSocket>();
	const setSpec = useMyData((state) => state.setSpec);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const url = 'http://localhost:443';
		const socket = new WebSocket(url);
		setWs(socket);

		socket.onmessage = async (ev) => {
			const data: RoomData | StartPhase | CurrentPhase | ResultMessage | MakeSpec = JSON.parse(ev.data);
			if ('success' in data) {
				return;
			}
			if ('command' in data) {
				if (data.command === 'MakeSpec') {
					setSpec(true);
				} else usePhaseData.setState(data);
			} else {
				useRoomDataStore.setState(data);
			}
		};
	}, []);

	const sendMessage = async (message: string) => {
		if (ws) ws.send(message);
	};

	return { sendMessage };
};

export default useWebSocket;
