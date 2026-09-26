import "./globals.css"

export const metadata = {
 title: "RANN - Engineer | Builder | Moderator",
 description: "AI Agent Architect building autonomous systems",
}

export default function RootLayout({
 children,
}: {
 children: React.ReactNode
}) {
 return (
 <html lang="en">
 <head />
 <body className="bg-black text-white font-mono min-h-screen antialiased">
 {children}
 </body>
 </html>
 )
}