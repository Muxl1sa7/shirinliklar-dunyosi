import { FiStar } from 'react-icons/fi';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
}

export default function StarRating({ value, onChange, readOnly }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          aria-label={`${star} yulduz`}
          className={`text-amber-400 ${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
        >
          <FiStar size={20} fill={star <= value ? 'currentColor' : 'none'} />
        </button>
      ))}
    </div>
  );
}
