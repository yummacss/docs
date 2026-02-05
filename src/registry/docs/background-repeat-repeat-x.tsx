const bombSvg =
  "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJvbWIiPjxjaXJjbGUgY3g9IjExIiBjeT0iMTMiIHI9IjkiLz48cGF0aCBkPSJNMTQuMzUgNC42NSAxNi4zIDIuN2EyLjQxIDIuNDEgMCAwIDEgMy40IDBsMS42IDEuNmEyLjQgMi40IDAgMCAxIDAgMy40bC0xLjk1IDEuOTUiLz48cGF0aCBkPSJtMjIgMi0xLjUgMS41Ii8+PC9zdmc+')";

export default function BackgroundRepeatRepeatX() {
  return (
    <div className="br-rx bp-c h-s" style={{ backgroundImage: bombSvg }}>
      <div className="p-10"></div>
    </div>
  );
}
