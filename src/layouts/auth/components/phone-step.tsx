import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import { Image } from 'src/components/image';
import { Field } from 'src/components/hook-form';

export function PhoneStep() {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: 180, height: 180, overflow: 'hidden', borderRadius: '20px' }}>
          <Image
            sx={{ width: '100%', height: '100%' }}
            src="https://d33wubrfki0l68.cloudfront.net/6800e41a299b90e94b0bdcbadbb5f28de3e9d0fc/eba6d/static/phone-two-hand-hold-4962c45043cc5559fdc0804148c6e3a0.png"
          />
        </Box>
      </Box>
      <Typography variant="h3" sx={{ mt: 1, textAlign: 'center' }}>
        Telefon raqam biriktiring
      </Typography>

      <Typography variant="body1" sx={{ mt: 1, textAlign: 'center', maxWidth: 350, mx: 'auto' }}>
        Xavfsizlik bo‘yicha bildirishnomalar yuboriladigan raqamni kiriting
      </Typography>

      <Field.Phone
        name="phoneNumber"
        defaultCountry="UZ"
        placeholder="00 000 00 00"
        sx={{
          my: 2,
          height: 40,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2, // 32px
          },
        }}
      />
    </>
  );
}
