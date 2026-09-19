import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ExternalLink } from 'lucide-react';

interface Video {
  id: number;
  clientId: number;
  shootId: number;
  videoLink: string;
  status: string;
  assignedEditorId: number;
  thumbnailLink: string;
  clientFeedback: string;
  revisionCount: number;
}

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    axios.get('/api/videos').then(res => setVideos(res.data)).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold border-b border-[#333] pb-2">Core Video Production Pipeline</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map(v => (
          <div key={v.id} className="bg-[#1a1a1a] p-0 rounded-lg border border-[#333] overflow-hidden flex flex-col">
            <div className="h-32 bg-[#222] flex items-center justify-center border-b border-[#333]" style={{ backgroundImage: `url(${v.thumbnailLink})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
               {!v.thumbnailLink && <span className="text-gray-500 font-medium">Video Preview #{v.id}</span>}
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Client: {v.clientId} | Shoot: {v.shootId}</span>
                <span className="px-2 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded text-xs">{v.status}</span>
              </div>
              
              <div className="text-xs text-gray-500 mt-2">
                <p>Assigned Editor: #{v.assignedEditorId || 'Unassigned'}</p>
                <p>Revisions: {v.revisionCount || 0}</p>
              </div>

              {v.clientFeedback && (
                <div className="mt-2 p-2 bg-[#222] border border-[#444] rounded text-xs text-gray-400 italic">
                  "{v.clientFeedback}"
                </div>
              )}

              <a href={v.videoLink} target="_blank" rel="noreferrer" className="mt-2 flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors text-sm font-medium">
                <ExternalLink size={16} /> Open Final Video
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
