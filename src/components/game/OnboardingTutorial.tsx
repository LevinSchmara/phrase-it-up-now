
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const steps = [
  {
    title: "Welcome to Word Spy!",
    description: "A fun game to play during video calls with friends or colleagues. Let's learn how to play!",
    image: "step1.png"
  },
  {
    title: "Get Your Secret Word",
    description: "You'll receive a secret word to use naturally in conversation. Choose your difficulty level for more challenging words.",
    image: "step2.png"
  },
  {
    title: "Listen Carefully",
    description: "Pay attention to what others say. When you hear someone use their secret word, click the checkmark next to their name.",
    image: "step3.png"
  },
  {
    title: "Score Points",
    description: "Earn points when you successfully use your word without being detected, and when you catch others using their words.",
    image: "step4.png"
  },
  {
    title: "Ready to Play?",
    description: "Create a new game and share the code with friends, or join an existing game with a game code.",
    image: "step5.png"
  }
];

const OnboardingTutorial: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [open, setOpen] = useState(true);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setOpen(false);
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setOpen(false);
    onComplete();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {steps[currentStep].title}
          </DialogTitle>
          <DialogDescription>
            {steps[currentStep].description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 flex justify-center">
          <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center">
            {/* Placeholder for tutorial images */}
            <p className="text-muted-foreground">Tutorial Image {currentStep + 1}</p>
          </div>
        </div>
        
        <div className="flex justify-center mt-2">
          {steps.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 mx-1 rounded-full ${
                index === currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-between">
          <div>
            {currentStep > 0 ? (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            ) : (
              <Button variant="ghost" onClick={handleSkip}>
                Skip
              </Button>
            )}
          </div>
          <Button onClick={handleNext}>
            {currentStep < steps.length - 1 ? 'Next' : 'Start Playing'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingTutorial;
