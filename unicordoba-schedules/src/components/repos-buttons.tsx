import { FaReact, FaPython } from "react-icons/fa";

export default function RepositoriesButtons() {
    return (
        <div className="flex gap-4 justify-center">
            <a
                href="https://github.com/AugustoGuapo/unicordoba-schedules-fe"
                className="text-gray-600 hover:text-black text-2x1">
                <FaReact/>
            </a>
            <a
                href="https://github.com/AugustoGuapo/unicordoba-schedules-be"
                className="text-gray-600 hover:text-black text 2x1"
            >
                <FaPython />
            </a>
        </div>
    )
}