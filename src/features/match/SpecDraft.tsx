'use client';

import type { ChampInfo } from '@/types/lol';
import type { JoinMessage } from '@/types/socket';
import useDraftSocket from '@/utils/DraftSocket';
import { useState } from 'react';
import DraftScreen from './DraftScreen';
import Header from './Header';

type Props = {
	roomID: string;
	champs: ChampInfo[];
};

const SpecDraft = ({ roomID, champs }: Props) => {
	const [submit, setSubmit] = useState(false);
	const { sendMessage, waitForConnect } = useDraftSocket();

	if (typeof window !== 'undefined') {
		if (roomID && !submit) {
			waitForConnect(() => {
				const payload: JoinMessage = {
					command: 'Join',
					name: '',
					team: 'Blue',
					isSpec: true,
					roomID,
				};
				sendMessage(JSON.stringify(payload));
				setSubmit(true);
			});
		}
	}

	return (
		<>
			<Header sendMessage={sendMessage} />
			<DraftScreen sendMessage={sendMessage} champs={champs} />
		</>
	);
};

export default SpecDraft;
