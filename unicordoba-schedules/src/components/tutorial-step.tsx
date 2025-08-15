import Image from "next/image";
import { TutorialStepData } from "@/types/tutorial";

export default function TutorialStep({ stepNumber, title, image, description }: TutorialStepData) {
    return (
        <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">
            {stepNumber} - {title}
        </h2>
        <p className="mb-4">{description}</p>
        <Image
            src={image}
            alt={title}
            width={1920}
            height={1080}
            quality={100}
            className="rounded-lg"
        />
        </div>
    );
}