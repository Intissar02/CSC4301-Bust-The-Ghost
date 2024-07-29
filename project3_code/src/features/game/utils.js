// Utility function to calculate distance
export function calculateDistance(x1, y1, x2, y2) {
    return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
  }
  
// Function to determine the color based on distance
export function getColorBasedOnDistance(distance) {
  if (distance === 0) return 'red';
  if (distance <= 2) return 'orange';
  if (distance <= 4) return 'yellow';
  return 'green';
}

export function getDirection(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  if (angle >= -45 && angle < 45) return 'Go East';
  if (angle >= 45 && angle < 135) return 'Go North';
  if (angle >= -135 && angle < -45) return 'Go South';
  return 'Go West';
}

export const directionAccuracy = {
  'Direct': 0.9,
  'Near': 0.75,
  'Far': 0.5
};

export function calculateDirectionAccuracy(distance) {
  if (distance === 0) return directionAccuracy['Direct'];
  else if (distance <= 2) return directionAccuracy['Near'];
  else return directionAccuracy['Far'];
}

