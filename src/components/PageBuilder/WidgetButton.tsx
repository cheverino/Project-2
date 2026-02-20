import { useState } from 'react';
import { PageBuilderSection } from '../../lib/pageBuilderTypes';
import { getButtonStyles } from '../../lib/designHelpers';

interface WidgetButtonProps {
  section: PageBuilderSection;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
}

export default function WidgetButton({
  section,
  href = '#',
  onClick,
  children,
  variant = 'primary',
  className = '',
}: WidgetButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const buttonStyles = getButtonStyles(section);
  const buttonHoverBg = section.design?.colors?.buttonBackgroundHover;

  const baseClasses = 'btn font-semibold';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
  };

  const combinedStyle = {
    ...buttonStyles,
    ...(isHovered && buttonHoverBg ? { backgroundColor: buttonHoverBg } : {}),
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={combinedStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </a>
  );
}
