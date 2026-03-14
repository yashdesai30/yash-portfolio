"use client";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-bg text-text-secondary py-10">
      <div className="container mx-auto px-4 text-center space-y-4">
        <p className="text-xs">
          &copy; {currentYear} Yash Desai. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
