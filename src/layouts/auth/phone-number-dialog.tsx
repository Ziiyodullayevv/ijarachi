import type { DialogProps } from '@mui/material/Dialog';

import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

import { OtpStep } from './components/otp-step';
import { PhoneStep } from './components/phone-step';
import { OtpHelpStep } from './components/otp-help-step';
import { formatCountdown } from './helpers/format-count-down';

type Step = 'PHONE' | 'OTP' | 'HELP';

type FormValues = {
  phoneNumber: string;
  code: string;
};

const OTP_LEN = 6;
const RESEND_SECONDS = 60;

export function PhoneNumberDialog() {
  const openDialog = useBoolean();
  const descriptionElementRef = useRef<HTMLElement>(null);

  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
  const [showShadow, setShowShadow] = useState(false);
  const [step, setStep] = useState<Step>('PHONE');

  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendLeft, setResendLeft] = useState(0);

  const methods = useForm<FormValues>({
    defaultValues: { phoneNumber: '', code: '' },
    mode: 'onChange',
  });

  const { watch, reset, setValue, setError, handleSubmit, clearErrors } = methods;

  const phoneNumber = watch('phoneNumber');
  const code = watch('code');

  // -------------------- open/close --------------------
  const handleClickOpen = useCallback(
    (scrollType: DialogProps['scroll']) => () => {
      openDialog.onTrue();
      setScroll(scrollType);

      // reset
      setStep('PHONE');
      setResendLeft(0);
      setIsSending(false);
      setIsVerifying(false);
      reset({ phoneNumber: '', code: '' });
    },
    [openDialog, reset]
  );

  const handleClose = useCallback(() => {
    openDialog.onFalse();
  }, [openDialog]);

  useEffect(() => {
    if (openDialog.value) descriptionElementRef.current?.focus();
  }, [openDialog.value]);

  // -------------------- scroll shadow --------------------
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    setShowShadow(scrollTop + clientHeight < scrollHeight);
  };

  // -------------------- resend timer --------------------
  useEffect(() => {
    if (resendLeft <= 0) return;
    const t = window.setInterval(() => setResendLeft((s) => Math.max(0, s - 1)), 1000);
    // eslint-disable-next-line consistent-return
    return () => window.clearInterval(t);
  }, [resendLeft]);

  // -------------------- API placeholders --------------------
  const sendOtp = useCallback(async () => {
    if (!phoneNumber) return;

    setIsSending(true);
    try {
      clearErrors('code');
      setValue('code', '');
      setStep('OTP');
      setResendLeft(RESEND_SECONDS);
    } finally {
      setIsSending(false);
    }
  }, [phoneNumber, clearErrors, setValue]);

  const verifyOtp = useCallback(async () => {
    if (!phoneNumber) return;
    if (!code || code.length !== OTP_LEN) return;

    setIsVerifying(true);
    try {
      handleClose();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setError('code', { type: 'manual', message: 'Kod noto‘g‘ri yoki eskirgan' });
      // xohlasangiz kodni tozalab yuboring:
      // setValue('code', '');
    } finally {
      setIsVerifying(false);
    }
  }, [phoneNumber, code, handleClose, setError]);

  const resendOtp = useCallback(async () => {
    if (resendLeft > 0) return;
    await sendOtp();
  }, [resendLeft, sendOtp]);

  // -------------------- AUTO VERIFY (OTP to‘lsa avtomatik tasdiqlash) --------------------
  useEffect(() => {
    if (step !== 'OTP') return;
    if (isVerifying) return;
    if (!code) return;

    if (code.length === OTP_LEN) {
      void verifyOtp();
    }
  }, [step, code, isVerifying, verifyOtp]);

  // -------------------- UI labels --------------------

  // Pastdagi primary button:
  // - PHONE: Davom etish
  // - OTP: Resend code
  // - HELP: Tushundim (OTP ga qaytadi)
  const primaryLabel = useMemo(() => {
    if (step === 'PHONE') return 'Davom etish';
    if (step === 'OTP')
      return resendLeft > 0 ? `Resend code ${formatCountdown(resendLeft)}` : 'Resend code';
    return 'Tushundim';
  }, [step, resendLeft]);

  const primaryDisabled = useMemo(() => {
    if (step === 'PHONE') return !phoneNumber || phoneNumber.length < 7 || isSending;
    if (step === 'OTP') return resendLeft > 0 || isSending; // resend timer tugamaguncha
    return false;
  }, [step, phoneNumber, isSending, resendLeft]);

  const goBack = useCallback(() => {
    if (step === 'OTP') setStep('PHONE');
    if (step === 'HELP') setStep('OTP');
  }, [step]);

  const primaryAction = useCallback(() => {
    if (step === 'PHONE') {
      void sendOtp();
      return;
    }
    if (step === 'OTP') {
      // OTP step: primary = resend
      void resendOtp();
      return;
    }
    // HELP
    setStep('OTP');
  }, [step, sendOtp, resendOtp]);

  // Form submit: primary button type=button bo‘ladi (biz onClick bilan boshqaryapmiz)
  const onSubmit = handleSubmit(async () => {
    // bu yerda hech narsa shart emas, chunki primaryAction onClick ishlaydi
  });

  return (
    <>
      <Button
        onClick={handleClickOpen('paper')}
        size="medium"
        color="primary"
        disableRipple
        startIcon={<Iconify sx={{ marginRight: '-4px' }} icon="custom-icon:plus" width={24} />}
        variant="contained"
        sx={{ borderRadius: 100, height: '40px', px: 2 }}
      >
        E&apos;lon berish
      </Button>

      <Dialog
        sx={{ maxWidth: 440, margin: '0 auto' }}
        open={openDialog.value}
        onClose={handleClose}
        scroll={scroll}
        slotProps={{
          paper: {
            sx: {
              borderRadius: '30px',
              position: 'relative',
              overflow: 'hidden',
              minWidth: '440px',
            },
          },
        }}
      >
        {step !== 'PHONE' && (
          <IconButton
            color="black"
            onClick={goBack}
            size="small"
            sx={{
              position: 'absolute',
              left: 20,
              top: 20,
              width: '70px',
              height: '40px',
              backgroundColor: '#F5F5F5',
              borderRadius: '100px',
              '&:hover': {
                backgroundColor: 'black',
                color: 'white',
              },
            }}
          >
            <Iconify icon="custom-icon:left-arrow" width={24} />
          </IconButton>
        )}

        {step === 'PHONE' && (
          <IconButton
            color="black"
            onClick={handleClose}
            size="small"
            sx={{ position: 'absolute', right: 20, top: 20 }}
          >
            <Iconify icon="carbon:close" width={30} />
          </IconButton>
        )}

        <Form methods={methods} onSubmit={onSubmit}>
          <DialogContent
            dividers={scroll === 'paper'}
            onScroll={handleScroll}
            sx={{ overflowY: 'auto', paddingY: 3 }}
          >
            {step === 'PHONE' && <PhoneStep />}

            {step === 'OTP' && (
              <OtpStep phoneNumber={phoneNumber} onCantReceive={() => setStep('HELP')} />
            )}

            {step === 'HELP' && <OtpHelpStep />}
          </DialogContent>

          <DialogActions
            sx={{
              position: 'sticky',
              bottom: 0,
              backgroundColor: 'white',
              boxShadow: showShadow ? '0 -4px 20px rgba(0,0,0,0.15)' : 'none',
              transition: 'box-shadow 0.3s ease-in-out',
              zIndex: 10,
              px: 3,
              pb: 3,
              gap: 1,
            }}
          >
            <Button
              type="button"
              onClick={primaryAction}
              sx={{ width: '100%', height: '56px', borderRadius: '15px' }}
              size="large"
              variant="contained"
              disabled={primaryDisabled}
            >
              {primaryLabel}
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    </>
  );
}
