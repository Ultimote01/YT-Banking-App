export default function isMobile() {
  // Check for touch points (modern standard)
  const hasTouchScreen = navigator.maxTouchPoints > 0;
  
  // Check pointer accuracy (coarse = finger, fine = mouse)
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

  const isMobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  return hasTouchScreen && isCoarsePointer && isMobileRegex;
}

