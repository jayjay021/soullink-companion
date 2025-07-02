import { cloneElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Stack, Text, UnstyledButton, Group, useMantineTheme } from '@mantine/core';
import { IconHome, IconDashboard, IconUsers, IconBook, IconSettings } from '@tabler/icons-react';
import styles from './Navigation.module.css';

interface NavItemProps {
  to: string;
  icon: React.ReactElement;
  label: string;
}

function NavItem({ to, icon, label }: NavItemProps) {
  const theme = useMantineTheme();
  return (
    <NavLink
      to={to}
      style={{ textDecoration: 'none' }}
      className={({ isActive }) => isActive ? `${styles['nav-item']} ${styles.active}` : styles['nav-item']}
    >
      {({ isActive }) => (
        <UnstyledButton className={isActive ? `${styles['nav-btn']} ${styles.active}` : styles['nav-btn']}>
          <div className={styles['nav-content']}>
            <Group gap="sm">
              {cloneElement(icon, {
                color: isActive ? theme.colors.blue[7] : theme.colors.gray[7],
                style: { transition: 'color 0.2s', ...(icon.props.style || {}) },
              })}
              <Text
                size="sm"
                fw="inherit"
                color={isActive ? theme.colors.blue[7] : theme.colors.gray[7]}
                style={{ transition: 'color 0.2s' }}
              >
                {label}
              </Text>
            </Group>
          </div>
        </UnstyledButton>
      )}
    </NavLink>
  );
}

export function Navigation() {
  return (
    <Stack gap="xs">
      <Text size="xs" fw={500} c="dimmed" tt="uppercase" mb="xs">
        Navigation
      </Text>
      <NavItem to="/" icon={<IconHome size={18} />} label="Home" />
      <NavItem to="/dashboard" icon={<IconDashboard size={18} />} label="Dashboard" />
      <NavItem to="/sessions" icon={<IconUsers size={18} />} label="Sessions" />
      <NavItem to="/pokedex" icon={<IconBook size={18} />} label="Pokedex" />
      <NavItem to="/settings" icon={<IconSettings size={18} />} label="Settings" />
    </Stack>
  );
} 