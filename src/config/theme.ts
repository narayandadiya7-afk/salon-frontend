import { ThemeConfig } from 'antd';

export type ThemeMode =
  | 'light' | 'dark' | 'midnight' | 'nord' | 'dracula' | 'ocean' | 'forest' | 'slate';

export const FONT_CONFIG = {
  primary: {
    name: 'LexendRegular',
    family: '"LexendRegular", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  secondary: {
    name: 'RobotoRegular',
    family: '"RobotoRegular", "Roboto", Arial, sans-serif',
  },
  variants: {
    bold: '"RobotoBold", sans-serif',
    medium: '"RobotoMedium", sans-serif',
    black: '"RobotoBlack", sans-serif',
  },
} as const;
export interface ThemeColors {
  primary: string; secondary: string; background: string; surface: string;
  text: string; textSecondary: string; border: string; hover: string;
  success: string; warning: string; error: string; info: string;
}

export const lightTheme: ThemeColors = {
  primary: '#C8A46B', secondary: '#1A1A1A', background: '#FAF8F5', surface: '#ffffff',
  text: '#1A1A1A', textSecondary: '#6A6A6A', border: '#E8E0D5', hover: '#F5F0EB',
  success: '#2D6A4F', warning: '#D4A843', error: '#C44545', info: '#6B4F8A',
};
export const darkTheme: ThemeColors = {
  primary: '#1890ff', secondary: '#52c41a', background: '#141414', surface: '#1f1f1f',
  text: '#ffffffd9', textSecondary: '#ffffff73', border: '#434343', hover: '#262626',
  success: '#52c41a', warning: '#faad14', error: '#ff4d4f', info: '#1890ff',
};
export const midnightTheme: ThemeColors = {
  primary: '#3b82f6', secondary: '#60a5fa', background: '#0c1222', surface: '#1a2332',
  text: '#e2e8f0', textSecondary: '#94a3b8', border: '#2d3748', hover: '#243447',
  success: '#10b981', warning: '#f59e0b', error: '#ef4444', info: '#3b82f6',
};
export const nordTheme: ThemeColors = {
  primary: '#88c0d0', secondary: '#81a1c1', background: '#2e3440', surface: '#3b4252',
  text: '#eceff4', textSecondary: '#d8dee9', border: '#4c566a', hover: '#434c5e',
  success: '#a3be8c', warning: '#ebcb8b', error: '#bf616a', info: '#88c0d0',
};
export const draculaTheme: ThemeColors = {
  primary: '#bd93f9', secondary: '#ff79c6', background: '#282a36', surface: '#343746',
  text: '#f8f8f2', textSecondary: '#6272a4', border: '#44475a', hover: '#3e4153',
  success: '#50fa7b', warning: '#f1fa8c', error: '#ff5555', info: '#8be9fd',
};
export const oceanTheme: ThemeColors = {
  primary: '#0284c7', secondary: '#0ea5e9', background: '#f0f9ff', surface: '#ffffff',
  text: '#082f49', textSecondary: '#0c4a6e', border: '#bae6fd', hover: '#e0f2fe',
  success: '#10b981', warning: '#f59e0b', error: '#ef4444', info: '#0284c7',
};
export const forestTheme: ThemeColors = {
  primary: '#059669', secondary: '#10b981', background: '#f0fdf4', surface: '#ffffff',
  text: '#064e3b', textSecondary: '#065f46', border: '#a7f3d0', hover: '#d1fae5',
  success: '#10b981', warning: '#f59e0b', error: '#ef4444', info: '#14b8a6',
};
export const slateTheme: ThemeColors = {
  primary: '#475569', secondary: '#64748b', background: '#f8fafc', surface: '#ffffff',
  text: '#0f172a', textSecondary: '#334155', border: '#cbd5e1', hover: '#f1f5f9',
  success: '#10b981', warning: '#f59e0b', error: '#ef4444', info: '#475569',
};

export const themes: Record<ThemeMode, ThemeColors> = {
  light: lightTheme, dark: darkTheme, midnight: midnightTheme, nord: nordTheme,
  dracula: draculaTheme, ocean: oceanTheme, forest: forestTheme, slate: slateTheme,
};

const AntdFontSize = 13;

