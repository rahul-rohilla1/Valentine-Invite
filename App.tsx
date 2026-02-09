
import React, { useState, useEffect } from 'react';
import Invitation from './components/Invitation';
import Celebration from './components/Celebration';
import BackgroundHearts from './components/BackgroundHearts';

export enum AppState {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED'
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.PENDING);
  const [personalNote, setPersonalNote] = useState<string>("");

  const handleAccept = (note: string) => {
    setPersonalNote(note);
    setState(AppState.ACCEPTED);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4">
      <BackgroundHearts />
      <div className="z-10 w-full max-w-lg">
        {state === AppState.PENDING ? (
          <Invitation onAccept={handleAccept} />
        ) : (
          <Celebration note={personalNote} />
        )}
      </div>
    </div>
  );
};

export default App;
