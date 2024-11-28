import { useState, useEffect } from 'react';
import { QuizCard } from './QuizCard';
import { QuizResult } from './QuizResult';
import questionsData from '../data/questions.json';
import { Progress } from "@/components/ui/progress";
import { useNavigate } from 'react-router-dom';

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const shuffled = [...questionsData.questions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10));
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    const shuffled = [...questionsData.questions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10));
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsFinished(false);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading your quiz...</div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <QuizResult
          score={score}
          totalQuestions={questions.length}
          onRestart={handleRestart}
          onHome={() => navigate('/')}
        />
      </div>
    );
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{currentQuestionIndex + 1}/{questions.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <QuizCard
          question={questions[currentQuestionIndex].question}
          options={questions[currentQuestionIndex].options}
          correctAnswer={questions[currentQuestionIndex].correctAnswer}
          explanation={questions[currentQuestionIndex].explanation}
          onAnswer={handleAnswer}
          onNext={handleNext}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
        />
      </div>
    </div>
  );
}