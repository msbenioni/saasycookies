import { PRODUCT_LOGOS, BACKGROUND_LOGOS } from '../constants/productLogos';

export default function FloatingLogos() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {BACKGROUND_LOGOS.map((logo, index) => {
        const productLogo = PRODUCT_LOGOS[logo.product];
        return (
          <div
            key={index}
            className={`absolute ${logo.position} ${logo.animation} ${logo.opacity}`}
          >
            <img
              src={productLogo.src}
              alt={productLogo.alt}
              className={productLogo.classes.FLOATING}
            />
          </div>
        );
      })}
    </div>
  );
}
