import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Brain, Smile, Star, Sun, Moon, Coffee, CheckCircle } from 'lucide-react';

const MentalHealthScreener = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [phq9Answers, setPhq9Answers] = useState(Array(9).fill(null));
  const [gad7Answers, setGad7Answers] = useState(Array(7).fill(null));
  const [ghqAnswers, setGhqAnswers] = useState(Array(12).fill(null));
  const [showMicroBreak, setShowMicroBreak] = useState(false);

  const phq9Questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself or that you are a failure",
    "Trouble concentrating on things",
    "Moving or speaking slowly, or being fidgety/restless",
    "Thoughts that you would be better off dead or hurting yourself"
  ];

  const gad7Questions = [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it's hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid as if something awful might happen"
  ];

  const ghqQuestions = [
    "Been able to concentrate on whatever you're doing",
    "Lost much sleep over worry",
    "Felt that you were playing a useful part in things",
    "Felt capable of making decisions about things",
    "Felt constantly under strain",
    "Felt you couldn't overcome your difficulties",
    "Been able to enjoy your normal day-to-day activities",
    "Been able to face up to problems",
    "Been feeling unhappy or depressed",
    "Been losing confidence in yourself",
    "Been thinking of yourself as a worthless person",
    "Been feeling reasonably happy, all things considered"
  ];

  const responseOptions = [
    { value: 0, label: "Not at all", color: "bg-green-100 text-green-800" },
    { value: 1, label: "Several days", color: "bg-yellow-100 text-yellow-800" },
    { value: 2, label: "More than half the days", color: "bg-orange-100 text-orange-800" },
    { value: 3, label: "Nearly every day", color: "bg-red-100 text-red-800" }
  ];

  const ghqOptions = [
    { value: 0, label: "Better than usual", color: "bg-green-100 text-green-800" },
    { value: 1, label: "Same as usual", color: "bg-blue-100 text-blue-800" },
    { value: 2, label: "Less than usual", color: "bg-orange-100 text-orange-800" },
    { value: 3, label: "Much less than usual", color: "bg-red-100 text-red-800" }
  ];

  const motivationalQuotes = [
    "You're stronger than you think 💪",
    "Every step forward is progress ✨",
    "Your mental health matters 💙",
    "It's okay to not be okay 🤗",
    "You're doing great by taking this step 🌟"
  ];

  const wellnessTips = [
    "Did you know? Even 5 minutes of deep breathing can reduce stress! 🌬️",
    "Mental health tip: Regular sleep helps regulate emotions 😴",
    "Fun fact: Exercise releases natural mood boosters! 🏃‍♀️",
    "Remember: Asking for help is a sign of strength 💪"
  ];

  const calculateScores = () => {
    const phq9Score = phq9Answers.reduce((sum, answer) => sum + (answer || 0), 0);
    const gad7Score = gad7Answers.reduce((sum, answer) => sum + (answer || 0), 0);
    const ghqScore = ghqAnswers.reduce((sum, answer) => sum + (answer || 0), 0);
    
    return { phq9Score, gad7Score, ghqScore };
  };

  const getCategory = (score, test) => {
    if (test === 'phq9') {
      if (score <= 4) return { category: 'Minimal', color: 'text-green-600', icon: '😊' };
      if (score <= 9) return { category: 'Mild', color: 'text-yellow-600', icon: '🙂' };
      if (score <= 14) return { category: 'Moderate', color: 'text-orange-600', icon: '😐' };
      return { category: 'Severe', color: 'text-red-600', icon: '😔' };
    }
    if (test === 'gad7') {
      if (score <= 4) return { category: 'Minimal', color: 'text-green-600', icon: '😌' };
      if (score <= 9) return { category: 'Mild', color: 'text-yellow-600', icon: '😅' };
      if (score <= 14) return { category: 'Moderate', color: 'text-orange-600', icon: '😰' };
      return { category: 'Severe', color: 'text-red-600', icon: '😨' };
    }
    if (test === 'ghq') {
      if (score <= 2) return { category: 'Good wellbeing', color: 'text-green-600', icon: '🌟' };
      if (score <= 6) return { category: 'Moderate distress', color: 'text-orange-600', icon: '⚠️' };
      return { category: 'Significant distress', color: 'text-red-600', icon: '🆘' };
    }
  };

  const getTotalSteps = () => {
    return 2 + phq9Questions.length + 1 + gad7Questions.length + 1 + ghqQuestions.length + 1; // Welcome + PHQ9 + break + GAD7 + break + GHQ + results
  };

  const getProgressPercentage = () => {
    return (currentStep / (getTotalSteps() - 1)) * 100;
  };

  const handleAnswer = (value, questionIndex) => {
    if (currentStep >= 2 && currentStep <= 10) { // PHQ-9
      const newAnswers = [...phq9Answers];
      newAnswers[currentStep - 2] = value;
      setPhq9Answers(newAnswers);
    } else if (currentStep >= 12 && currentStep <= 18) { // GAD-7
      const newAnswers = [...gad7Answers];
      newAnswers[currentStep - 12] = value;
      setGad7Answers(newAnswers);
    } else if (currentStep >= 20 && currentStep <= 31) { // GHQ
      const newAnswers = [...ghqAnswers];
      newAnswers[currentStep - 20] = value;
      setGhqAnswers(newAnswers);
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderWelcomeScreen = () => (
    <div className="text-center space-y-8 animate-fade-in">
      <div className="text-6xl mb-4">🌱</div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Your Wellness Check-in</h1>
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl">
        <p className="text-lg text-gray-700 mb-4">
          This is your safe space. Your answers are completely private and help us guide you better.
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center"><Heart className="w-4 h-4 text-red-400 mr-1" />Private</div>
          <div className="flex items-center"><Brain className="w-4 h-4 text-blue-400 mr-1" />Personalized</div>
          <div className="flex items-center"><Star className="w-4 h-4 text-yellow-400 mr-1" />Supportive</div>
        </div>
      </div>
      <button 
        onClick={nextStep}
        className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        Start My Wellness Journey ✨
      </button>
    </div>
  );

  const renderIntroScreen = () => (
    <div className="text-center space-y-6 animate-fade-in">
      <div className="text-5xl mb-4">📝</div>
      <h2 className="text-2xl font-bold text-gray-800">Let's Check In With You</h2>
      <div className="bg-blue-50 p-6 rounded-2xl">
        <p className="text-gray-700 mb-4">
          Over the past 2 weeks, how often have you been bothered by any of the following?
        </p>
        <p className="text-sm text-blue-600 font-medium">
          Remember: There are no right or wrong answers. Just be honest with yourself 💙
        </p>
      </div>
      <button 
        onClick={nextStep}
        className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors"
      >
        I'm Ready
      </button>
    </div>
  );

  const renderMicroBreak = (type) => {
    const content = type === 'phq9' ? {
      emoji: '🌟',
      title: 'You\'re doing great!',
      message: 'Take a deep breath. You\'re halfway through your wellness check-in.',
      tip: motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
    } : {
      emoji: '💪',
      title: 'Keep going strong!',
      message: 'You\'re making progress on your wellness journey.',
      tip: wellnessTips[Math.floor(Math.random() * wellnessTips.length)]
    };

    return (
      <div className="text-center space-y-6 animate-fade-in">
        <div className="text-6xl mb-4 animate-pulse">{content.emoji}</div>
        <h2 className="text-2xl font-bold text-gray-800">{content.title}</h2>
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl">
          <p className="text-gray-700 mb-3">{content.message}</p>
          <div className="text-lg font-medium text-green-600">{content.tip}</div>
        </div>
        <div className="flex items-center justify-center space-x-2 text-gray-500">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
        <button 
          onClick={nextStep}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
        >
          Continue Journey →
        </button>
      </div>
    );
  };

  const renderQuestion = (question, questionIndex, answers, isGHQ = false) => {
    const options = isGHQ ? ghqOptions : responseOptions;
    const currentAnswer = answers[questionIndex];

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="text-center mb-8">
          <div className="text-2xl mb-2">💭</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {isGHQ ? 'In the past few weeks, have you...' : 'Over the past 2 weeks, how often have you been bothered by:'}
          </h2>
          <p className="text-lg text-gray-700 bg-gray-50 p-4 rounded-xl">
            {question}
          </p>
        </div>

        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.value, questionIndex)}
              className={`w-full p-4 rounded-xl text-left transition-all duration-200 border-2 ${
                currentAnswer === option.value
                  ? 'border-blue-400 bg-blue-50 transform scale-105 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${option.color}`}>
                  {option.label}
                </span>
                {currentAnswer === option.value && (
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const scores = calculateScores();
    const phq9Category = getCategory(scores.phq9Score, 'phq9');
    const gad7Category = getCategory(scores.gad7Score, 'gad7');
    const ghqCategory = getCategory(scores.ghqScore, 'ghq');

    const getRecommendation = () => {
      const maxScore = Math.max(scores.phq9Score, scores.gad7Score);
      if (maxScore >= 15) {
        return {
          title: "Connect with Support",
          message: "Consider reaching out to a counselor or mental health professional. You don't have to face this alone.",
          buttonText: "Connect with Counselor Now",
          buttonColor: "bg-red-500 hover:bg-red-600"
        };
      } else if (maxScore >= 5) {
        return {
          title: "Explore Wellness Resources",
          message: "You might benefit from some additional support and self-care strategies.",
          buttonText: "Explore Your Wellness Plan",
          buttonColor: "bg-blue-500 hover:bg-blue-600"
        };
      } else {
        return {
          title: "Keep Up the Great Work",
          message: "You're doing well! Continue with your current self-care practices.",
          buttonText: "View Wellness Tips",
          buttonColor: "bg-green-500 hover:bg-green-600"
        };
      }
    };

    const recommendation = getRecommendation();

    return (
      <div className="space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Wellness Summary</h2>
          <p className="text-gray-600">Thank you for taking the time to check in with yourself</p>
        </div>

        <div className="grid gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Mood & Energy</h3>
              <span className="text-2xl">{phq9Category.icon}</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{scores.phq9Score}/27</p>
                <p className={`font-medium ${phq9Category.color}`}>{phq9Category.category}</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <div 
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-green-400"
                  style={{ transform: `scale(${Math.min(scores.phq9Score / 27, 1)})` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Anxiety Levels</h3>
              <span className="text-2xl">{gad7Category.icon}</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{scores.gad7Score}/21</p>
                <p className={`font-medium ${gad7Category.color}`}>{gad7Category.category}</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <div 
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                  style={{ transform: `scale(${Math.min(scores.gad7Score / 21, 1)})` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">General Wellbeing</h3>
              <span className="text-2xl">{ghqCategory.icon}</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{scores.ghqScore}/36</p>
                <p className={`font-medium ${ghqCategory.color}`}>{ghqCategory.category}</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <div 
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400"
                  style={{ transform: `scale(${Math.min(scores.ghqScore / 36, 1)})` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{recommendation.title}</h3>
          <p className="text-gray-700 mb-4">{recommendation.message}</p>
          <button className={`w-full py-3 px-6 rounded-xl text-white font-semibold transition-colors ${recommendation.buttonColor}`}>
            {recommendation.buttonText}
          </button>
        </div>

        <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">✨ Wellness Tip of the Day</h3>
          <p className="text-gray-700 mb-4">
            "Remember: Mental health is just as important as physical health. Taking care of yourself isn't selfish—it's necessary."
          </p>
          <p className="text-blue-600 font-medium">Reaching out is a sign of strength 💙</p>
        </div>

        <div className="flex space-x-3">
          <button className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
            Save Results
          </button>
          <button 
            onClick={() => setCurrentStep(0)}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Retake Assessment
          </button>
        </div>
      </div>
    );
  };

  const renderCurrentStep = () => {
    if (currentStep === 0) return renderWelcomeScreen();
    if (currentStep === 1) return renderIntroScreen();
    if (currentStep >= 2 && currentStep <= 10) {
      return renderQuestion(phq9Questions[currentStep - 2], currentStep - 2, phq9Answers);
    }
    if (currentStep === 11) return renderMicroBreak('phq9');
    if (currentStep >= 12 && currentStep <= 18) {
      return renderQuestion(gad7Questions[currentStep - 12], currentStep - 12, gad7Answers);
    }
    if (currentStep === 19) return renderMicroBreak('gad7');
    if (currentStep >= 20 && currentStep <= 31) {
      return renderQuestion(ghqQuestions[currentStep - 20], currentStep - 20, ghqAnswers, true);
    }
    if (currentStep === 32) return renderResults();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress Bar */}
        {currentStep > 0 && currentStep < 32 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep} of {getTotalSteps() - 1}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(getProgressPercentage())}% complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {renderCurrentStep()}
        </div>

        {/* Navigation */}
        {currentStep > 0 && currentStep < 32 && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={prevStep}
              disabled={currentStep <= 1}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            
            {/* Auto-advance after answer selection, or manual next for intro screens */}
            {(currentStep === 1 || currentStep === 11 || currentStep === 19) && (
              <button
                onClick={nextStep}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {/* Auto-advance for question screens */}
            {((currentStep >= 2 && currentStep <= 10 && phq9Answers[currentStep - 2] !== null) ||
              (currentStep >= 12 && currentStep <= 18 && gad7Answers[currentStep - 12] !== null) ||
              (currentStep >= 20 && currentStep <= 31 && ghqAnswers[currentStep - 20] !== null)) && (
              <button
                onClick={nextStep}
                className="flex items-center space-x-2 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors animate-pulse"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MentalHealthScreener;