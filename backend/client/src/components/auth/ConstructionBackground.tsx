/**
 * Construction/Working Space Themed Background
 * Features abstract architectural elements, blueprint patterns, and tech-inspired design
 */
export function ConstructionBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* SVG Background with Construction Theme */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* Grid Pattern - Blueprint style */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(30, 41, 59, 0.3)" strokeWidth="0.5"/>
          </pattern>
          
          {/* Gradient for architectural lines */}
          <linearGradient id="archGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(100, 116, 139, 0.15)" />
            <stop offset="100%" stopColor="rgba(15, 23, 42, 0)" />
          </linearGradient>
          
          {/* Blueprint grid accent */}
          <pattern id="blueprintDots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="rgba(71, 85, 105, 0.2)" />
          </pattern>
        </defs>

        {/* Base grid background */}
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Architectural lines - Server rack inspired */}
        <g strokeLinecap="round">
          {/* Left vertical lines */}
          <line x1="5%" y1="10%" x2="5%" y2="90%" stroke="rgba(71, 85, 105, 0.2)" strokeWidth="2" />
          <line x1="8%" y1="15%" x2="8%" y2="85%" stroke="rgba(71, 85, 105, 0.15)" strokeWidth="1.5" />
          
          {/* Right vertical lines */}
          <line x1="95%" y1="10%" x2="95%" y2="90%" stroke="rgba(71, 85, 105, 0.2)" strokeWidth="2" />
          <line x1="92%" y1="15%" x2="92%" y2="85%" stroke="rgba(71, 85, 105, 0.15)" strokeWidth="1.5" />
          
          {/* Horizontal connection lines */}
          <line x1="5%" y1="30%" x2="95%" y2="30%" stroke="rgba(100, 116, 139, 0.1)" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="5%" y1="50%" x2="95%" y2="50%" stroke="rgba(100, 116, 139, 0.1)" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="5%" y1="70%" x2="95%" y2="70%" stroke="rgba(100, 116, 139, 0.1)" strokeWidth="1" strokeDasharray="5,5" />
        </g>

        {/* Blueprint dots pattern overlay */}
        <rect width="100%" height="100%" fill="url(#blueprintDots)" />

        {/* Accent geometric shapes - Control panel inspired */}
        {/* Top left corner accent */}
        <g opacity="0.08">
          <rect x="5%" y="5%" width="15%" height="20%" fill="none" stroke="rgba(71, 85, 105, 0.5)" strokeWidth="2" />
          <line x1="5%" y1="10%" x2="20%" y2="10%" stroke="rgba(71, 85, 105, 0.4)" strokeWidth="1" />
          <line x1="5%" y1="15%" x2="20%" y2="15%" stroke="rgba(71, 85, 105, 0.3)" strokeWidth="1" />
          <circle cx="8%" cy="18%" r="1.5" fill="none" stroke="rgba(71, 85, 105, 0.4)" strokeWidth="1" />
          <circle cx="12%" cy="18%" r="1.5" fill="none" stroke="rgba(71, 85, 105, 0.4)" strokeWidth="1" />
          <circle cx="16%" cy="18%" r="1.5" fill="none" stroke="rgba(71, 85, 105, 0.4)" strokeWidth="1" />
        </g>

        {/* Bottom right corner accent */}
        <g opacity="0.08">
          <rect x="75%" y="70%" width="20%" height="25%" fill="none" stroke="rgba(71, 85, 105, 0.5)" strokeWidth="2" />
          <line x1="75%" y1="75%" x2="95%" y2="75%" stroke="rgba(71, 85, 105, 0.4)" strokeWidth="1" />
          <line x1="75%" y1="80%" x2="95%" y2="80%" stroke="rgba(71, 85, 105, 0.4)" strokeWidth="1" />
          <line x1="75%" y1="85%" x2="95%" y2="85%" stroke="rgba(71, 85, 105, 0.3)" strokeWidth="1" />
        </g>

        {/* Diagonal accent lines - Blueprint architectural style */}
        <g opacity="0.06" strokeLinecap="round">
          <line x1="0%" y1="20%" x2="30%" y2="50%" stroke="rgba(100, 116, 139, 0.6)" strokeWidth="1" />
          <line x1="70%" y1="50%" x2="100%" y2="80%" stroke="rgba(100, 116, 139, 0.6)" strokeWidth="1" />
        </g>

        {/* Tech elements - Illuminated points */}
        <g opacity="0.12">
          <circle cx="20%" cy="40%" r="2" fill="rgba(100, 116, 139, 0.8)" />
          <circle cx="80%" cy="60%" r="2" fill="rgba(100, 116, 139, 0.8)" />
          <circle cx="50%" cy="25%" r="2" fill="rgba(100, 116, 139, 0.7)" />
          <circle cx="35%" cy="75%" r="2" fill="rgba(100, 116, 139, 0.7)" />
        </g>

        {/* Glowing accent lines */}
        <g opacity="0.04" filter="url(#glow)">
          <line x1="25%" y1="35%" x2="75%" y2="35%" stroke="rgba(148, 163, 184, 0.8)" strokeWidth="2" />
          <line x1="40%" y1="60%" x2="60%" y2="75%" stroke="rgba(148, 163, 184, 0.6)" strokeWidth="1.5" />
        </g>
      </svg>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-900/40"></div>
    </div>
  );
}
