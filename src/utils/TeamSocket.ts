import { useMyData } from '@/stores/MyData';
import { useTeamDataStore } from '@/stores/TeamData';
import type { TeamCreationData } from '@/types/team';
import { useEffect, useState } from 'react';

const useTeamSocket = (teamID: string) => {
	const [ws, setWs] = useState<WebSocket>();
	const setSpec = useMyData((state) => state.setSpec);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const url = `${process.env.NEXT_PUBLIC_WEBSOCKET_HOST}?teamID=${teamID}`;
		const socket = new WebSocket(url);
		setWs(socket);

		socket.onmessage = async (ev) => {
			const data: TeamCreationData = JSON.parse(ev.data);
			useTeamDataStore.setState(data);
		};
	}, []);

	const sendMessage = async (message: string) => {
		if (ws) ws.send(message);
	};

	const waitForConnect = (callback: () => void) => {
		setTimeout(() => {
			if (!ws) {
				waitForConnect(callback);
				return;
			}
			if (ws.readyState === 1) {
				if (callback) callback();
			} else waitForConnect(callback);
		}, 10);
	};

	return { sendMessage, waitForConnect };
};

export default useTeamSocket;
