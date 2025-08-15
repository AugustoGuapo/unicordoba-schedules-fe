import { FaGithub, FaLinkedin } from "react-icons/fa"

export default function SocialButtons() {
    return <div className="flex gap-4 justify-center">
        <a
            href="https://github.com/AugustoGuapo"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black text-2x1"
        >
            <FaGithub />
        </a>
        <a
            href="https://www.linkedin.com/in/augusto-sergio-d%C3%ADaz-polo/"
            rel="noopener noreferrer"
            className="text-gray-600 gover:text-black text-2x1"
        >
            <FaLinkedin />
        </a>
    </div>
}