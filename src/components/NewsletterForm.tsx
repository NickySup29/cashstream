import { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {status === 'success' ? (
        <div className="bg-white/10 border border-white/20 rounded-lg p-6 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
          <CheckCircle2 className="w-12 h-12 text-white mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
          <p className="text-white/80">Keep an eye on your inbox for our latest intelligence briefings.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              placeholder="Your email address" 
              className="flex-grow bg-on-primary/10 border border-on-primary/20 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors placeholder:text-on-primary/40 text-white disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={status === 'loading'}
              className="bg-on-primary text-primary px-8 py-3 rounded-lg font-bold hover:bg-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
            >
              {status === 'loading' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Subscribe'
              )}
            </button>
          </div>
          
          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-200 text-sm mt-2 justify-center">
              <AlertCircle className="w-4 h-4" />
              <p>{errorMessage}</p>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
