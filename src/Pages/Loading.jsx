// 
// import React from "react";
// 
// const Loading = () => {
//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-50">
//       <div className="flex flex-col items-center">
//         <div className="w-16 h-16 border-4 border-t-[#297B33] border-gray-200 rounded-full animate-spin mb-4"></div>
//         <p className="text-[#297B33] font-semibold text-lg">Loading...</p>
//       </div>
//     </div>
//   );
// };
// 
// export default Loading;
// 


import React from 'react';
import styled from 'styled-components';

const Loading = () => {
  return (
    <StyledWrapper>
      <div className="spinner">
        {[...Array(10)].map((_, i) => (
          <div key={i} style={{ "--rotation": 36 * (i + 1), "--delay": 0.1 * (i + 1), "--translation": 150 }} />
        ))}
      </div>
      <p className="loading-text">Loading...</p>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full screen height */
  background-color: #f9fafb; /* Tailwind gray-50 */
  
  .spinner {
    position: relative;
    width: 60px;
    height: 60px;
    margin-bottom: 1rem;
  }

  .spinner div {
    position: absolute;
    width: 10%;
    height: 30%;
    background: #16a34a; /* Tailwind green-600 */
    transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
    animation: spinner-fzua35 1s calc(var(--delay) * 1s) infinite ease;
    border-radius: 2px;
  }

  @keyframes spinner-fzua35 {
    0%, 10%, 20%, 30%, 50%, 60%, 70%, 80%, 90%, 100% {
      transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
    }
    50% {
      transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1.5%));
    }
  }

  .loading-text {
    font-size: 1.25rem;
    font-weight: 600;
    color: #16a34a; /* Tailwind green-600 */
  }
`;

export default Loading;
