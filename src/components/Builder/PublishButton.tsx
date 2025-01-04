import React, { useState } from 'react';
import { Rocket, ExternalLink, Loader } from 'lucide-react';
import { BuilderState } from '../../types/builder';
import { deployWebsite } from '../../services/deployment';
import { auth } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';

interface PublishButtonProps {
  state: BuilderState;
}

export function PublishButton({ state }: PublishButtonProps) {
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deployedUrls, setDeployedUrls] = useState<{
    url: string;
    deployId: string;
    projectId: string;
    claimUrl?: string;
  } | null>(null);
  const { user } = useAuth();

  const handlePublish = async () => {
    setIsPublishing(true);
    setError(null);

    // Check if user is authenticated
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setError('Please sign in to publish your website');
      setIsPublishing(false);
      return;
    }

    try {
      const result = await deployWebsite({
        state,
        deployId: deployedUrls?.deployId,
        projectId: deployedUrls?.projectId
      });
      setDeployedUrls(result);
    } catch (error) {
      console.error('Failed to publish:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
    } finally {
      setIsPublishing(false);
    }
  };

  if (error) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-red-400 bg-red-950/50 px-4 py-2 rounded-lg">{error}</p>
        <button
          onClick={handlePublish}
          className="px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (deployedUrls) {
    return (
      <div className="space-y-4 text-center">
        <div className="flex items-center justify-center gap-4">
          <a
            href={deployedUrls.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-all duration-300"
          >
            View Site <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={handlePublish}
            className="px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all duration-300"
          >
            Republish
          </button>
        </div>
        {deployedUrls.claimUrl && (
          <a
            href={deployedUrls.claimUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white/80 text-sm underline"
          >
            Transfer to your Netlify account
          </a>
        )}
        <p className="text-white/60 text-sm">
          Your site is live! You can continue editing and republish at any time.
        </p>
      </div>
    );
  }

  return (
    <button
      onClick={handlePublish}
      disabled={isPublishing || !state.project.pageUrl}
      className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-white to-white/90 text-black font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
    >
      {isPublishing ? (
        <>
          <Loader className="w-5 h-5 animate-spin" />
          Publishing...
        </>
      ) : (
        <>
          <Rocket className="w-5 h-5" />
          Publish Website
        </>
      )}
    </button>
  );
}