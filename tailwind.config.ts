import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      currentColor: 'currentColor',
      black: '#000000',
      white: '#FFFFFF',
      gray50: '#FBFBFD',
      gray100: '#F3F5F8',
      gray200: '#E2E5EB',
      gray300: '#D4D7DD',
      gray400: '#C5C8CE',
      gray500: '#ABB0B9',
      gray600: '#9397A1',
      gray700: '#5F646F',
      gray800: '#434855',
      gray900: '#222222',
      red50: '#FCE8E8',
      red100: '#F7B8B8',
      red200: '#F39595',
      red300: '#EE6565',
      red400: '#EA4747',
      red500: '#E51919',
      red600: '#D01717',
      red700: '#A31212',
      red800: '#7E0E0E',
      red900: '#600B0B',
      orange50: '#FFF2E6',
      orange100: '#FFD6B1',
      orange200: '#FFC28B',
      orange300: '#FFA755',
      orange400: '#FF9535',
      orange500: '#FF7B02',
      orange600: '#E87002',
      orange700: '#B55701',
      orange800: '#8C4401',
      orange900: '#6B3401',
      yellow50: '#FFFCE8',
      yellow100: '#FDF6B6',
      yellow200: '#FDF293',
      yellow300: '#FCEC62',
      yellow400: '#FBE943',
      yellow500: '#FAE314',
      yellow600: '#E4CF12',
      yellow700: '#B2A10E',
      yellow800: '#8A7D0B',
      yellow900: '#695F08',
      green50: '#EEFAE8',
      green100: '#CBF0B8',
      green200: '#B1E995',
      green300: '#8EE065',
      green400: '#78D947',
      green500: '#56D019',
      green600: '#4EBD17',
      green700: '#3D9412',
      green800: '#2F720E',
      green900: '#24570B',
      skyblue50: '#F0FBFE',
      skyblue100: '#D1F1FC',
      skyblue200: '#BAEBFB',
      skyblue300: '#9BE2F9',
      skyblue400: '#88DCF8',
      skyblue500: '#6AD3F6',
      skyblue600: '#60C0E0',
      skyblue700: '#4B96AF',
      skyblue800: '#3A7487',
      skyblue900: '#2D5967',
      blue50: '#E8EFFC',
      blue100: '#B8CDF7',
      blue200: '#96B4F3',
      blue300: '#6692EE',
      blue400: '#497DEA',
      blue500: '#1B5DE5',
      blue600: '#1955D0',
      blue700: '#1342A3',
      blue800: '#0F337E',
      blue900: '#0B2760',
      purple50: '#F0E9FE',
      purple100: '#D1BBFC',
      purple200: '#BA9BFA',
      purple300: '#9B6DF8',
      purple400: '#8851F6',
      purple500: '#6A25F4',
      purple600: '#6022DE',
      purple700: '#4B1AAD',
      purple800: '#3A1486',
      purple900: '#2D1066',
      pink50: '#FFF9FA',
      pink100: '#FFEBEF',
      pink200: '#FFE2E7',
      pink300: '#FFD5DC',
      pink400: '#FFCDD5',
      pink500: '#FFC0CB',
      pink600: '#E8AFB9',
      pink700: '#B58890',
      pink800: '#8C6A70',
      pink900: '#6B5155'
    },
    fontSize: {
      displayLarge: [
        '60px',
        {
          fontWeight: 700,
          lineHeight: '80px',
        },
      ],
      displayMedium: [
        '40px',
        {
          fontWeight: 700,
          lineHeight: '56px',
        },
      ],
      displaySmall: [
        '34px',
        {
          fontWeight: 700,
          lineHeight: '50px',
        },
      ],
      titleLarge: [
        '36px',
        {
          fontWeight: 600,
          lineHeight: '54px',
        },
      ],
      titleMedium: [
        '24px',
        {
          fontWeight: 700,
          lineHeight: '34px',
        },
      ],
      titleSmall: [
        '16px',
        {
          fontWeight: 500,
          lineHeight: '24px',
        },
      ],
      subTitleLarge: [
        '24px',
        {
          fontWeight: 600,
          lineHeight: '32px',
        }
      ],
      subTitleSmall: [
        '18px',
        {
          fontWeight: 700,
          lineHeight: '28px',
        }
      ],
      bodyLarge: [
        '20px',
        {
          fontWeight: 400,
          lineHeight: '32px',
        },
      ],
      bodyMedium: [
        '16px',
        {
          fontWeight: 400,
          lineHeight: '28px',
        },
      ],
      bodySmall: [
        '14px',
        {
          fontWeight: 500,
          lineHeight: '24px',
        },
      ],
      bodyTiny: [
        '12px',
        {
          fontWeight: 500,
          lineHeight: '20px',
        },
      ],
      labelLarge_bold: [
        '20px',
        {
          fontWeight: 700,
          lineHeight: '28px',
        },
      ],
      labelLarge_medium: [
        '20px',
        {
          fontWeight: 500,
          lineHeight: '28px',
        },
      ],
      labelMedium_bold: [
        '16px',
        {
          fontWeight: 600,
          lineHeight: '24px',
        },
      ],
      labelMedium_medium: [
        '16px',
        {
          fontWeight: 500,
          lineHeight: '24px',
        },
      ],
      labelMedium_regular: [
        '16px',
        {
          fontWeight: 400,
          lineHeight: '24px',
        },
      ],
      labelSmall_semiBold: [
        '14px',
        {
          fontWeight: 700,
          lineHeight: '20px',
        },
      ],
      labelSmall_medium: [
        '14px',
        {
          fontWeight: 500,
          lineHeight: '20px',
        },
      ],
      labelSmall_regular: [
        '14px',
        {
          fontWeight: 400,
          lineHeight: '20px',
        },
      ],
      labelTiny: [
        '12px',
        {
          fontWeight: 500,
          lineHeight: '16px',
        },
      ]
    }
  },
  plugins: [],
} satisfies Config;
