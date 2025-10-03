function LoadingBox() {
  return (
    <div>
      <span className="text-animate">L</span>
      <span className="text-animate">o</span>
      <span className="text-animate">a</span>
      <span className="text-animate">d</span>
      <span className="text-animate">i</span>
      <span className="text-animate">n</span>
      <span className="text-animate">g</span>
      <span className="dot-animate">.</span>
      <span className="dot-animate">.</span>
      <span className="dot-animate">.</span>

      <style jsx>{`
        .text-animate {
          display: inline-block;
          animation: pulse 0.8s infinite;
        }
          
        .text-animate:nth-child(1) { animation-delay: 0s; }
        .text-animate:nth-child(2) { animation-delay: 0.1s; }
        .text-animate:nth-child(3) { animation-delay: 0.2s; }
        .text-animate:nth-child(4) { animation-delay: 0.3s; }
        .text-animate:nth-child(5) { animation-delay: 0.4s; }
        .text-animate:nth-child(6) { animation-delay: 0.5s; }
        .text-animate:nth-child(7) { animation-delay: 0.6s; }

        .dot-animate {
          display: inline-block;
          opacity: 0;
          animation: blink 0.8s infinite;
        }

        .dot-animate:nth-child(8) { animation-delay: 0.7s; }
        .dot-animate:nth-child(9) { animation-delay: 0.8s; }
        .dot-animate:nth-child(10) { animation-delay: 0.9s; }

        @keyframes pulse {
          0%, 20%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }

        @keyframes blink {
          0%, 50%, 100% { opacity: 0; }
          25% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default LoadingBox
