import { useState, useRef, useCallback } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { QrCode, Download, Copy, Check } from "lucide-react";
import { INPUT_CLASS, FOCUS_COLORS, TEXT_COLORS, BG_COLORS, PAGE_HEADER_CLASS, PAGE_HEADER_ICON_CLASS, PAGE_HEADER_TITLE_CLASS, PAGE_HEADER_DESC_CLASS, ICON_BG_COLORS, SECTION_CLASS, SECTION_TITLE_CLASS, FORM_GRID_CLASS, PAGE_BACKGROUND_STYLES, PAGE_CONTAINER_STYLES, QR_PREVIEW_CONTAINER_CLASS } from "../../constants/formStyles";

// Constants
const SIZE_OPTIONS = [128, 256, 512, 1024];
const COLOR_PRESETS = [
  { fg: "#000000", bg: "#ffffff", label: "Classic" },
  { fg: "#7c3aed", bg: "#ffffff", label: "Purple" },
  { fg: "#06b6d4", bg: "#ffffff", label: "Cyan" },
  { fg: "#ffffff", bg: "#000000", label: "Inverted" },
];

const CANVAS_CONFIG = {
  PADDING: 16,
  CORNER_RADIUS: 12,
  SHADOW: {
    color: 'rgba(0, 0, 0, 0.25)',
    blur: 25,
    offsetX: 0,
    offsetY: 8,
  }
};

const INPUT_CLASS_FINAL = INPUT_CLASS + " text-sm " + FOCUS_COLORS.pink;

const PREVIEW_CONTAINER_CLASS = QR_PREVIEW_CONTAINER_CLASS;
const QR_CONTAINER_CLASS = "rounded-xl overflow-hidden shadow-2xl";

