import { TutorialStepData } from "@/types/tutorial"
import TutorialStep from "./tutorial-step"

type TutorialProps = {
    steps: TutorialStepData[];
}

export default function Tutorial({ steps }: TutorialProps) {
    return (
        <div className="max-w-3xl mx-auto py-8">
        {steps.map((step) => (
            <TutorialStep key={step.stepNumber} {...step} />
        ))}
        </div>
    );
}