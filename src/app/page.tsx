'use client';

import { useEffect, useRef, useState } from 'react';
import { jarallax } from 'jarallax';
import 'jarallax/dist/jarallax.css'; // Import Jarallax CSS
import Image from 'next/image';

// Correctly import the side effect for the element plugin
import 'jarallax/dist/jarallax-element';

// CSS for floating orbs animations
const orbsStyle = `
  @keyframes float {
    0% { transform: translateY(0px) translateX(0px); }
    25% { transform: translateY(-10px) translateX(5px); }
    50% { transform: translateY(0px) translateX(10px); }
    75% { transform: translateY(10px) translateX(5px); }
    100% { transform: translateY(0px) translateX(0px); }
  }

  @keyframes float2 {
    0% { transform: translateY(0px) translateX(0px); }
    25% { transform: translateY(10px) translateX(-5px); }
    50% { transform: translateY(0px) translateX(-10px); }
    75% { transform: translateY(-10px) translateX(-5px); }
    100% { transform: translateY(0px) translateX(0px); }
  }

  @keyframes float3 {
    0% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-15px) rotate(5deg); }
    66% { transform: translateY(15px) rotate(-5deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  }

  @keyframes blink {
    0% { opacity: 0.2; }
    50% { opacity: 0.8; }
    100% { opacity: 0.2; }
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.1; }
    50% { opacity: 0.5; }
  }
`;

