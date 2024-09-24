// import React, { useEffect, useState } from 'react';
// import { useMediaQuery } from 'react-responsive';

// const MyResponsiveComponent = () => {
//   const [isMounted, setIsMounted] = useState(false); // 컴포넌트가 마운트 되었는지 확인
//   const isDesktop = useMediaQuery({ minWidth: 1024, minHeight: 800 });
//   const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023, minHeight: 600 });
//   const isMobile = useMediaQuery({ maxWidth: 767, maxHeight: 599 });

//   useEffect(() => {
//     setIsMounted(true); // 클라이언트에서 렌더링할 때 상태 변경
//   }, []);

//   if (!isMounted) {
//     return null; // 클라이언트에서만 렌더링
//   }

//   return (
//     <div>
//       {isDesktop && <h1>이 화면은 데스크탑 뷰입니다</h1>}
//       {isTablet && <h1>이 화면은 태블릿 뷰입니다</h1>}
//       {isMobile && <h1>이 화면은 모바일 뷰입니다</h1>}
//     </div>
//   );
// };

// export default MyResponsiveComponent;
