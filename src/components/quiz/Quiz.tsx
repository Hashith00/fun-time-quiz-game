import { useState, useEffect } from "react";
import { QuizCard } from "../QuizCard";
import { QuizResult } from "../QuizResult";
import { QuizTimer } from "./QuizTimer";
import questionsData from "@/data/questions.json";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Header } from "../layout/Header";

const QUESTION_DURATION = 30; // seconds per question

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
  const [isAnswered, setIsAnswered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const shuffled = [...questionsData.questions].sort(
      () => 0.5 - Math.random()
    );
    setQuestions(shuffled.slice(0, 10));
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    setIsAnswered(true);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleTimeUp = () => {
    if (!isAnswered) {
      handleNext();
    }
  };

  const handleRestart = () => {
    const shuffled = [...questionsData.questions].sort(
      () => 0.5 - Math.random()
    );
    setQuestions(shuffled.slice(0, 10));
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsFinished(false);
    setIsAnswered(false);
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
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center p-4">
          <QuizResult
            score={score}
            totalQuestions={questions.length}
            onRestart={handleRestart}
            onHome={() => navigate("/")}
          />
        </div>
      </>
    );
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="grid gap-4">
              <QuizTimer
                duration={QUESTION_DURATION}
                onTimeUp={handleTimeUp}
                isActive={!isAnswered}
              />
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Progress</span>
                  <span>
                    {currentQuestionIndex + 1}/{questions.length}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
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
      </main>
    </>
  );
}
