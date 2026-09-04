/**
 * Small inline SVG icon set. Used in place of stock photography — no client
 * photos are available yet, and these are simple, honest line-art marks
 * rather than anything that could be mistaken for a real photo.
 */

export type IconProps = {
  className?: string;
};

function base(children: React.ReactNode, props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function BrakeIcon(props: IconProps) {
  return base(
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.25" />
      <path d="M12 3v2.5M12 18.5V21M21 12h-2.5M5.5 12H3M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4 5.6 5.6" />
    </>,
    props,
  );
}

export function ExhaustIcon(props: IconProps) {
  return base(
    <>
      <path d="M3 15h7l2-2h4a3 3 0 0 1 0 6h-2" />
      <circle cx="19" cy="17" r="2" />
      <path d="M3 15v-2" />
    </>,
    props,
  );
}

export function EngineIcon(props: IconProps) {
  return base(
    <>
      <rect x="3" y="9" width="11" height="8" rx="1" />
      <path d="M14 11h3v4h-3M17 12h2M17 15h2M6 9V6h4v3M9 6V4" />
    </>,
    props,
  );
}

export function TransmissionIcon(props: IconProps) {
  return base(
    <>
      <rect x="4" y="6" width="9" height="12" rx="1.5" />
      <path d="M13 9h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4" />
      <path d="M8.5 9v6M6.5 12h4" />
    </>,
    props,
  );
}

export function OilIcon(props: IconProps) {
  return base(
    <>
      <path d="M12 3s5 5.5 5 10a5 5 0 0 1-10 0c0-4.5 5-10 5-10Z" />
      <path d="M9.7 13.5a2.3 2.3 0 0 0 2.3 2.3" />
    </>,
    props,
  );
}

export function ElectricalIcon(props: IconProps) {
  return base(<path d="M12.5 2 4 14h6l-1.5 8L20 10h-6l-1-8Z" strokeLinejoin="round" />, props);
}

export function DiagnosticsIcon(props: IconProps) {
  return base(
    <>
      <rect x="3" y="4" width="18" height="13" rx="1.5" />
      <path d="M6 20h12M9 17v3M15 17v3" />
      <path d="M6 10h2l1.5-3 2 6L13 9l1.2 3H18" />
    </>,
    props,
  );
}

export function SuspensionIcon(props: IconProps) {
  return base(
    <>
      <path d="M7 3v4M7 17v4M7 7c0 1.5 2 1.5 2 3s-2 1.5-2 3 2 1.5 2 3-2 1.5-2 3" />
      <circle cx="17" cy="17" r="3.5" />
      <path d="M17 5v9" />
    </>,
    props,
  );
}

export function SteeringIcon(props: IconProps) {
  return base(
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="1.75" />
      <path d="M12 5.5v5M6.4 15.7l4.2-2.4M17.6 15.7l-4.2-2.4" />
    </>,
    props,
  );
}

export function AlignmentIcon(props: IconProps) {
  return base(
    <>
      <path d="M12 3v18M6 3v18M18 3v18" strokeDasharray="1.5 3" />
      <path d="M4 8h4M16 8h4M4 16h4M16 16h4" />
    </>,
    props,
  );
}

export function CoolingIcon(props: IconProps) {
  return base(
    <>
      <rect x="4" y="4" width="12" height="16" rx="1.5" />
      <path d="M7 8h6M7 12h6M7 16h6M17 9l3-2M20 7v4M17 15l3 2M20 17v-4" />
    </>,
    props,
  );
}

export function ClimateIcon(props: IconProps) {
  return base(
    <>
      <path d="M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9" />
      <circle cx="12" cy="12" r="2" />
    </>,
    props,
  );
}

export function BatteryIcon(props: IconProps) {
  return base(
    <>
      <rect x="3" y="8" width="16" height="10" rx="1.5" />
      <path d="M19 11h2v4h-2" />
      <path d="M8 11v4M13 8v-1.5M13 6.5h2M13 6.5h-2" />
    </>,
    props,
  );
}

export function WrenchIcon(props: IconProps) {
  return base(
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3 18l3 3 6.6-6.3a4 4 0 0 0 5.1-5.4l-2.8 2.8-2-2 2.8-2.8Z" strokeLinejoin="round" />,
    props,
  );
}

export function PhoneIcon(props: IconProps) {
  return base(
    <path d="M6.6 3.5 9 6.2c.4.4.4 1 .1 1.5L7.6 9.9a11.7 11.7 0 0 0 6.5 6.5l2.2-1.5c.5-.3 1.1-.3 1.5.1l2.7 2.4c.5.5.5 1.3-.1 1.7l-2 1.5a2.5 2.5 0 0 1-2.3.4C10 18.8 5.2 14 3 8.9a2.5 2.5 0 0 1 .4-2.3l1.5-2c.4-.6 1.2-.6 1.7-.1Z" strokeLinejoin="round" />,
    props,
  );
}

export function MapPinIcon(props: IconProps) {
  return base(
    <>
      <path d="M12 21s7-6.6 7-11.5A7 7 0 0 0 5 9.5C5 14.4 12 21 12 21Z" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.25" />
    </>,
    props,
  );
}

export function ClockIcon(props: IconProps) {
  return base(
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>,
    props,
  );
}

export function CheckIcon(props: IconProps) {
  return base(<path d="M4.5 12.5 9 17l10.5-11" />, props);
}

export function ChevronRightIcon(props: IconProps) {
  return base(<path d="M9 5.5 15.5 12 9 18.5" />, props);
}

export function ImageIcon(props: IconProps) {
  return base(
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="M21 16.5 15.7 11a1.5 1.5 0 0 0-2.15.04L4 20.5" />
    </>,
    props,
  );
}

export function MenuIcon(props: IconProps) {
  return base(<path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />, props);
}

export function CloseIcon(props: IconProps) {
  return base(<path d="M5 5l14 14M19 5 5 19" />, props);
}

export const SERVICE_ICONS: Record<string, (props: IconProps) => React.ReactElement> = {
  brake: BrakeIcon,
  exhaust: ExhaustIcon,
  engine: EngineIcon,
  transmission: TransmissionIcon,
  oil: OilIcon,
  electrical: ElectricalIcon,
  diagnostics: DiagnosticsIcon,
  suspension: SuspensionIcon,
  steering: SteeringIcon,
  alignment: AlignmentIcon,
  cooling: CoolingIcon,
  climate: ClimateIcon,
  battery: BatteryIcon,
  wrench: WrenchIcon,
};
