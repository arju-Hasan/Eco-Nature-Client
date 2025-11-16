// import React from 'react';
// 
// const Container = ({children}) => {
//     return (
//         <div className='container mx-auto px-2'>
//             {children}
//         </div>
//     );
// };
// 
// export default Container;



import React from "react";

const Container = ({ className, children }) => {
  return <div className={`${className} container mx-auto`}>{children}</div>;
};

export default Container;
