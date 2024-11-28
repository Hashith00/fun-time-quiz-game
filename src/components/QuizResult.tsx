import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Home, RotateCcw } from "lucide-react";
import confetti from 'canvas-confetti';

type QuizResultProps = {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onHome: () => void;
};

export function QuizResult({ score, totalQuestions, onRestart, onHome }: QuizResultProps) {
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 3,
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        origin: { y: 0.6 },
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const percentage = (score / totalQuestions) * 100;
  let message = '';
  let color = '';

  if (percentage >= 80) {
    message = 'Outstanding Performance! 🌟';
    color = 'text-green-500';
  } else if (percentage >= 60) {
    message = 'Well Done! 👏';
    color = 'text-blue-500';
  } else {
    message = 'Keep Learning! 📚';
    color = 'text-yellow-500';
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-2">
        <div className="flex justify-center mb-4">
          <Trophy className="h-16 w-16 text-yellow-500" />
        </div>
        <CardTitle className="text-2xl font-bold">Quiz Completed!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <p className={`text-xl font-semibold ${color}`}>{message}</p>
          <div className="text-4xl font-bold">
            {score}/{totalQuestions}
          </div>
          <p className="text-muted-foreground">
            You scored {Math.round(percentage)}%
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={onRestart}
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </Button>
          <Button 
            className="w-full flex items-center justify-center gap-2"
            onClick={onHome}
          >
            <Home className="h-4 w-4" />
            Home
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}