function Hero() {
  const jarallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The import itself handles registration. You don't need to call jarallaxElement()
    // as it is not an exported function. The script runs on import.

    // Initialize Jarallax on the main container
    if (jarallaxRef.current) {
      jarallax(jarallaxRef.current, {
        speed: 0.2, // Adjust the parallax speed of the background
        imgSrc: '/background.jpg', // Using background.jpg from the public folder
        imgSize: 'cover',
        imgPosition: '50% 50%',
        imgRepeat: 'no-repeat',
        type: 'scroll',
      });
    }
    
    // The main jarallax instance will now automatically detect and handle
    // elements with the `data-jarallax-element` attribute inside it.

    // Cleanup function to destroy the Jarallax instance on unmount
    return () => {
      if (jarallaxRef.current) {
        jarallax(jarallaxRef.current, 'destroy');
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    // Add a type to the ref for better TypeScript support
    <section
      ref={jarallaxRef}
      className="relative h-screen min-h-[700px] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Layer 2: Main Subject - Maa Durga */}
      <div
        data-jarallax-element="50" // Moves down slowly on scroll, creating depth
        className="absolute inset-0 z-20 flex justify-center items-end sm:items-center"
      >
        <div className="relative w-4/5 h-[70%] sm:h-[85%] md:h-[95%] max-h-[800px]">
          <Image
            src="/image.jpg" // Using image.jpg from the public folder
            alt="Maa Durga Idol"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Layer 4: Text Content */}
      <div 
        className="relative z-40 text-center text-white p-4"
        data-jarallax-element="-20"
      >
        <div className="space-y-2">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold antolia-font text-transparent bg-gradient-to-r from-yellow-50 via-amber-100 to-yellow-200 bg-clip-text opacity-85 drop-shadow-[0_2px_10px_rgba(255,215,0,0.3)]">
            DURGA PUJA
          </h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold antolia-font text-transparent bg-gradient-to-r from-yellow-50 via-amber-100 to-yellow-200 bg-clip-text opacity-85">
            ART 2025
          </h2>
        </div>
        <p className="mt-4 text-lg md:text-2xl text-yellow-100 max-w-2xl mx-auto">
          Official Travel Partner - massArt
        </p>
        <p className="mt-3 text-sm md:text-base lg:text-lg text-yellow-50/80 max-w-2xl mx-auto whitespace-nowrap px-4">
          Experience the magic of Durga Puja through Spectra's specially curated guided Art Tours
        </p>
      </div>

      {/* Removed flower images as requested */}

      {/* Optional: Add a subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>
    </section>
  );
}

// Your Home component with the About section
export default function Home() {
  // Effect for scroll-triggered animations
  useEffect(() => {
    const checkVisibility = () => {
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 200 && rect.bottom >= 0;
        
        if (isVisible) {
          // Animate flowers sliding in from left
          const flowers = document.querySelector('.flowers-animation');
          if (flowers instanceof HTMLElement) {
            // Force reset to ensure animation works
            flowers.style.transition = 'none';
            flowers.style.transform = 'translateX(-100%)';
            
            // Force a reflow to ensure the initial styles take effect
            void flowers.offsetWidth;
            
            // Now apply the sliding animation with transition
            flowers.style.transition = 'transform 1.5s ease-out';
            setTimeout(() => {
              flowers.style.transform = 'translateX(0)';
            }, 300);
          }
          
          // Animate clouds sliding in from right
          const cloudLeft = document.querySelector('.cloud-animation-left');
          if (cloudLeft instanceof HTMLElement) {
            // Force reset to ensure animation works
            cloudLeft.style.transition = 'none';
            cloudLeft.style.transform = 'translateX(100%)';
            
            // Force a reflow
            void cloudLeft.offsetWidth;
            
            // Apply animation
            cloudLeft.style.transition = 'transform 1.5s ease-out';
            setTimeout(() => {
              cloudLeft.style.transform = 'translateX(0)';
            }, 200);
          }
          
          const cloudRight = document.querySelector('.cloud-animation-right');
          if (cloudRight instanceof HTMLElement) {
            // Force reset to ensure animation works
            cloudRight.style.transition = 'none';
            cloudRight.style.transform = 'translateX(100%)';
            
            // Force a reflow
            void cloudRight.offsetWidth;
            
            // Apply animation
            cloudRight.style.transition = 'transform 1.8s ease-out';
            setTimeout(() => {
              cloudRight.style.transform = 'translateX(0)';
            }, 400);
          }
          
          // Fade in heading
          const heading = document.querySelector('.heading-animation');
          if (heading instanceof HTMLElement) {
            setTimeout(() => {
              heading.style.opacity = '1';
            }, 800);
          }
          
          // Animate about content with direct style manipulation for better reliability
          const aboutContent = document.querySelector('.about-content');
          if (aboutContent instanceof HTMLElement) {
            // Force browser to recalculate styles before applying the change
            aboutContent.style.opacity = '0';
            aboutContent.style.transform = 'translateY(30px)';
            
            // Force a reflow to ensure the initial styles take effect
            void aboutContent.offsetWidth;
            
            // Now apply the animated styles with a small delay
            setTimeout(() => {
              aboutContent.style.opacity = '1';
              aboutContent.style.transform = 'translateY(0)';
              aboutContent.style.transition = 'opacity 1.2s ease-out, transform 1.5s ease-out';
            }, 1000); // Increased delay to let other animations play first
          }
          
          // Show orbs with delayed appearance
          const orbs = document.querySelectorAll('.floating-orb');
          orbs.forEach((orb, index) => {
            if (orb instanceof HTMLElement) {
              setTimeout(() => {
                orb.style.opacity = '1';
              }, 800 + (index * 150)); // Staggered appearance
            }
          });
        } else {
          // Reset flowers - only when completely out of view
          const flowers = document.querySelector('.flowers-animation');
          if (flowers instanceof HTMLElement && (rect.bottom < 0 || rect.top > window.innerHeight)) {
            // Remove transition to make reset immediate
            flowers.style.transition = 'none';
            flowers.style.transform = 'translateX(-100%)';
            // Force reflow to ensure immediate change
            void flowers.offsetWidth;
          }
          
          // Reset clouds - only when completely out of view
          const cloudLeft = document.querySelector('.cloud-animation-left');
          if (cloudLeft instanceof HTMLElement && (rect.bottom < 0 || rect.top > window.innerHeight)) {
            // Remove transition to make reset immediate
            cloudLeft.style.transition = 'none';
            cloudLeft.style.transform = 'translateX(100%)';
            // Force reflow to ensure immediate change
            void cloudLeft.offsetWidth;
          }
          
          const cloudRight = document.querySelector('.cloud-animation-right');
          if (cloudRight instanceof HTMLElement && (rect.bottom < 0 || rect.top > window.innerHeight)) {
            // Remove transition to make reset immediate
            cloudRight.style.transition = 'none';
            cloudRight.style.transform = 'translateX(100%)';
            // Force reflow to ensure immediate change
            void cloudRight.offsetWidth;
          }
          
          // Reset heading
          const heading = document.querySelector('.heading-animation');
          if (heading instanceof HTMLElement && rect.bottom < 0) {
            heading.style.opacity = '0';
          }
          
          // Reset about content when scrolling away
          const aboutContent = document.querySelector('.about-content');
          if (aboutContent instanceof HTMLElement) {
            // Only reset if fully out of viewport
            if (rect.bottom < 0 || rect.top > window.innerHeight) {
              aboutContent.style.opacity = '0';
              aboutContent.style.transform = 'translateY(30px)';
              aboutContent.style.transition = 'none'; // Remove transition for immediate reset
              
              // Force a reflow to apply the reset immediately
              void aboutContent.offsetWidth;
            }
          }
          
          // Hide orbs when section is out of view
          const orbs = document.querySelectorAll('.floating-orb');
          orbs.forEach((orb) => {
            if (orb instanceof HTMLElement && (rect.bottom < 0 || rect.top > window.innerHeight)) {
              orb.style.opacity = '0';
            }
          });
        }
      }
    };

    // Add event listeners for both scroll and resize events
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    
    // Check visibility on initial load
    // Use a longer delay to ensure DOM is fully loaded and rendered
    setTimeout(checkVisibility, 300);
    
    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);
  
  return (
    <main>
      <Hero />
      
      {/* Add the orbs styles to the head */}
      <style dangerouslySetInnerHTML={{ __html: orbsStyle }} />
      
      {/* About Section with clouds and flowers design */}
      <section 
        className="min-h-screen bg-[#03002B] relative overflow-hidden"
        id="about-section"
      >
        {/* Left side flowers - with slide-in animation from left */}
        <div 
          className="flowers-animation absolute top-[25%] left-0 w-1/2 max-w-[550px] h-auto z-20 transform transition-transform duration-1500 ease-out"
          style={{ 
            transform: 'translateX(-100%)'
          }}
        >
          <div 
            className="relative"
            data-jarallax-element="-10"
          >
            <Image
              src="/flower.png"
              alt="Decorative flowers"
              width={550}
              height={680}
              className="object-contain opacity-90"
              priority
            />
          </div>
        </div>

        {/* Cloud left of heading - with slide-in animation from right */}
        <div 
          className="cloud-animation-left absolute top-[5%] right-[40%] w-[300px] md:w-[400px] z-10 transform transition-transform duration-1500 ease-out"
          style={{ 
            transform: 'translateX(100%)'
          }}
        >
          <div 
            className="relative"
            data-jarallax-element="-8"
          >
            <Image
              src="/cloud.png"
              alt="Cloud"
              width={300}
              height={150}
              className="object-contain opacity-90"
              priority
            />
          </div>
        </div>

        {/* About Us heading - on the right */}
        <div 
          className="heading-animation absolute top-[8%] right-[20%] z-30 opacity-0 transition-opacity duration-2000 ease-in-out"
          style={{ opacity: 0 }}
        >
          <h2 
            className="text-5xl md:text-6xl lg:text-7xl antolia-font text-yellow-50 whitespace-nowrap drop-shadow-[0_2px_10px_rgba(255,215,0,0.3)]"
            data-jarallax-element="-10"
          >
            About Us
          </h2>
        </div>

        {/* Cloud right of heading - with slide-in animation from right */}
        <div 
          className="cloud-animation-right absolute top-[5%] right-[5%] w-[350px] z-10 transform transition-transform duration-1800 ease-out"
          style={{ 
            transform: 'translateX(100%)'
          }}
        >
          <div 
            className="relative"
            data-jarallax-element="-12"
          >
            <Image
              src="/cloud.png"
              alt="Cloud"
              width={350}
              height={175}
              className="object-contain opacity-90"
              priority
            />
          </div>
        </div>

        {/* Text content positioned on the right below the About Us heading */}
        <div className="absolute top-[25%] right-[5%] max-w-[500px] z-30">
          {/* Text content with animation */}
          <div 
            className="about-content opacity-0 transform translate-y-30 will-change-transform"
            style={{
              opacity: 0, 
              transform: 'translateY(30px)',
              willChange: 'opacity, transform'
            }}
          >
            <div className="text-stone-200 space-y-4 text-lg md:text-xl">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse.
              </p>
            </div>
          </div>
        </div>
        
        {/* Floating orbs decorations */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          {/* Orb 1 - Top left area */}
          <div 
            className="floating-orb absolute top-[15%] left-[15%] transition-opacity duration-1000"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 70%)',
              animation: 'float 8s ease-in-out infinite, blink 6s ease-in-out infinite',
              filter: 'blur(2px)',
              opacity: 0,
            }}
          ></div>
          
          {/* Orb 2 - Top right area */}
          <div 
            className="floating-orb absolute top-[8%] right-[30%] transition-opacity duration-1000"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 70%)',
              animation: 'float2 10s ease-in-out infinite, blink 7s ease-in-out infinite',
              filter: 'blur(1px)',
              opacity: 0,
            }}
          ></div>
          
          {/* Orb 3 - Middle right area */}
          <div 
            className="floating-orb absolute top-[30%] right-[20%] transition-opacity duration-1000"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 70%)',
              animation: 'float3 12s ease-in-out infinite, blink 9s ease-in-out infinite',
              filter: 'blur(2px)',
              opacity: 0,
            }}
          ></div>
          
          {/* Orb 4 - Bottom left area */}
          <div 
            className="floating-orb absolute bottom-[20%] left-[25%] transition-opacity duration-1000"
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 70%)',
              animation: 'float 14s ease-in-out infinite, blink 8s ease-in-out infinite',
              filter: 'blur(2px)',
              opacity: 0,
            }}
          ></div>
          
          {/* Orb 5 - Bottom right area */}
          <div 
            className="floating-orb absolute bottom-[10%] right-[15%] transition-opacity duration-1000"
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0) 70%)',
              animation: 'float2 16s ease-in-out infinite, blink 10s ease-in-out infinite',
              filter: 'blur(1px)',
              opacity: 0,
            }}
          ></div>
          
          {/* Orb 6 - Near About Us heading */}
          <div 
            className="floating-orb absolute top-[12%] right-[25%] transition-opacity duration-1000"
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 70%)',
              animation: 'float3 9s ease-in-out infinite, blink 5s ease-in-out infinite',
              filter: 'blur(1px)',
              opacity: 0,
            }}
          ></div>
          
          {/* Add some small twinkling dots for additional magical effect */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={`twinkle-${i}`}
              className="floating-orb absolute transition-opacity duration-1000"
              style={{
                width: `${Math.random() * 15 + 5}px`,
                height: `${Math.random() * 15 + 5}px`,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite`,
                filter: 'blur(1px)',
                opacity: 0,
              }}
            ></div>
          ))}
        </div>
      </section>
    </main>
  );
}