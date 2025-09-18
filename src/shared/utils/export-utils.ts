export interface ExportOptions {
  title?: string;
  subtitle?: string;
  format: 'png' | 'jpg' | 'pdf' | 'json' | 'svg';
  quality?: number;
  backgroundColor?: string;
  timestamp?: boolean;
}

export interface ExportableComponent {
  getDataURL?: (format: 'png' | 'jpg', quality?: number) => string | null;
  getCanvasElement?: () => HTMLCanvasElement | null;
  getExportData?: () => unknown;
}

export function downloadFile(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function generateFilename(title: string, format: string): string {
  const sanitizedTitle = title.replace(/\s+/g, '_').toLowerCase();
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  return `${sanitizedTitle}_${timestamp}.${format}`;
}

export function exportCanvasToPNG(
  canvas: HTMLCanvasElement,
  options: Partial<ExportOptions> = {}
): string {
  const quality = options.quality || 1.0;
  return canvas.toDataURL('image/png', quality);
}

export function exportCanvasToJPG(
  canvas: HTMLCanvasElement,
  options: Partial<ExportOptions> = {}
): string {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');

  if (!tempCtx) {
    throw new Error('Could not create canvas context');
  }

  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;

  tempCtx.fillStyle = options.backgroundColor || '#ffffff';
  tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

  tempCtx.drawImage(canvas, 0, 0);

  const quality = options.quality || 0.95;
  return tempCanvas.toDataURL('image/jpeg', quality);
}

export async function exportCanvasToPDF(
  canvas: HTMLCanvasElement,
  options: Partial<ExportOptions> = {}
): Promise<void> {
  try {
    const {jsPDF} = await import('jspdf');

    const imgData = canvas.toDataURL('image/png', 1.0);

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgHeight / imgWidth;

    // A4 page dimensions in points
    const pageWidth = 600;
    const pageHeight = 850;
    const margin = 40;

    const maxWidth = pageWidth - margin * 2;
    const maxHeight = pageHeight - margin * 2 - (options.title ? 100 : 60);

    let finalWidth = maxWidth;
    let finalHeight = finalWidth * ratio;

    if (finalHeight > maxHeight) {
      finalHeight = maxHeight;
      finalWidth = finalHeight / ratio;
    }

    const pdf = new jsPDF('p', 'pt', 'a4');

    let currentY = margin;

    if (options.title) {
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      const titleWidth = pdf.getTextWidth(options.title);
      const titleX = (pageWidth - titleWidth) / 2;
      pdf.text(options.title, titleX, currentY + 20);
      currentY += 40;
    }

    if (options.subtitle) {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      const subtitleWidth = pdf.getTextWidth(options.subtitle);
      const subtitleX = (pageWidth - subtitleWidth) / 2;
      pdf.text(options.subtitle, subtitleX, currentY + 20);
      currentY += 40;
    }

    const imgX = (pageWidth - finalWidth) / 2;
    const imgY = currentY + 20;

    pdf.addImage(imgData, 'PNG', imgX, imgY, finalWidth, finalHeight);

    if (options.timestamp) {
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      const timestamp = new Date().toLocaleString();
      pdf.text(`Generated on ${timestamp}`, margin, pageHeight - 20);
    }

    const filename = generateFilename(options.title || 'export', 'pdf');
    pdf.save(filename);
  } catch (error) {
    console.error('PDF export error:', error);
    throw new Error(
      'PDF export failed. Make sure jsPDF is installed: npm install jspdf'
    );
  }
}

export function exportDataToJSON(
  data: unknown,
  options: Partial<ExportOptions> = {}
): void {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], {type: 'application/json'});
  const url = URL.createObjectURL(blob);

  const filename = generateFilename(options.title || 'data', 'json');
  downloadFile(url, filename);

  setTimeout(() => URL.revokeObjectURL(url), 100);
}

export async function exportComponent(
  component: ExportableComponent,
  options: ExportOptions
): Promise<void> {
  const {format, title = 'export'} = options;

  try {
    switch (format) {
      case 'png': {
        let dataUrl: string;

        if (component.getDataURL) {
          const url = component.getDataURL('png', options.quality);
          if (!url) throw new Error('Failed to get PNG data URL');
          dataUrl = url;
        } else if (component.getCanvasElement) {
          const canvas = component.getCanvasElement();
          if (!canvas) throw new Error('No canvas element available');
          dataUrl = exportCanvasToPNG(canvas, options);
        } else {
          throw new Error('Component does not support PNG export');
        }

        const filename = generateFilename(title, 'png');
        downloadFile(dataUrl, filename);
        break;
      }

      case 'jpg': {
        let dataUrl: string;

        if (component.getDataURL) {
          const url = component.getDataURL('jpg', options.quality);
          if (!url) throw new Error('Failed to get JPG data URL');
          dataUrl = url;
        } else if (component.getCanvasElement) {
          const canvas = component.getCanvasElement();
          if (!canvas) throw new Error('No canvas element available');
          dataUrl = exportCanvasToJPG(canvas, options);
        } else {
          throw new Error('Component does not support JPG export');
        }

        const filename = generateFilename(title, 'jpg');
        downloadFile(dataUrl, filename);
        break;
      }

      case 'pdf': {
        if (component.getCanvasElement) {
          const canvas = component.getCanvasElement();
          if (!canvas) throw new Error('No canvas element available');
          await exportCanvasToPDF(canvas, options);
        } else {
          throw new Error('Component does not support PDF export');
        }
        break;
      }

      case 'json': {
        if (component.getExportData) {
          const data = component.getExportData();
          exportDataToJSON(data, options);
        } else {
          throw new Error('Component does not support JSON export');
        }
        break;
      }

      case 'svg': {
        if (component.getExportData) {
          const data = component.getExportData();
          const svgString =
            typeof data === 'string' ? data : JSON.stringify(data);
          const blob = new Blob([svgString], {type: 'image/svg+xml'});
          const url = URL.createObjectURL(blob);
          const filename = generateFilename(title, 'svg');
          downloadFile(url, filename);
          setTimeout(() => URL.revokeObjectURL(url), 100);
        } else {
          throw new Error('Component does not support SVG export');
        }
        break;
      }

      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  } catch (error) {
    console.error('Export error:', error);
    throw error;
  }
}

export function createExportHandler(
  component: ExportableComponent,
  defaultOptions: Partial<ExportOptions> = {}
) {
  return (format: ExportOptions['format']) => {
    return async () => {
      try {
        await exportComponent(component, {
          ...defaultOptions,
          format,
        });
      } catch (error) {
        console.error(`Export error (${format}):`, error);
        throw error;
      }
    };
  };
}
