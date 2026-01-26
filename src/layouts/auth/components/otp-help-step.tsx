import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Image } from 'src/components/image';

export function OtpHelpStep() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: 150, height: 150, overflow: 'hidden', borderRadius: '20px' }}>
          <Image
            sx={{ width: '100%', height: '100%' }}
            src="https://assets.cdn.filesafe.space/bev6jC3nIRH37jCiNIdX/media/686da7bb175c98fc6048ed38.png"
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          SMS kodi kiritilmasa, raqam yangilanmaydi
        </Typography>

        <Typography variant="body1" sx={{ textAlign: 'center', mx: 'auto', mt: 1 }}>
          Xavfsizlikni ta’minlash uchun yangi raqamga SMS kelishini tasdiqlashimiz kerak
        </Typography>
      </Box>
    </Box>
  );
}
