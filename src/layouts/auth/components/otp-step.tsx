import { useMemo } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { Image } from 'src/components/image';
import { Field } from 'src/components/hook-form';

function prettifyPhone(phone: string) {
  const digits = phone.replace(/[^\d+]/g, '');
  const m = digits.match(/^\+?(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/);
  if (!m) return phone;
  return `+${m[1]} ${m[2]} ${m[3]} ${m[4]} ${m[5]}`;
}

export function OtpStep({
  phoneNumber,
  onCantReceive,
}: {
  phoneNumber: string;
  onCantReceive: () => void;
}) {
  const phoneText = useMemo(
    () => (phoneNumber ? prettifyPhone(String(phoneNumber)) : ''),
    [phoneNumber]
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: 180, height: 180, overflow: 'hidden', borderRadius: '20px' }}>
          <Image
            sx={{ width: '100%', height: '100%' }}
            src="https://cdn3d.iconscout.com/3d/premium/thumb/messages-4856460-4047564.png"
          />
        </Box>
      </Box>
      <Box>
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          SMS kodini kiriting
        </Typography>

        <Typography variant="body1" sx={{ textAlign: 'center', maxWidth: 420, mx: 'auto' }}>
          Kod {phoneText || '-'} raqamiga yuborildi
        </Typography>
      </Box>

      {/* Kod kiritilishi: 6 ta to‘lganda container auto verify qiladi */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Field.Code
          name="code"
          gap={1}
          autoFocus
          slotProps={{
            textField: {
              variant: 'outlined',
              inputProps: { inputMode: 'numeric', pattern: '[0-9]*' },
            },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link
          component="button"
          color="textDisabled"
          type="button"
          underline="hover"
          onClick={onCantReceive}
        >
          Kodni qabul qila olmadim
        </Link>
      </Box>
    </Box>
  );
}
