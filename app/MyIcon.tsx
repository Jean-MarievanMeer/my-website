import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import * as regularIcons from '@fortawesome/free-regular-svg-icons';
import * as brandIcons from '@fortawesome/free-brands-svg-icons';
import type {
  Icon,
  IconDefinition,
  IconProp,
} from '@fortawesome/fontawesome-svg-core';

export default function MyIcon({ outlet }: { outlet: React.ReactElement }) {
  const allIcons = {
    ...solidIcons,
    ...regularIcons,
    ...brandIcons,
  };

  interface IconProps {
    name: string;
    size?: string;
    color?: string;
    className?: string;
  }

  function Icon({
    name,
    size = '16px',
    color = 'currentColor',
    className,
  }: IconProps) {
    const iconKey = name.startsWith('fa')
      ? name
      : `fa${name.charAt(0).toUpperCase() + name.slice(1)}`;
    const icon: IconDefinition | null = allIcons[
      iconKey as keyof typeof allIcons
    ] as IconDefinition;
    if (!icon) {
      console.warn(`Icon "${name}" (${iconKey}) not found`);
      return null;
    }

    return (
      <>
        <FontAwesomeIcon
          icon={icon}
          style={{ fontSize: size, color }}
          className={className}
        />
      </>
    );
  }
}
