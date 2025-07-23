import dynamic from 'next/dynamic';

// Dynamic import with no SSR to prevent document/window errors
const ClientOnlyPage = dynamic(() => import('./components/ClientOnlyPage'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-white text-xl">Loading...</div>
    </div>
  ),
});

export default function Home() {
  return <ClientOnlyPage />;
}