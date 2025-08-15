import SocialButtons from "@/components/social-buttons";
import RepositoriesButtons from "@/components/repos-buttons";

export default function Footer() {
    return (
        <footer className="bg-gray-100 py-4 text-center text-sm text-gray-500">
            <SocialButtons />
            <RepositoriesButtons />
            Sin relación con la Universidad de Córdoba <br /> © Augusto Díaz - 2025
        </footer>
    );
}