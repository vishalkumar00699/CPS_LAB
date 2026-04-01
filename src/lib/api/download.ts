
import { SENSOR_FILES } from '@/data/downloads';

export async function downloadDocument(sensorKey: string, fileType: string = 'datasheet') {
  const filePath = SENSOR_FILES[sensorKey]?.[fileType];
  
  if (!filePath) {
    console.error(`Document not found for ${sensorKey} [${fileType}]`);
    return { success: false, message: 'Document link not available.' };
  }

  try {
    // Check if it's a remote URL (GitHub) or local asset
    if (filePath.startsWith('http')) {
      window.open(filePath, '_blank');
      return { success: true };
    } else {
      // For local assets, we ensure the path starts correctly for the public folder
      const normalizedPath = filePath.startsWith('/') ? filePath : `/${filePath}`;
      
      // Trigger a download by creating a temporary link
      const link = document.createElement('a');
      link.href = normalizedPath;
      link.download = `${sensorKey}_${fileType}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return { success: true };
    }
  } catch (err) {
    console.error('Download error:', err);
    return { success: false, message: 'Failed to initiate download.' };
  }
}
