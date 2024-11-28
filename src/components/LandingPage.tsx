import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Timer, Book, Users, Star, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="pt-24 pb-16 px-4 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-6 mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Challenge Your Knowledge
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Test your skills, learn new facts, and compete with others in
                our interactive quiz platform.
              </p>
              <Button
                size="lg"
                className="text-lg px-8 py-6 transition-all hover:scale-[1.02]"
                onClick={() => navigate("/quiz")}
              >
                Start Your Quest
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <FeatureCard
                icon={Trophy}
                title="Compete"
                description="Test your knowledge against challenging questions"
              />
              <FeatureCard
                icon={Timer}
                title="Quick"
                description="30 seconds per question, keeping you engaged"
              />
              <FeatureCard
                icon={Book}
                title="Learn"
                description="Detailed explanations for each answer"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose Knowledge Quest?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <BenefitCard
                icon={Users}
                title="Community Driven"
                description="Join a community of knowledge seekers and share your expertise"
              />
              <BenefitCard
                icon={Star}
                title="Quality Content"
                description="Carefully curated questions across various topics"
              />
              <BenefitCard
                icon={Sparkles}
                title="Instant Feedback"
                description="Get immediate feedback and detailed explanations"
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">About Knowledge Quest</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Knowledge Quest is more than just a quiz platform. It's a journey
              of discovery, learning, and personal growth. Our mission is to
              make learning engaging and fun while helping you expand your
              knowledge across various subjects.
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/quiz")}
            >
              Begin Your Journey
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Trophy;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-2">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div className="inline-block p-3 bg-primary/10 rounded-xl">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-semibold text-xl">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function BenefitCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Trophy;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background border">
      <Icon className="h-10 w-10 mb-4 text-primary" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
