import React, { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import QRCode from 'qrcode';
import { Download, Printer, Clock, Wifi, Mail, Link, Smartphone, Image as ImageIcon } from 'lucide-react';

type QRCodeType = 'url' | 'vcard' | 'wifi' | 'sms' | 'text';

interface QRCodeOptions {
  url: string;
  type: QRCodeType;
  backgroundColor: string;
  foregroundColor: string;
  logo?: File | null;
  logoUrl?: string;
  expirationDate?: Date | null;
  enableShortUrl: boolean;
}

const initialFormData: QRCodeOptions = {
  url: '',
  type: 'url',
  backgroundColor: '#FFFFFF',
  foregroundColor: '#000000',
  logo: null,
  logoUrl: '',
  expirationDate: null,
  enableShortUrl: false
};

// Advanced data handlers for different QR code types
const generateQRData = (options: QRCodeOptions): string => {
  switch (options.type) {
    case 'vcard':
      // Extract vCard data from URL field (formatted as Name,Email,Phone)
      const vcardParts = options.url.split(',');
      const name = vcardParts[0] || '';
      const email = vcardParts[1] || '';
      const phone = vcardParts[2] || '';
      
      return `BEGIN:VCARD
VERSION:3.0
FN:${name}
EMAIL:${email}
TEL:${phone}
END:VCARD`;
    
    case 'wifi':
      // Extract WiFi data from URL field (formatted as SSID,Password,WPA)
      const wifiParts = options.url.split(',');
      const ssid = wifiParts[0] || '';
      const password = wifiParts[1] || '';
      const encryption = wifiParts[2] || 'WPA';
      
      return `WIFI:S:${ssid};T:${encryption};P:${password};;`;
    
    case 'sms':
      // Extract SMS data from URL field (formatted as Number,Message)
      const smsParts = options.url.split(',');
      const number = smsParts[0] || '';
      const message = smsParts[1] || '';
      
      return `SMSTO:${number}:${message}`;
    
    case 'text':
      return options.url;
    
    case 'url':
    default:
      // Add https:// if not present and it's not a relative URL
      if (options.url && !options.url.startsWith('/') && !options.url.includes('://')) {
        return `https://${options.url}`;
      }
      return options.url;
  }
};

const QRCodeGenerator: React.FC = () => {
  const [formData, setFormData] = useState<QRCodeOptions>(initialFormData);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [showColorPicker, setShowColorPicker] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Load saved QR codes from localStorage
  const [savedQRCodes, setSavedQRCodes] = useState<Array<{id: string, options: QRCodeOptions, date: string}>>(() => {
    const saved = localStorage.getItem('savedQRCodes');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Generate QR code when form data changes
  useEffect(() => {
    if (formData.url.trim()) {
      generateQR();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);
  
  // Save QR codes to localStorage when they change
  useEffect(() => {
    localStorage.setItem('savedQRCodes', JSON.stringify(savedQRCodes));
  }, [savedQRCodes]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'expirationDate') {
      const date = value ? new Date(value) : null;
      setFormData(prev => ({ ...prev, [name]: date }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleColorChange = (color: string, type: 'backgroundColor' | 'foregroundColor') => {
    setFormData(prev => ({ ...prev, [type]: color }));
  };
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // Create a URL for the uploaded image
      const logoUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, logo: file, logoUrl }));
      console.log('Logo uploaded:', file.name, logoUrl);
    }
  };
  
  const removeLogo = () => {
    if (formData.logoUrl) {
      URL.revokeObjectURL(formData.logoUrl);
    }
    setFormData(prev => ({ ...prev, logo: null, logoUrl: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const generateQR = async () => {
    if (!formData.url.trim()) {
      setError('Please enter a valid URL or data');
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    try {
      // Generate data based on QR type
      const data = generateQRData(formData);
      
      // Use shortened URL if enabled and available
      const finalData = formData.enableShortUrl && shortenedUrl ? shortenedUrl : data;
      
      if (!canvasRef.current) {
        throw new Error('Canvas reference not available');
      }
      
      // Generate QR code with higher error correction for better logo compatibility
      await QRCode.toCanvas(canvasRef.current, finalData, {
        width: 300,
        margin: 2,
        errorCorrectionLevel: 'H', // Highest error correction for better logo compatibility
        color: {
          dark: formData.foregroundColor,
          light: formData.backgroundColor,
        },
      });
      
      // If logo is present, draw it on the canvas
      if (formData.logoUrl) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          const img = new window.Image();
          img.crossOrigin = 'Anonymous';  // Allow cross-origin images
          img.onload = () => {
            console.log('Logo image loaded successfully');
            // Calculate logo size (22% of QR code - balanced for scannability)
            const logoSize = canvasRef.current!.width * 0.22;
            const logoX = (canvasRef.current!.width - logoSize) / 2;
            const logoY = (canvasRef.current!.height - logoSize) / 2;
            
            // Draw white background for logo
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(logoX - 2, logoY - 2, logoSize + 4, logoSize + 4);
            
            // Draw logo
            ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
            
            // Update QR code URL for download
            setQrCodeUrl(canvasRef.current!.toDataURL('image/png'));
          };
          img.onerror = (e) => {
            console.error('Error loading logo image:', e);
            // Still provide the QR code without logo on error
            setQrCodeUrl(canvasRef.current!.toDataURL('image/png'));
          };
          img.src = formData.logoUrl;
        }
      } else {
        // Update QR code URL for download if no logo
        setQrCodeUrl(canvasRef.current.toDataURL('image/png'));
      }
    } catch (err) {
      console.error('Error generating QR code:', err);
      setError('Failed to generate QR code. Please check your input and try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const saveQRCode = () => {
    if (!qrCodeUrl) return;
    
    const newQRCode = {
      id: Date.now().toString(),
      options: { ...formData },
      date: new Date().toISOString()
    };
    
    setSavedQRCodes(prev => [newQRCode, ...prev]);
  };
  
  const loadQRCode = (id: string) => {
    const qrCode = savedQRCodes.find(code => code.id === id);
    if (qrCode) {
      setFormData(qrCode.options);
    }
  };
  
  const downloadQRCode = (format: 'png' | 'svg') => {
    if (!qrCodeUrl) return;
    
    const a = document.createElement('a');
    a.href = qrCodeUrl;
    a.download = `qrcode-${Date.now()}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Track download event (could be sent to your analytics)
    console.log(`QR code downloaded in ${format} format`);
  };
  
  const printQRCode = () => {
    if (!qrCodeUrl) return;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
            <style>
              body {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
                padding: 20px;
                font-family: sans-serif;
              }
              img {
                max-width: 100%;
                max-height: 70vh;
              }
              .info {
                margin-top: 20px;
                text-align: center;
              }
              @media print {
                .no-print {
                  display: none;
                }
              }
            </style>
          </head>
          <body>
            <img src="${qrCodeUrl}" alt="QR Code" />
            <div class="info">
              <p>${formData.type.toUpperCase()}: ${formData.url}</p>
              ${formData.expirationDate ? `<p>Expires: ${new Date(formData.expirationDate).toLocaleDateString()}</p>` : ''}
            </div>
            <button class="no-print" onclick="window.print();window.close();">Print</button>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };
  
  const shortenUrl = async () => {
    if (!formData.url.trim()) return;
    
    try {
      setIsGenerating(true);
      // Using TinyURL's public API
      const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(formData.url)}`);
      if (!response.ok) throw new Error('Failed to shorten URL');
      
      const shortUrl = await response.text();
      setShortenedUrl(shortUrl);
      
      // Regenerate QR code with shortened URL
      setFormData(prev => ({ ...prev, enableShortUrl: true }));
    } catch (err) {
      console.error('Error shortening URL:', err);
      setError('Failed to shorten URL. Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  };
  

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* QR Code Form */}
      <div className="glass-card p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Create Your QR Code</h2>
          
          {/* QR Code Type */}
          <div className="mb-4">
            <label className="block text-text-secondary mb-2">QR Code Type</label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'url' }))}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 ${formData.type === 'url' ? 'bg-primary text-white' : 'bg-card-secondary'}`}
              >
                <Link className="h-4 w-4" /> URL
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'vcard' }))}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 ${formData.type === 'vcard' ? 'bg-primary text-white' : 'bg-card-secondary'}`}
              >
                <Smartphone className="h-4 w-4" /> vCard
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'wifi' }))}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 ${formData.type === 'wifi' ? 'bg-primary text-white' : 'bg-card-secondary'}`}
              >
                <Wifi className="h-4 w-4" /> WiFi
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'sms' }))}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 ${formData.type === 'sms' ? 'bg-primary text-white' : 'bg-card-secondary'}`}
              >
                <Mail className="h-4 w-4" /> SMS
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'text' }))}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 ${formData.type === 'text' ? 'bg-primary text-white' : 'bg-card-secondary'}`}
              >
                <span>Text</span>
              </button>
            </div>
          </div>
          
          {/* QR Code Content */}
          <div className="mb-4">
            <label className="block text-text-secondary mb-2">
              {(() => {
                switch(formData.type) {
                  case 'url': return 'URL (website address)';
                  case 'vcard': return 'Contact Info (Name,Email,Phone)';
                  case 'wifi': return 'WiFi Details (SSID,Password,Encryption)';
                  case 'sms': return 'SMS (Number,Message)';
                  case 'text': return 'Text Content';
                  default: return 'Content';
                }
              })()}
            </label>
            {formData.type === 'text' as QRCodeType ? (
              <textarea
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                placeholder="Enter text content"
                className="w-full p-3 rounded-lg bg-card-secondary"
                rows={4}
              />
            ) : (
              <input
                type="text"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                placeholder={(() => {
                  switch(formData.type) {
                    case 'url': return 'e.g., www.example.com';
                    case 'vcard': return 'e.g., John Doe,john@example.com,123456789';
                    case 'wifi': return 'e.g., MyWiFi,password123,WPA';
                    case 'sms': return 'e.g., +123456789,Hello there!';
                    case 'text': return 'Enter text content';
                    default: return '';
                  }
                })()}
                className="w-full p-3 rounded-lg bg-card-secondary"
              />
            )}
          </div>
          
          {/* Color Options */}
          <div className="mb-4">
            <label className="block text-text-secondary mb-2">Colors</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-text-secondary mb-1">Background</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowColorPicker(showColorPicker === 'background' ? null : 'background')}
                    className="w-full p-2 rounded-lg bg-card-secondary flex items-center"
                  >
                    <div
                      className="w-6 h-6 rounded-md mr-2"
                      style={{ backgroundColor: formData.backgroundColor }}
                    />
                    {formData.backgroundColor}
                  </button>
                  {showColorPicker === 'background' && (
                    <div className="absolute z-10 mt-2">
                      <HexColorPicker
                        color={formData.backgroundColor}
                        onChange={(color) => handleColorChange(color, 'backgroundColor')}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-text-secondary mb-1">QR Code</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowColorPicker(showColorPicker === 'foreground' ? null : 'foreground')}
                    className="w-full p-2 rounded-lg bg-card-secondary flex items-center"
                  >
                    <div
                      className="w-6 h-6 rounded-md mr-2"
                      style={{ backgroundColor: formData.foregroundColor }}
                    />
                    {formData.foregroundColor}
                  </button>
                  {showColorPicker === 'foreground' && (
                    <div className="absolute z-10 mt-2">
                      <HexColorPicker
                        color={formData.foregroundColor}
                        onChange={(color) => handleColorChange(color, 'foregroundColor')}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Logo */}
          <div className="mb-4">
            <label className="block text-text-secondary mb-2">Add Logo (Optional)</label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                ref={fileInputRef}
                className="hidden"
                id="logo-upload"
              />
              <label
                htmlFor="logo-upload"
                className="px-4 py-2 bg-primary text-white rounded-lg cursor-pointer flex items-center"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Upload Logo
              </label>
              {formData.logoUrl && (
                <button
                  type="button"
                  onClick={removeLogo}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Remove
                </button>
              )}
            </div>
            {formData.logoUrl && (
              <div className="mt-2">
                <img
                  src={formData.logoUrl}
                  alt="Logo Preview"
                  className="max-h-16 rounded-md"
                />
              </div>
            )}
          </div>
          

          
          {/* URL Shortener */}
          {formData.type === 'url' && (
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <label className="block text-text-secondary">Shorten URL</label>
                <button
                  type="button"
                  onClick={shortenUrl}
                  disabled={!formData.url || isGenerating}
                  className="px-3 py-1 text-sm bg-primary text-white rounded-lg disabled:opacity-50"
                >
                  Shorten
                </button>
              </div>
              {shortenedUrl && (
                <div className="mt-2 p-2 bg-card-secondary rounded-lg">
                  <p className="text-sm">Shortened URL: {shortenedUrl}</p>
                </div>
              )}
            </div>
          )}
          
          {/* Expiration Date */}
          <div className="mb-4">
            <label className="block text-text-secondary mb-2">Expiration Date (Optional)</label>
            <input
              type="date"
              name="expirationDate"
              value={formData.expirationDate ? new Date(formData.expirationDate).toISOString().split('T')[0] : ''}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-3 rounded-lg bg-card-secondary"
            />
            <p className="text-xs mt-1 text-text-secondary">
              This adds a visual expiration notice but doesn't disable the QR code functionality.
            </p>
          </div>
        </div>
      </div>
      
      {/* QR Code Preview & Options */}
      <div className="glass-card p-6 space-y-6 flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Preview & Download</h2>
                <div className="flex-grow flex flex-col items-center justify-center p-4 bg-card-secondary rounded-lg relative">
          {isGenerating && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}
          
          {error && (
            <div className="text-red-500 p-4">
              {error}
            </div>
          )}
          
          {!error && (
            <>
              <canvas ref={canvasRef} className="max-w-full h-auto"></canvas>
              {formData.expirationDate && (
                <div className="mt-2 p-2 bg-red-500/10 text-red-500 rounded-lg flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Expires: {formData.expirationDate ? new Date(formData.expirationDate).toLocaleDateString() : ''}
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="mt-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => downloadQRCode('png')}
              disabled={!qrCodeUrl}
              className="px-4 py-2 bg-primary text-white rounded-lg flex items-center disabled:opacity-50"
            >
              <Download className="h-4 w-4 mr-2" />
              PNG
            </button>
            <button
              type="button"
              onClick={() => downloadQRCode('svg')}
              disabled={!qrCodeUrl}
              className="px-4 py-2 bg-primary text-white rounded-lg flex items-center disabled:opacity-50"
            >
              <Download className="h-4 w-4 mr-2" />
              SVG
            </button>
            <button
              type="button"
              onClick={printQRCode}
              disabled={!qrCodeUrl}
              className="px-4 py-2 bg-primary text-white rounded-lg flex items-center disabled:opacity-50"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </button>
            <button
              type="button"
              onClick={saveQRCode}
              disabled={!qrCodeUrl}
              className="px-4 py-2 bg-primary text-white rounded-lg flex items-center disabled:opacity-50"
            >
              Save
            </button>
          </div>
          
          {formData.type === 'url' && (
            <div className="p-4 bg-card-secondary rounded-lg">
              <p className="text-sm">
                <strong>Pro Tip:</strong> Use shortened URLs for cleaner, more user-friendly QR codes with better scan rates.
              </p>
            </div>
          )}
        </div>
        
        {/* Saved QR Codes */}
        {savedQRCodes.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Saved QR Codes</h3>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {savedQRCodes.map((code) => (
                <div 
                  key={code.id}
                  className="p-2 bg-card-secondary rounded-lg flex justify-between items-center cursor-pointer hover:bg-card-secondary/80"
                  onClick={() => loadQRCode(code.id)}
                >
                  <div>
                    <p className="text-sm font-medium">
                      {code.options.type}: {code.options.url.substring(0, 30)}
                      {code.options.url.length > 30 ? '...' : ''}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {new Date(code.date).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
