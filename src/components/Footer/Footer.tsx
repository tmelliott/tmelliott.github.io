export default function Footer() {
  const today = new Date();
  return (
    <footer className="pt-4 pb-8 text-white px-4 text-sm">
      &copy; {today.getFullYear()} Tom Elliott. All rights reserved.
    </footer>
  );
}
