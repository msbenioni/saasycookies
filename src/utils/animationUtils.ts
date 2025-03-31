/**
 * Animation utilities for SaaSy Cookies
 */

// Create sparkles on click
export const createSparkles = (e: React.MouseEvent<HTMLElement>) => {
  const button = e.currentTarget;
  const buttonRect = button.getBoundingClientRect();
  
  // Create multiple sparkles
  for (let i = 0; i < 8; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    // Random position around click
    const x = e.clientX - buttonRect.left;
    const y = e.clientY - buttonRect.top;
    
    // Random offset
    const offsetX = (Math.random() - 0.5) * 40;
    const offsetY = (Math.random() - 0.5) * 40;
    
    sparkle.style.left = `${x + offsetX}px`;
    sparkle.style.top = `${y + offsetY}px`;
    
    // Random size
    const size = Math.random() * 10 + 5;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    
    // Random color - use brand colors
    const colors = ['#00FFD1', '#FF3CAC', '#ffffff'];
    sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Add to button
    button.appendChild(sparkle);
    
    // Remove after animation completes
    setTimeout(() => {
      if (button.contains(sparkle)) {
        button.removeChild(sparkle);
      }
    }, 700);
  }
};

// Initialize scroll animations
export const initScrollAnimations = () => {
  const animatedElements = document.querySelectorAll(
    '.fade-in-up, .fade-in-left, .fade-in-right, .stagger-fade-in'
  );
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once the animation has played, we can stop observing
          if (!entry.target.classList.contains('keep-observing')) {
            observer.unobserve(entry.target);
          }
        } else if (entry.target.classList.contains('keep-observing')) {
          // If we want elements to animate every time they enter viewport
          entry.target.classList.remove('visible');
        }
      });
    },
    {
      threshold: 0.1, // Trigger when at least 10% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Slightly before the element comes into view
    }
  );
  
  animatedElements.forEach((element) => {
    observer.observe(element);
  });
  
  return observer;
};
