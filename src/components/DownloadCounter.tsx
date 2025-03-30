import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { getDownloadCount } from '../services/analytics';

interface DownloadCounterProps {
  className?: string;
}

const DownloadCounter: React.FC<DownloadCounterProps> = ({ className = '' }) => {
  const [downloadCount, setDownloadCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDownloadCount = async () => {
      try {
        setIsLoading(true);
        const count = await getDownloadCount();
        setDownloadCount(count);
      } catch (error) {
        console.error('Error fetching download count:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDownloadCount();

    // Set up interval to refresh the count every 5 minutes
    const intervalId = setInterval(fetchDownloadCount, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Format the number with commas for thousands
  const formattedCount = downloadCount.toLocaleString();

  return (
    <div className={`flex items-center ${className}`}>
      <div className="bg-gray-700 rounded-lg px-4 py-2 flex items-center shadow-md">
        <Download className="h-4 w-4 text-[#00FFD1] mr-2" />
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Total Downloads</span>
          {isLoading ? (
            <div className="h-5 w-16 bg-gray-600 animate-pulse rounded"></div>
          ) : (
            <span className="font-bold text-[#00FFD1]">{formattedCount}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadCounter;
