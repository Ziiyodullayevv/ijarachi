import type { Breakpoint } from '@mui/material/styles';
import type { FooterProps } from './footer';
import type { NavMainProps } from './nav/types';
import type { MainSectionProps, HeaderSectionProps, LayoutSectionProps } from '../core';

import { v4 as uuidv4 } from 'uuid';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter, usePathname } from 'src/routes/hooks';

import { Logo } from 'src/components/logo';
import { Iconify } from 'src/components/iconify';

import { NavMobile } from './nav/mobile';
import { Footer, HomeFooter } from './footer';
import { MenuButton } from '../components/menu-button';
import { FilterDialog } from '../components/filter-drawer';
import { navData as mainNavData } from '../nav-config-main';
import { PhoneNumberDialog } from '../auth/phone-number-dialog';
import { MainSection, LayoutSection, HeaderSection } from '../core';
import { FilterProvider } from '../components/filter-drawer/context/filter-context';

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type MainLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    nav?: {
      data?: NavMainProps['data'];
    };
    main?: MainSectionProps;
    footer?: FooterProps;
  };
};

export function MainLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'md',
}: MainLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const TOKEN = true;

  const navigate = () => {
    const id = localStorage.getItem('listingId') || uuidv4();
    localStorage.setItem('listingId', id);
    router.push(`${paths.host.step(id, 'about-your-place')}`);
  };

  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const isHomePage = pathname === '/';

  const navData = slotProps?.nav?.data ?? mainNavData;

  const renderHeader = () => {
    const headerSlots: HeaderSectionProps['slots'] = {
      topArea: (
        <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
          This is an info Alert.
        </Alert>
      ),
      leftArea: (
        <>
          {/** @slot Nav mobile */}
          <MenuButton
            onClick={onOpen}
            sx={(theme) => ({
              mr: 1,
              ml: -1,
              [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
            })}
          />
          <NavMobile data={navData} open={open} onClose={onClose} />

          {/** @slot Logo */}
          <Logo />
        </>
      ),

      centerArea: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
          <TextField
            size="small"
            placeholder="Qayerdan uy topishni istaysiz.."
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: '100px',
                width: '380px',
                minHeight: '45px',
                backgroundColor: 'white',
                boxShadow: (theme) => theme.customShadows?.z8 || '0 8px 16px rgba(0,0,0,0.12)',
                transition: 'width 0.4s ease-in-out, box-shadow 0.3s ease-in-out',

                '&.Mui-focused': {
                  width: '450px',
                  boxShadow: '0 10px 24px rgba(0,0,0,0.16)',
                },
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end" sx={{ marginRight: -0.7 }}>
                    <Fab
                      variant="circular"
                      color="primary"
                      size="small"
                      sx={{
                        width: 32,
                        height: 32,
                        minWidth: 32,
                        minHeight: 32,
                      }}
                    >
                      <Iconify icon="solar:oui-search" width={16} />
                    </Fab>
                  </InputAdornment>
                ),
              },
            }}
          />

          <FilterProvider>
            <FilterDialog />
          </FilterProvider>
        </Box>
      ),

      rightArea: (
        <>
          {/** @slot Nav desktop */}
          {/* <NavDesktop
            data={navData}
            sx={(theme) => ({
              display: 'none',
              [theme.breakpoints.up(layoutQuery)]: { mr: 2.5, display: 'flex' },
            })}
          /> */}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
            {/** @slot Settings button */}
            {/* <SettingsButton /> */}

            {/** @slot Sign in button */}
            {/* <SignInButton /> */}

            {/* <LanguagePopover data={allLangs} /> */}

            {/** @slot Purchase button */}
            {TOKEN ? (
              <Button
                onClick={navigate}
                size="medium"
                color="primary"
                startIcon={
                  <Iconify sx={{ marginRight: '-4px' }} icon="custom-icon:plus" width={24} />
                }
                variant="contained"
                sx={{
                  borderRadius: 100,
                  height: '40px',
                  px: 2,
                }}
              >
                E&apos;lon berish
              </Button>
            ) : (
              <PhoneNumberDialog />
            )}
          </Box>
        </>
      ),
    };

    return (
      <HeaderSection
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={slotProps?.header?.slotProps}
        sx={slotProps?.header?.sx}
      />
    );
  };

  const renderFooter = () =>
    isHomePage ? (
      <HomeFooter sx={slotProps?.footer?.sx} />
    ) : (
      <Footer sx={slotProps?.footer?.sx} layoutQuery={layoutQuery} />
    );

  const renderMain = () => <MainSection {...slotProps?.main}>{children}</MainSection>;

  return (
    <LayoutSection
      /** **************************************
       * @Header
       *************************************** */
      headerSection={renderHeader()}
      /** **************************************
       * @Footer
       *************************************** */
      footerSection={renderFooter()}
      /** **************************************
       * @Styles
       *************************************** */
      cssVars={cssVars}
      sx={sx}
    >
      {renderMain()}
    </LayoutSection>
  );
}
