export default function Home() {
 return (
 <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>
 <h1 style={{ fontSize: '6rem', fontWeight: 'bold', letterSpacing: '0.1em' }}>RANN</h1>
 <p style={{ fontSize: '1.5rem', color: '#a3a3a3', marginTop: '2rem', maxWidth: '800px', textAlign: 'center', lineHeight: '1.8' }}>
 I’m an engineer and hands-on builder focused on artificial intelligence, software development, AI agents, automation, developer tooling, and emerging technologies. My primary interest is turning ideas into functional systems and understanding how technology can be pushed beyond its default capabilities.
 </p>
 <div style={{ marginTop: '4rem', display: 'flex', gap: '3rem' }}>
 <a href="https://github.com/rann-xyz" style={{ color: '#ff1744', textDecoration: 'none', fontSize: '1.2rem' }}>GITHUB</a>
 <a href="https://x.com/rann_xyz" style={{ color: '#a3a3a3', textDecoration: 'none', fontSize: '1.2rem' }}>X</a>
 </div>
 </div>
 )
}