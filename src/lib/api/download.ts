import { SENSOR_FILES } from '@/data/downloads';

/**
 * Transforms a GitHub folder/repo URL into a direct ZIP download URL for the entire repository.
 * Also handles GitHub blob links by converting them to raw content links.
 * e.g., https://github.com/user/repo/tree/main/folder -> https://github.com/user/repo/archive/refs/heads/main.zip
 * e.g., https://github.com/user/repo/blob/main/file.txt -> https://raw.githubusercontent.com/user/repo/main/file.txt
 */
function transformGithubUrl(url: string): string {
  // Pattern for GitHub tree URLs: https://github.com/{user}/{repo}/tree/{branch}/{path}
  const githubTreeRegex = /https:\/\/github\.com\/([^/]+)\/([^/]+)\/tree\/([^/]+)(\/.*)?/;
  const treeMatch = url.match(githubTreeRegex);
  
  if (treeMatch) {
    const [_, user, repo, branch] = treeMatch;
    return `https://github.com/${user}/${repo}/archive/refs/heads/${branch}.zip`;
  }

  // Pattern for GitHub blob URLs (single file UI): https://github.com/{user}/{repo}/blob/{branch}/{path}
  const githubBlobRegex = /https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.*)/;
  const blobMatch = url.match(githubBlobRegex);
  
  if (blobMatch) {
    const [_, user, repo, branch, path] = blobMatch;
    return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path}`;
  }
  
  return url;
}

/**
 * Generic function to download a file from a URL using fetch and blob.
 * Works for both local and remote (if CORS is supported) URLs.
 * Falls back to window.open if fetch fails.
 */
export async function downloadFileFromUrl(url: string, filename: string) {
  // Special handling for GitHub links
  if (url.includes('github.com') && !url.includes('raw.githubusercontent.com')) {
    const transformedUrl = transformGithubUrl(url);
    if (transformedUrl !== url) {
      if (transformedUrl.endsWith('.zip')) {
        // Use a hidden anchor tag instead of window.open to avoid the white screen/empty tab
        const link = document.createElement('a');
        link.href = transformedUrl;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return { success: true };
      }
      // If it transformed to a raw link, proceed to fetch it so it downloads with the proper filename!
      url = transformedUrl;
    }
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
    
    return { success: true };
  } catch (error) {
    console.error('Download failed:', error);
    // Fallback: Use a hidden anchor tag
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return { success: false, message: 'Initiated fallback download.' };
  }
}

export async function downloadDocument(sensorKey: string, fileType: string = 'datasheet') {
  const filePath = SENSOR_FILES[sensorKey]?.[fileType];
  
  if (!filePath) {
    console.error(`Document not found for ${sensorKey} [${fileType}]`);
    return { success: false, message: 'Document link not available.' };
  }

  const filename = `${sensorKey}_${fileType}.pdf`;

  if (filePath.startsWith('http')) {
    return await downloadFileFromUrl(filePath, filename);
  } else {
    // For local assets
    const normalizedPath = filePath.startsWith('/') ? filePath : `/${filePath}`;
    return await downloadFileFromUrl(normalizedPath, filename);
  }
}
