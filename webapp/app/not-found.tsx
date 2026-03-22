import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found-container glass" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem',
      marginTop: '4rem',
      borderRadius: '16px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ marginBottom: '2rem' }}>Page Not Found</h2>
      <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="btn-primary" style={{
        background: 'var(--primary-gradient)',
        padding: '0.8rem 2rem',
        borderRadius: '8px',
        color: 'white',
        textDecoration: 'none',
        fontWeight: 'bold'
      }}>
        Return Home
      </Link>
    </div>
  );
}
