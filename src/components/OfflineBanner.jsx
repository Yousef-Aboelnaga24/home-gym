import { Offline } from 'react-detect-offline';
import { WifiOff } from 'lucide-react';

export function OfflineBanner() {
  return (
    <Offline>
      <div className="bg-red-500/90 text-white px-4 py-2 flex items-center justify-center gap-2 sticky top-16 z-40 backdrop-blur-sm shadow-md">
        <WifiOff className="h-4 w-4" />
        <span className="text-sm font-medium">You are currently offline. Browsing in offline mode.</span>
      </div>
    </Offline>
  );
}
