declare module 'qrcode' {
  interface QRCodeOptions {
    version?: number;
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
    margin?: number;
    scale?: number;
    width?: number;
    color?: {
      dark?: string;
      light?: string;
    };
  }

  function toCanvas(
    canvas: HTMLCanvasElement | string,
    text: string,
    options?: QRCodeOptions
  ): Promise<HTMLCanvasElement>;

  function toDataURL(
    text: string,
    options?: QRCodeOptions
  ): Promise<string>;

  export { toCanvas, toDataURL };
  export default { toCanvas, toDataURL };
}