export const getAntdTheme = (mode: ThemeMode): ThemeConfig => {
  const colors = themes[mode] || themes.light;
  const isDark = mode === 'dark' || mode === 'midnight' || mode === 'nord' || mode === 'dracula';

  return {
    token: {
      colorPrimary: colors.primary, colorSuccess: colors.success,
      colorWarning: colors.warning, colorError: colors.error, colorInfo: colors.info,
      colorBgBase: colors.surface, colorBgContainer: colors.surface,
      colorBgElevated: colors.surface, colorBgLayout: colors.background,
      colorBgSpotlight: isDark ? '#2a2a2a' : colors.surface,
      colorTextBase: colors.text, colorText: colors.text,
      colorTextSecondary: colors.textSecondary,
      colorTextTertiary: isDark ? '#ffffff40' : '#00000040',
      colorTextDisabled: isDark ? '#ffffff40' : '#00000040',
      colorBorder: colors.border,
      colorBorderSecondary: isDark ? '#303030' : '#f0f0f0',
      borderRadius: 6, borderRadiusSM: 4, borderRadiusLG: 8, borderRadiusXS: 2,
      fontSize: AntdFontSize, fontSizeSM: AntdFontSize - 1,
      fontSizeLG: AntdFontSize + 1, fontSizeXL: AntdFontSize + 2,
      fontFamily: FONT_CONFIG.primary.family,
      fontWeightStrong: 600, lineHeight: 1.5,
      padding: 12, paddingXS: 6, paddingSM: 8, paddingLG: 16, paddingXL: 24,
      margin: 12, marginXS: 6, marginSM: 8, marginLG: 16, marginXL: 24,
      controlHeight: 30, controlHeightSM: 22, controlHeightLG: 36,
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      boxShadowSecondary: isDark
        ? '0 4px 6px -1px rgba(0,0,0,0.4), 0 2px 4px -1px rgba(0,0,0,0.3)'
        : '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
      motionDurationFast: '0.15s', motionDurationMid: '0.25s', motionDurationSlow: '0.35s',
      motionEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      wireframe: false,
    },
    components: {
      Layout: {
        headerBg: colors.surface, headerHeight: 64, headerPadding: '0 24px',
        headerColor: colors.text, siderBg: colors.surface, bodyBg: colors.background,
        footerBg: colors.surface, triggerBg: colors.hover, triggerColor: colors.text,
      },
      Menu: {
        itemBg: 'transparent', itemColor: colors.text,
        itemHoverColor: colors.primary, itemHoverBg: colors.hover,
        itemSelectedColor: colors.primary,
        itemSelectedBg: isDark ? colors.hover : `${colors.primary}15`,
        itemActiveBg: colors.hover, itemBorderRadius: 6,
        itemMarginBlock: 4, itemMarginInline: 0, itemPaddingInline: 12,
        fontSize: AntdFontSize + 1, collapsedIconSize: AntdFontSize + 3,
        subMenuItemBg: 'transparent',
      },
      Button: {
        primaryShadow: 'none', defaultShadow: 'none', dangerShadow: 'none',
        borderRadius: 6, borderRadiusLG: 8, borderRadiusSM: 4,
        controlHeight: 30, controlHeightLG: 36, controlHeightSM: 22,
        paddingContentHorizontal: 12, fontWeight: 500, fontSize: AntdFontSize,
        defaultColor: colors.text, defaultBg: colors.surface,
        defaultBorderColor: colors.border,
        defaultHoverBorderColor: colors.primary, defaultHoverColor: colors.primary,
        defaultActiveBorderColor: colors.primary, defaultActiveColor: colors.primary,
        textHoverBg: colors.hover,
      },
      Input: {
        borderRadius: 6, paddingBlock: 3, paddingInline: 8,
        controlHeight: 30, fontSize: AntdFontSize,
        activeBorderColor: colors.primary, hoverBorderColor: colors.primary,
        activeShadow: `0 0 0 2px ${colors.primary}15`,
        errorActiveShadow: `0 0 0 2px ${colors.error}15`,
        addonBg: colors.hover,
      },
      Select: {
        borderRadius: 6, controlHeight: 30, fontSize: AntdFontSize,
        optionSelectedBg: isDark ? colors.hover : `${colors.primary}15`,
        optionSelectedColor: colors.primary, optionActiveBg: colors.hover,
        optionPadding: '4px 8px', optionFontSize: AntdFontSize,
        selectorBg: colors.surface, clearBg: colors.surface, multipleItemBg: colors.hover,
      },
      Table: {
        headerBg: colors.hover, headerColor: colors.text,
        headerSortActiveBg: colors.hover, headerSortHoverBg: colors.hover,
        headerSplitColor: colors.border, rowHoverBg: colors.hover,
        rowSelectedBg: isDark ? colors.hover : `${colors.primary}15`,
        rowSelectedHoverBg: isDark ? colors.hover : `${colors.primary}20`,
        borderColor: isDark ? '#303030' : '#f0f0f0',
        headerBorderRadius: 8, cellPaddingBlock: 4, cellPaddingInline: 6,
        fontSize: AntdFontSize - 1, cellFontSize: AntdFontSize - 1,
        footerBg: colors.hover, footerColor: colors.text,
      },
      Card: {
        borderRadiusLG: 8,
        boxShadowTertiary: isDark ? '0 1px 2px 0 rgba(0,0,0,0.3)' : '0 1px 2px 0 rgba(0,0,0,0.05)',
        headerBg: 'transparent', headerFontSize: 16, headerFontSizeSM: 14,
        headerHeight: 48, headerHeightSM: 36, actionsBg: colors.surface,
      },
      Modal: {
        borderRadiusLG: 8, contentBg: colors.surface, headerBg: colors.surface,
        footerBg: colors.surface, titleFontSize: 18, titleLineHeight: 1.5, titleColor: colors.text,
      },
      Drawer: {
        colorBgElevated: colors.surface, colorBgMask: 'rgba(0,0,0,0.45)',
        colorIcon: colors.textSecondary, colorIconHover: colors.text,
      },
      Form: {
        labelColor: colors.text, labelFontSize: AntdFontSize, labelHeight: 28,
        labelColonMarginInlineStart: 2, labelColonMarginInlineEnd: 8,
        itemMarginBottom: 16, verticalLabelPadding: '0 0 4px', verticalLabelMargin: 0,
      },
      Pagination: {
        itemActiveColor: colors.surface, itemActiveBg: colors.primary,
        itemBg: colors.surface, itemLinkBg: colors.surface,
        colorText: colors.text, colorTextDisabled: colors.textSecondary,
        colorPrimary: colors.primary, borderRadius: 6, itemSize: 28, fontSize: AntdFontSize,
      },
      Dropdown: {
        borderRadiusLG: 6,
        boxShadowSecondary: isDark
          ? '0 10px 15px -3px rgba(0,0,0,0.4), 0 4px 6px -2px rgba(0,0,0,0.3)'
          : '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
        controlPaddingHorizontal: 12, paddingBlock: 4,
      },
      Tag: { borderRadiusSM: 100, defaultBg: colors.hover, defaultColor: colors.text },
      Breadcrumb: {
        fontSize: 14, iconFontSize: 14,
        linkColor: colors.textSecondary, linkHoverColor: colors.primary,
        itemColor: colors.textSecondary, lastItemColor: colors.text,
        separatorColor: colors.textSecondary, separatorMargin: 8,
      },
      Progress: {
        defaultColor: colors.primary, remainingColor: colors.hover,
        circleTextColor: colors.text, lineBorderRadius: 100,
      },
      Tabs: {
        itemActiveColor: colors.primary, itemHoverColor: colors.primary,
        itemSelectedColor: colors.primary, itemColor: colors.textSecondary,
        inkBarColor: colors.primary, titleFontSize: 14,
      },
      Tooltip: {
        colorBgSpotlight: isDark ? '#2a2a2a' : colors.surface,
        colorTextLightSolid: colors.text, borderRadius: 6,
      },
      Badge: { dotSize: 6, statusSize: 6, indicatorHeight: 20, indicatorHeightSM: 14 },
      Switch: { colorPrimary: colors.primary, colorPrimaryHover: colors.primary },
      Checkbox: {
        borderRadiusSM: 4, colorPrimary: colors.primary,
        colorPrimaryHover: colors.primary, colorBorder: colors.border,
      },
    },
  };
};

export const themeNames: Record<ThemeMode, string> = {
  light: 'Light', dark: 'Dark', midnight: 'Midnight Blue',
  nord: 'Nord Arctic', dracula: 'Dracula', ocean: 'Ocean Blue',
  forest: 'Forest Green', slate: 'Professional Slate',
};
