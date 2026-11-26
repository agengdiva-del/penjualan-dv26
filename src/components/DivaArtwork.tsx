import React from 'react';

export const DIVA_LOGO_URL = '/assets/aistudio/LOGO_DIVA_02_e555aa56.png';
export const GLOBAL_LOGO_URL = '/assets/aistudio/LOGO_GLOBAL__bbb94ab6.png';

export const DivaLogo: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  className = '',
  size = 'md',
}) => {
  const heightClass =
    size === 'sm'
      ? 'h-7'
      : size === 'lg'
        ? 'h-14'
        : 'h-9';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={DIVA_LOGO_URL}
        alt="DIVA"
        referrerPolicy="no-referrer"
        className={`${heightClass} w-auto object-contain`}
      />
    </div>
  );
};

export const GlobalWarnaEmblem: React.FC<{ className?: string }> = ({
  className = 'w-10 h-10',
}) => (
  <img
    src={GLOBAL_LOGO_URL}
    alt="PT. Global Warna Indonesia"
    referrerPolicy="no-referrer"
    className={`${className} object-contain select-none`}
  />
);

interface PaintCanVisualProps {
  accentColor: string;
  secondaryColor?: string;
  labelTitle: string;
  labelSubtitle: string;
  selectedSwatchHex?: string;
  sizeLabel?: string;
  className?: string;
}

export const PaintCanVisual: React.FC<PaintCanVisualProps> = ({
  accentColor,
  secondaryColor = '#60A5FA',
  labelTitle,
  labelSubtitle,
  selectedSwatchHex,
  sizeLabel,
  className = 'w-40 h-44',
}) => {
  const uid = React.useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 200 220" className={`${className} drop-shadow-sm`} aria-hidden="true">
      <defs>
        <linearGradient id={`canBody-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="18%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#F8FAFC" />
          <stop offset="85%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id={`lidGrad-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={accentColor} />
          <stop offset="40%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={accentColor} />
        </linearGradient>
      </defs>

      {/* Soft ground shadow */}
      <ellipse cx="100" cy="202" rx="68" ry="10" fill="#0F172A" opacity="0.14" />

      {/* Handle wire */}
      <path
        d="M 28 74 C 24 128, 176 128, 172 74"
        fill="none"
        stroke="#94A3B8"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Can cylindrical body */}
      <path
        d="M 32 54 L 36 188 C 36 198, 164 198, 164 188 L 168 54 Z"
        fill={`url(#canBody-${uid})`}
        stroke="#CBD5E1"
        strokeWidth="1.5"
      />

      {/* Bottom accent band */}
      <path
        d="M 35 162 C 62 170, 138 170, 165 162 L 164 188 C 164 198, 36 198, 36 188 Z"
        fill={accentColor}
      />

      {/* Decorative architectural wave on can label */}
      <path
        d="M 35 144 C 68 136, 132 152, 165 140 L 165 162 C 138 170, 62 170, 35 162 Z"
        fill={selectedSwatchHex || secondaryColor}
        opacity="0.92"
      />

      {/* Can top rim & colored lid */}
      <ellipse cx="100" cy="54" rx="70" ry="13" fill={accentColor} />
      <ellipse cx="100" cy="50" rx="70" ry="12" fill={`url(#lidGrad-${uid})`} />
      <ellipse cx="100" cy="48" rx="62" ry="8" fill="#FFFFFF" opacity="0.22" />

      {/* Metallic upper collar */}
      <path
        d="M 30 56 C 30 66, 170 66, 170 56"
        fill="none"
        stroke="#94A3B8"
        strokeWidth="2.5"
      />

      {/* Official DIVA & Global Warna logos printed on pail */}
      <image
        href={DIVA_LOGO_URL}
        x="62"
        y="68"
        width="76"
        height="34"
        preserveAspectRatio="xMidYMid meet"
      />
      <image
        href={GLOBAL_LOGO_URL}
        x="76"
        y="102"
        width="48"
        height="46"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* Label title & subtitle */}
      <text
        x="100"
        y="179"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontWeight="700"
        fontSize="13"
      >
        {labelTitle}
      </text>
      <text
        x="100"
        y="191"
        textAnchor="middle"
        fill="#F8FAFC"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontWeight="500"
        fontSize="8.5"
        opacity="0.9"
      >
        {labelSubtitle}
      </text>

      {/* Pack badge on corner if provided */}
      {sizeLabel && (
        <g transform="translate(132, 68)">
          <rect x="0" y="0" width="36" height="18" rx="4" fill="#0F172A" opacity="0.85" />
          <text
            x="18"
            y="12.5"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="'JetBrains Mono', monospace"
            fontWeight="600"
            fontSize="9"
          >
            {sizeLabel}
          </text>
        </g>
      )}
    </svg>
  );
};

interface RoomVisualizerProps {
  primaryWallHex: string;
  accentWallHex?: string;
  scene: 'interior' | 'eksterior' | 'kayu-besi';
}

export const RoomColorVisualizer: React.FC<RoomVisualizerProps> = ({
  primaryWallHex,
  accentWallHex = '#FACC15',
  scene,
}) => {
  const photoSrc =
    scene === 'eksterior'
      ? '/src/assets/images/banner_sales_house_1795599022506.jpg'
      : '/src/assets/images/photo_room_ivory_1795599022734.jpg';

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-200">
      <img
        src={photoSrc}
        alt={`Simulasi warna ${scene}`}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover"
      />
      {/* Subtle realistic color tint layer so selected swatches tint the real room photo */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-300 mix-blend-multiply opacity-55"
        style={{ backgroundColor: primaryWallHex }}
      />
      {scene !== 'kayu-besi' && (
        <div
          className="absolute right-0 top-0 bottom-0 w-1/4 pointer-events-none transition-colors duration-300 mix-blend-multiply opacity-35"
          style={{ backgroundColor: accentWallHex }}
        />
      )}
    </div>
  );
};
