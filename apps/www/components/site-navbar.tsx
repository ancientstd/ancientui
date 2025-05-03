'use client';

import { ThemeSwitcher, Button, Menu, Navbar, Separator } from 'ancientstd';
import {
  IconBrandApple,
  IconChevronDown,
  IconSearch,
  IconShoppingBag,
} from 'ancient-icons';

export function SiteNavbar(props: React.ComponentProps<typeof Navbar>) {
  return (
    <Navbar {...props}>
      <Navbar.Nav>
        <Navbar.Logo
          aria-label="Goto documenation of Navbar"
          href="/docs/2.x/components/layouts/navbar"
        >
          <IconBrandApple className="size-6 sm:size-5" />
        </Navbar.Logo>
        <Navbar.Section>
          <Navbar.Item href="#" isCurrent>
            Home
          </Navbar.Item>
          <Navbar.Item href="#">Shop</Navbar.Item>
          <Navbar.Item href="#">Offers</Navbar.Item>
          <Navbar.Item href="#">Orders</Navbar.Item>
          <Menu>
            <Navbar.Item>
              Categories <IconChevronDown data-slot="chevron" />
            </Navbar.Item>
          </Menu>
        </Navbar.Section>

        <Navbar.Section className="ml-auto hidden md:flex">
          <Navbar.Flex className="sm:gap-x-1">
            <Button
              intent="plain"
              size="square-petite"
              aria-label="Search for products"
            >
              <IconSearch />
            </Button>
            <Button intent="plain" size="square-petite" aria-label="Your Bag">
              <IconShoppingBag />
            </Button>
            <ThemeSwitcher intent="plain" />
          </Navbar.Flex>
          <Separator orientation="vertical" className="mr-3 ml-1 h-6" />
        </Navbar.Section>
      </Navbar.Nav>

      <Navbar.Compact>
        <Navbar.Flex>
          <Navbar.Trigger className="-ml-2" />
          <Separator orientation="vertical" className="h-6 sm:mx-1" />
          <Navbar.Logo
            aria-label="Goto documenation of Navbar"
            href="/docs/2.x/components/layouts/navbar"
          >
            <IconBrandApple className="size-5" />
          </Navbar.Logo>
        </Navbar.Flex>
        <Navbar.Flex>
          <Navbar.Flex>
            <Button
              intent="plain"
              size="square-petite"
              aria-label="Search for products"
            >
              <IconSearch />
            </Button>
            <Button intent="plain" size="square-petite" aria-label="Your Bag">
              <IconShoppingBag />
            </Button>
            <ThemeSwitcher intent="plain" />
          </Navbar.Flex>
          <Separator orientation="vertical" className="mr-3 ml-1 h-6" />
        </Navbar.Flex>
      </Navbar.Compact>
    </Navbar>
  );
}
