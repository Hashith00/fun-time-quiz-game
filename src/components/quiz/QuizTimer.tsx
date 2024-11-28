import { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { cn } from '@/lib/utils';

type QuizTimerProps = {
  duration: number; // in seconds
  onTimeUp: () => void;
  isActive: boolean;
};

export function QuizTimer({ duration, onTimeUp, isActive }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, onTimeUp, isActive]);

  const progress = (timeLeft / duration) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Time Remaining</span>
        <span className={cn(
          "text-sm font-mono",
          timeLeft <= 10 && "text-red-500 animate-pulse"
        )}>
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>
      <Progress 
        value={progress} 
        className={cn(
          "h-2 transition-all",
          progress <= 20 && "bg-red-100 [&>div]:bg-red-500"
        )} 
      />
    </div>
  );
}