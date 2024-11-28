import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

type QuizCardProps = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
  isLastQuestion: boolean;
};

export function QuizCard({ 
  question, 
  options, 
  correctAnswer, 
  explanation, 
  onAnswer,
  onNext,
  isLastQuestion 
}: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (option: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    setShowExplanation(true);
    onAnswer(option === correctAnswer);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    onNext();
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-4">
        <CardTitle className="text-xl sm:text-2xl font-bold leading-tight">
          {question}
        </CardTitle>
        <CardDescription>Select your answer</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {options.map((option) => (
            <Button
              key={option}
              variant="outline"
              className={cn(
                "h-auto p-4 text-left justify-start text-base sm:text-lg transition-all",
                selectedAnswer && {
                  'bg-red-100 border-red-500 dark:bg-red-900/20': 
                    selectedAnswer === option && option !== correctAnswer,
                  'bg-green-100 border-green-500 dark:bg-green-900/20': 
                    option === correctAnswer,
                }
              )}
              onClick={() => handleAnswerSelect(option)}
              disabled={!!selectedAnswer}
            >
              {option}
            </Button>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-6 p-4 rounded-lg bg-muted/50 border">
            <p className="font-semibold mb-2">
              {selectedAnswer === correctAnswer ? (
                <span className="text-green-600 dark:text-green-400">
                  ✓ Correct Answer!
                </span>
              ) : (
                <span className="text-red-600 dark:text-red-400">
                  ✗ Incorrect. The correct answer is: {correctAnswer}
                </span>
              )}
            </p>
            <p className="text-muted-foreground text-sm sm:text-base">
              {explanation}
            </p>
          </div>
        )}

        {showExplanation && (
          <Button 
            className="w-full mt-4" 
            onClick={handleNext}
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}