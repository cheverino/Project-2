import { PageBuilderSection } from './pageBuilderTypes';

export function getButtonStyles(section: PageBuilderSection) {
  const design = section.design;

  return {
    backgroundColor: design.colors?.buttonBackground,
    color: design.colors?.buttonText,
    borderRadius: design.button?.borderRadius || '0.75rem',
    padding: design.button?.padding || '0.75rem 2rem',
  };
}

export function getButtonHoverStyles(section: PageBuilderSection) {
  const design = section.design;

  return {
    backgroundColor: design.colors?.buttonBackgroundHover || design.colors?.buttonBackground,
  };
}

export function getSectionContainerStyles(section: PageBuilderSection) {
  const design = section.design;
  const styles: React.CSSProperties = {};

  // Background
  if (design.background.type === 'color') {
    styles.backgroundColor = design.background.value;
  } else if (design.background.type === 'gradient') {
    styles.background = design.background.value;
  } else if (design.background.type === 'image') {
    styles.backgroundImage = `url(${design.background.value})`;
    styles.backgroundSize = design.background.size || 'cover';
    styles.backgroundPosition = design.background.position || 'center';
  }

  // Spacing
  styles.paddingTop = design.spacing.paddingTop;
  styles.paddingBottom = design.spacing.paddingBottom;
  styles.paddingLeft = design.spacing.paddingLeft;
  styles.paddingRight = design.spacing.paddingRight;
  styles.marginTop = design.spacing.marginTop;
  styles.marginBottom = design.spacing.marginBottom;

  // Border
  if (design.border?.width) {
    styles.borderWidth = design.border.width;
    styles.borderStyle = design.border.style || 'solid';
    styles.borderColor = design.border.color || '#e5e7eb';
    styles.borderRadius = design.border.radius;
  }

  // Shadow
  if (design.shadow?.size) {
    const shadowSizes = {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    };
    styles.boxShadow = design.shadow.custom || shadowSizes[design.shadow.size as keyof typeof shadowSizes] || shadowSizes.md;
  }

  // Layout
  if (design.layout?.maxWidth) {
    styles.maxWidth = design.layout.maxWidth;
    styles.marginLeft = 'auto';
    styles.marginRight = 'auto';
  }
  if (design.layout?.minHeight) {
    styles.minHeight = design.layout.minHeight;
  }

  // Effects
  if (design.effects?.opacity) {
    styles.opacity = design.effects.opacity;
  }
  if (design.effects?.transform) {
    styles.transform = design.effects.transform;
  }

  return styles;
}

export function getTypographyStyles(section: PageBuilderSection) {
  const design = section.design;
  const styles: React.CSSProperties = {};

  if (design.typography?.fontFamily) {
    styles.fontFamily = design.typography.fontFamily;
  }
  if (design.typography?.fontSize) {
    styles.fontSize = design.typography.fontSize;
  }
  if (design.typography?.lineHeight) {
    styles.lineHeight = design.typography.lineHeight;
  }

  return styles;
}

export function getHeadingStyles(section: PageBuilderSection) {
  const design = section.design;
  const styles: React.CSSProperties = {};

  if (design.typography?.headingColor) {
    styles.color = design.typography.headingColor;
  }
  if (design.typography?.headingSize) {
    styles.fontSize = design.typography.headingSize;
  }
  if (design.typography?.headingWeight) {
    styles.fontWeight = design.typography.headingWeight;
  }
  if (design.typography?.fontFamily) {
    styles.fontFamily = design.typography.fontFamily;
  }

  return styles;
}

export function getTextStyles(section: PageBuilderSection) {
  const design = section.design;
  const styles: React.CSSProperties = {};

  if (design.typography?.textColor) {
    styles.color = design.typography.textColor;
  }
  if (design.typography?.fontSize) {
    styles.fontSize = design.typography.fontSize;
  }
  if (design.typography?.lineHeight) {
    styles.lineHeight = design.typography.lineHeight;
  }
  if (design.typography?.fontFamily) {
    styles.fontFamily = design.typography.fontFamily;
  }

  return styles;
}

export function getIconStyles(section: PageBuilderSection) {
  const design = section.design;

  return {
    backgroundColor: design.colors?.iconBackground,
    color: design.colors?.iconColor,
  };
}
