import { Loader2 } from 'lucide-react';

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="text-center">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mb-4 mx-auto" />
        <p className="text-zinc-400">Loading...</p>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-zinc-800/80 rounded-2xl p-6 border border-white/10 animate-pulse">
      <div className="h-4 bg-zinc-700 rounded w-3/4 mb-4"></div>
      <div className="h-3 bg-zinc-700 rounded w-1/2 mb-6"></div>
      <div className="space-y-2">
        <div className="h-3 bg-zinc-700 rounded"></div>
        <div className="h-3 bg-zinc-700 rounded w-5/6"></div>
        <div className="h-3 bg-zinc-700 rounded w-4/5"></div>
      </div>
      <div className="mt-6 h-10 bg-zinc-700 rounded"></div>
    </div>
  );
}

export function ListSkeleton({ items = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="bg-zinc-800/80 rounded-lg p-4 border border-white/10 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-zinc-700 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-zinc-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-zinc-700 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ButtonSkeleton() {
  return (
    <div className="h-10 bg-zinc-700 rounded-lg animate-pulse w-32"></div>
  );
}
