import * as React from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';



const StarDisplay: React.FC = () => {
  const stars = generateRandomStars();

  return (
    <Rating
      name="read-only"
      value={stars}
      readOnly
      precision={0.5}
      emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
    />
  );
};
function generateRandomStars(): number {
  const minStars = 3.5;
  const maxStars = 5;
  return Math.floor(Math.random() * (maxStars - minStars + 1)) + minStars;
}
export default StarDisplay;