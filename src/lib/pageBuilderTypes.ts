export interface PageBuilderSection {
  id: string;
  type: WidgetType;
  variant: string;
  order: number;
  content: Record<string, any>;
  design: {
    background: {
      type: 'color' | 'gradient' | 'image' | 'video';
      value: string;
      size?: string;
      position?: string;
    };
    spacing: {
      paddingTop: string;
      paddingBottom: string;
      paddingLeft: string;
      paddingRight: string;
      marginTop: string;
      marginBottom: string;
    };
    typography?: {
      fontFamily?: string;
      fontSize?: string;
      lineHeight?: string;
      headingColor?: string;
      textColor?: string;
      headingSize?: string;
      headingWeight?: string;
    };
    colors?: {
      primary?: string;
      secondary?: string;
      accent?: string;
      accentColor?: string;
      buttonBackground?: string;
      buttonText?: string;
      buttonBackgroundHover?: string;
      iconBackground?: string;
      iconColor?: string;
    };
    button?: {
      borderRadius?: string;
      padding?: string;
    };
    border?: {
      width?: string;
      color?: string;
      style?: string;
      radius?: string;
    };
    shadow?: {
      size?: string;
      custom?: string;
      color?: string;
    };
    effects?: {
      opacity?: string;
      transform?: string;
      filter?: string;
      transition?: string;
      blur?: string;
      brightness?: string;
      contrast?: string;
      saturate?: string;
      grayscale?: string;
      sepia?: string;
      hueRotate?: string;
      parallax?: boolean;
      animation?: boolean;
      animationType?: string;
    };
    layout?: {
      maxWidth?: string;
      alignment?: string;
      contentPosition?: string;
      contentAlignment?: string;
      minHeight?: string;
    };
    overlay?: {
      enabled?: boolean;
      color?: string;
      opacity?: string;
      gradient?: string;
    };
  };
  themeConfig?: {
    themeMode: 'inherit' | 'named' | 'custom';
    themeRef?: string;
    customTokens?: Record<string, string>;
  };
  advanced: {
    cssClasses?: string[];
    customCSS?: string;
    animations?: {
      entrance?: string;
      hover?: string;
    };
    visibility?: {
      desktop: boolean;
      tablet: boolean;
      mobile: boolean;
    };
  };
}

export type WidgetType =
  | 'header'
  | 'hero'
  | 'features'
  | 'cta'
  | 'content'
  | 'testimonials'
  | 'contact'
  | 'footer'
  | 'pricing'
  | 'stats'
  | 'team'
  | 'faq'
  | 'logocloud'
  | 'videohero'
  | 'gallery'
  | 'timeline'
  | 'newsletter'
  | 'process';

export type DeviceType = 'desktop' | 'tablet' | 'mobile';

export interface WidgetDefinition {
  type: WidgetType;
  label: string;
  description: string;
  icon: string;
  category?: 'navigation' | 'content' | 'marketing';
  unique?: boolean;
  variants: WidgetVariant[];
  defaultContent: Record<string, any>;
  defaultDesign: PageBuilderSection['design'];
}

export interface WidgetVariant {
  id: string;
  label: string;
  thumbnail?: string;
}
