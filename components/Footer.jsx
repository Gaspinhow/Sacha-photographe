import Link from "next/link";
export default function Footer(){
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-8 flex justify-between text-sm">
        <p>© 2025 Sacha Nahum Photographie.</p>
        <nav>
          <Link className="hover:underline" href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
