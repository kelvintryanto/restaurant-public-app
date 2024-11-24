export default function Footer() {
  const year = new Date().getFullYear();
  const author = "Kelvin Tryanto";

  return (
    <div className="flex justify-center p-5 bg-green-800 text-white">
      @{year} by {author}. All rights reserved.
    </div>
  );
}
