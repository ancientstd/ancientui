'use client';

import { useTheme } from 'next-themes';
import { IconDeviceDesktop, IconMoon, IconSun } from 'ancient-icons';

import { Button } from '../ui/button';

export function ThemeSwitcher({
  shape = 'square',
  intent = 'outline',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    const nextTheme =
      theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(nextTheme);
  };

  return (
    <Button
      shape={shape}
      intent={intent}
      size="square-petite"
      aria-label="Switch theme"
      onPress={toggleTheme}
      {...props}
    >
      {theme === 'light' ? (
        <IconSun />
      ) : theme === 'dark' ? (
        <IconMoon />
      ) : (
        <IconDeviceDesktop />
      )}
    </Button>
  );
}
