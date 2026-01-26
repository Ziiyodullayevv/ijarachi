import type { PreviewOrientation } from 'src/components/upload';
import type { FileThumbnailProps } from 'src/components/file-thumbnail';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Upload } from 'src/components/upload';

// ----------------------------------------------------------------------

export function UploadView() {
  const [files, setFiles] = useState<(File | string)[]>([]);

  const [preview, setPreview] = useState<{
    orientation: PreviewOrientation;
    showImage: FileThumbnailProps['showImage'];
  }>({
    orientation: 'horizontal',
    showImage: true,
  });

  const handleDropMultiFile = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const handleRemoveFile = useCallback((inputFile: File | string) => {
    setFiles((prevFiles) => prevFiles.filter((fileFiltered) => fileFiltered !== inputFile));
  }, []);

  const handleRemoveAllFiles = useCallback(() => {
    setFiles([]);
  }, []);

  return (
    <>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <FormControlLabel
          label="Horizontal layout"
          control={
            <Switch
              checked={preview.orientation === 'horizontal'}
              onClick={() =>
                setPreview((prev) => ({
                  ...prev,
                  orientation: prev.orientation === 'horizontal' ? 'vertical' : 'horizontal',
                }))
              }
              slotProps={{ input: { id: 'layout-switch' } }}
            />
          }
        />

        <FormControlLabel
          label="Show image"
          control={
            <Switch
              checked={preview.showImage}
              onClick={() =>
                setPreview((prev) => ({
                  ...prev,
                  showImage: !prev.showImage,
                }))
              }
              slotProps={{ input: { id: 'view-switch' } }}
            />
          }
        />
      </Box>

      <Upload
        multiple
        value={files}
        onDrop={handleDropMultiFile}
        onRemove={handleRemoveFile}
        onRemoveAll={handleRemoveAllFiles}
        onUpload={() => console.info('ON UPLOAD')}
        previewOrientation={preview.orientation}
        slotProps={{
          multiPreview: {
            thumbnail: { showImage: preview.showImage },
          },
        }}
      />
    </>
  );
}
