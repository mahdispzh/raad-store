export const baseStyles = `
  transition-all
  duration-300
  flex
  items-center
  justify-center
  gap-2
  select-none
  cursor-pointer
  disabled:pointer-events-none
  disabled:opacity-50
`;
export const sizes = {
  primary: "w-[17.86vw] h-[2.40vw] text-lg",

  secondary: "w-[9.38vw] h-[1.82vw] text-xs",

  tertiary: "w-[20.21vw] h-[1.82vw] text-xs",

  quaternary: "w-[9.38vw] h-[2.34vw] text-sm",

  compact: "w-[3.07vw] h-[1.30vw] text-2xs",

  large: "w-[8.70vw] h-[2.45vw] text-3xl",
};
export const radius = {
  md: "rounded-md",
  full: "rounded-full",
};
export const variants = {
  primary: {
    fill: `
      bg-secondary
      text-white
      hover:bg-primary
      shadow-sm
    `,

    outline: `
      border-2
      border-secondary
      text-secondary
      hover:bg-secondary
      hover:text-white
    `,

    simple: `
      bg-transparent
      text-primary
    `,
  },

  danger: {
    fill: `
      bg-danger
      text-white
      hover:bg-transparent
      hover:text-danger
      border
      border-transparent
      hover:border-danger
    `,

    outline: `
      border
      border-danger
      text-danger
      hover:bg-danger
      hover:text-white
    `,

    simple: `
      bg-transparent
      text-danger
    `,
  },

  gray: {
    fill: `
      bg-gray
      text-primary
      hover:opacity-80
    `,

    outline: `
      border
      border-gray
      text-primary
    `,

    simple: `
      bg-transparent
      text-primary
    `,
  },

  ghost: {
    fill: `
      bg-transparent
      text-primary
      hover:bg-accent
    `,

    outline: `
      bg-transparent
      border
      border-transparent
      text-primary
    `,

    simple: `
      bg-transparent
      text-primary
    `,
  },
};
