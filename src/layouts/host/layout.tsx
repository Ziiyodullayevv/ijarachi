import type { Breakpoint } from '@mui/material/styles';
import type { HostContentProps } from './content';
import type { MainSectionProps, HeaderSectionProps, LayoutSectionProps } from '../core';

import { merge } from 'es-toolkit';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';

import { paths } from 'src/routes/paths';
import { useRouter, usePathname } from 'src/routes/hooks';

import { Logo } from 'src/components/logo';

import { HOST_STEPS } from './steps';
import { HostContent } from './content';
import { MainSection, LayoutSection, HeaderSection } from '../core';

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type HostLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    main?: MainSectionProps;
    content?: HostContentProps;
  };
};

export function HostLayout({ children, slotProps, layoutQuery = 'xl' }: HostLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  function useHostStep() {
    const currentIndex = HOST_STEPS.findIndex((s) => pathname.includes(s.path));

    return {
      currentIndex,
      total: HOST_STEPS.length,
      isFirst: currentIndex === 0,
      isLast: currentIndex === HOST_STEPS.length - 1,
    };
  }

  const { currentIndex, total, isFirst, isLast } = useHostStep();
  const listingId = localStorage.getItem('listingId') || 'new';

  const handleNext = () => {
    // if (!validateCurrentStep()) return;

    const nextStep = HOST_STEPS[currentIndex + 1];
    if (isLast) {
      router.push('/');
    }

    router.push(`${paths.host.step(listingId, nextStep.path)}`);
  };

  const handleBack = () => {
    const prevStep = HOST_STEPS[currentIndex - 1];
    if (isFirst) {
      router.push('/');
    }

    router.push(`${paths.host.step(listingId, prevStep.path)}`);
  };

  const renderHeader = () => {
    const headerSlotProps: HeaderSectionProps['slotProps'] = { container: { maxWidth: false } };

    const headerSlots: HeaderSectionProps['slots'] = {
      topArea: (
        <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
          This is an info Alert.
        </Alert>
      ),
      leftArea: (
        <>
          {/** @slot Logo */}
          <Logo />
        </>
      ),
      rightArea: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
          <Button onClick={() => router.push('/')} variant="outlined" sx={{ borderRadius: 100 }}>
            Saqlash va Chiqish
          </Button>
        </Box>
      ),
    };

    return (
      <HeaderSection
        disableElevation
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={merge(headerSlotProps, slotProps?.header?.slotProps ?? {})}
        sx={[
          { position: { [layoutQuery]: 'fixed' } },
          ...(Array.isArray(slotProps?.header?.sx) ? slotProps.header.sx : [slotProps?.header?.sx]),
        ]}
      />
    );
  };

  const renderMain = () => (
    <MainSection
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <HostContent>{children}</HostContent>
    </MainSection>
  );

  const renderFooter = () => (
    <Box
      sx={{
        height: 80,
        backgroundColor: 'white',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: '100',
      }}
    >
      <div style={{ position: 'relative' }}>
        <LinearProgress
          value={((currentIndex === 0 ? 0 : currentIndex + 1) / total) * 100}
          variant="determinate"
          sx={{ mb: 2, width: 1, height: '5px', borderRadius: 0 }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 70px',
        }}
      >
        <Button
          onClick={handleBack}
          size="medium"
          variant="outlined"
          sx={{ px: 3, height: '45px', minWidth: '100px' }}
        >
          Orqaga
        </Button>
        <Button
          onClick={handleNext}
          variant="contained"
          color="black"
          sx={{ px: 3, height: '45px', minWidth: '100px' }}
        >
          {currentIndex + 1 === HOST_STEPS.length ? 'Tugatish' : 'Keyingisi'}
        </Button>
      </div>
    </Box>
  );

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
    >
      {renderMain()}
    </LayoutSection>
  );
}

// ----------------------------------------------------------------------
