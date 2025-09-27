
const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex space-x-3">
        <span className="dot"></span>
        <span className="dot" style={{ animationDelay: "0.2s" }}></span>
        <span className="dot" style={{ animationDelay: "0.4s" }}></span>
      </div>

      <style>{`
        .dot {
          width: 16px;
          height: 16px;
          background-color: #333;
          border-radius: 50%;
          display: inline-block;
          animation: jump 0.6s infinite ease-in-out;
        }

        @keyframes jump {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-16px);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