export default function QRCodePage() {
  const [text, setText] = useState("https://saasycookies.com");
  const [qrSize, setQrSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [copied, setCopied] = useState(false);
  const qrRef = useRef(null);

  const downloadQR = useCallback(() => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;

    // Create a new canvas with padding
    const newCanvas = document.createElement("canvas");
    const ctx = newCanvas.getContext("2d");
    
    // Set new canvas size with padding
    newCanvas.width = canvas.width + (CANVAS_CONFIG.PADDING * 2);
    newCanvas.height = canvas.height + (CANVAS_CONFIG.PADDING * 2);
    
    // Add shadow (match shadow-2xl)
    ctx.shadowColor = CANVAS_CONFIG.SHADOW.color;
    ctx.shadowBlur = CANVAS_CONFIG.SHADOW.blur;
    ctx.shadowOffsetX = CANVAS_CONFIG.SHADOW.offsetX;
    ctx.shadowOffsetY = CANVAS_CONFIG.SHADOW.offsetY;
    
    // Draw rounded rectangle with background color
    ctx.fillStyle = bgColor;
    roundRect(ctx, 0, 0, newCanvas.width, newCanvas.height, CANVAS_CONFIG.CORNER_RADIUS);
    ctx.fill();
    
    // Reset shadow for the QR code
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // Create clipping path for rounded corners
    ctx.save();
    roundRect(ctx, 0, 0, newCanvas.width, newCanvas.height, CANVAS_CONFIG.CORNER_RADIUS);
    ctx.clip();
    
    // Draw the QR code on top
    ctx.drawImage(canvas, CANVAS_CONFIG.PADDING, CANVAS_CONFIG.PADDING);
    ctx.restore();
    
    // Download the new canvas
    const url = newCanvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.png";
    a.click();
  }, [bgColor]);

  // Helper function to draw rounded rectangles
  const roundRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const copyToClipboard = useCallback(async () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;
    try {
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard API not available */
    }
  }, []);

  return (
    <div className={PAGE_BACKGROUND_STYLES.qrCode.container}>
      <div
        className={PAGE_BACKGROUND_STYLES.qrCode.gradientOverlay}
        style={{ background: PAGE_BACKGROUND_STYLES.qrCode.gradientStyle }}
      />
      <div className={PAGE_BACKGROUND_STYLES.qrCode.noiseOverlay} />
      
      <div className={PAGE_CONTAINER_STYLES} style={{ position: 'relative', zIndex: 10 }}>
        <div className={PAGE_HEADER_CLASS}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`${PAGE_HEADER_ICON_CLASS} ${ICON_BG_COLORS.pink}`}>
          <QrCode className={`w-5 h-5 ${TEXT_COLORS.pink}`} strokeWidth={1.5} />
        </div>
        <h1
          data-testid="qr-page-title"
          className={PAGE_HEADER_TITLE_CLASS}
        >
          QR Code Generator
        </h1>
      </div>
      <p className={PAGE_HEADER_DESC_CLASS}>
        Generate QR codes for URLs, text, or contact info. Download as PNG.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-xl bg-zinc-900/40 border border-white/5 p-6 space-y-4">
            <h3 className={SECTION_TITLE_CLASS + " text-zinc-400 uppercase tracking-wider"}>
              Content
            </h3>
            <div className={FORM_GRID_CLASS}>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Text/URL</label>
                <textarea
                  data-testid="qr-content-input"
                  className={INPUT_CLASS_FINAL + " resize-none h-28"}
                  placeholder="Enter text or URL"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Size</label>
                <div className="grid grid-cols-2 gap-2">
                  {SIZE_OPTIONS.map((size) => (
                    <button
                      key={size}
                      data-testid={`qr-size-${size}`}
                      onClick={() => setQrSize(size)}
                      className={`px-3 py-2 text-xs font-medium rounded-md transition-all ${
                        qrSize === size
                          ? "bg-pink-500 text-black"
                          : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-zinc-900/40 border border-white/5 p-6 space-y-4">
            <h3 className={SECTION_TITLE_CLASS + " text-zinc-400 uppercase tracking-wider"}>
              Colors
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  data-testid={`qr-color-${preset.label.toLowerCase()}`}
                  onClick={() => {
                    setFgColor(preset.fg);
                    setBgColor(preset.bg);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                    fgColor === preset.fg && bgColor === preset.bg
                      ? "bg-white/10 border border-white/20 text-white"
                      : "bg-zinc-800 text-zinc-400 hover:text-white border border-transparent"
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-sm border border-zinc-600"
                    style={{ background: preset.fg }}
                  />
                  {preset.label}
                </button>
              ))}
            </div>
            <div className={FORM_GRID_CLASS}>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Foreground</label>
                <div className="flex items-center gap-2">
                  <input
                    data-testid="qr-fg-color"
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
                  />
                  <input
                    className={INPUT_CLASS_FINAL}
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Background</label>
                <div className="flex items-center gap-2">
                  <input
                    data-testid="qr-bg-color"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
                  />
                  <input
                    className={INPUT_CLASS_FINAL}
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              data-testid="download-qr-button"
              onClick={downloadQR}
              className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-2.5 rounded-md transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.02] text-sm"
            >
              <Download className="w-4 h-4" strokeWidth={1.5} />
              Download PNG
            </button>
            <button
              data-testid="copy-qr-button"
              onClick={copyToClipboard}
              className="flex items-center gap-2 bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 font-medium px-6 py-2.5 rounded-md transition-all text-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" strokeWidth={1.5} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" strokeWidth={1.5} />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-7 flex items-start justify-center">
          <div
            data-testid="qr-preview"
            className={PREVIEW_CONTAINER_CLASS}
          >
            <div
              ref={qrRef}
              className={QR_CONTAINER_CLASS}
              style={{ background: bgColor, padding: CANVAS_CONFIG.PADDING }}
            >
              <QRCodeCanvas
                value={text || " "}
                size={Math.min(qrSize, 400)}
                fgColor={fgColor}
                bgColor={bgColor}
                level="H"
                includeMargin={false}
              />
            </div>
            <p className="text-xs text-zinc-600 max-w-xs text-center truncate">
              {text || "Enter content to generate QR code"}
            </p>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
