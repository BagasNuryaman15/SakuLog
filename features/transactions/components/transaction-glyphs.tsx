type TransactionGlyphProps = {
  className?: string;
};

export function ExpenseGlyph({ className }: TransactionGlyphProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      role="img"
      aria-label="Expense glyph"
    >
      <path
        d="M17 18.5C17 14.91 19.91 12 23.5 12H45L53 20V45.5C53 49.09 50.09 52 46.5 52H23.5C19.91 52 17 49.09 17 45.5V18.5Z"
        fill="url(#expenseBody)"
        stroke="currentColor"
        strokeOpacity="0.34"
        strokeWidth="1.5"
      />
      <path
        d="M44.5 12.5V20.5H52.5"
        stroke="currentColor"
        strokeOpacity="0.42"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M25 26H40.5C43.54 26 46 28.46 46 31.5C46 34.54 43.54 37 40.5 37H26.5"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M31.5 31L25 37.5L31.5 44"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17" cy="18" r="5" fill="url(#expenseSpark)" />
      <circle cx="49" cy="47" r="3" fill="currentColor" fillOpacity="0.42" />
      <defs>
        <linearGradient id="expenseBody" x1="17" x2="55" y1="12" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="currentColor" stopOpacity="0.24" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.04" />
        </linearGradient>
        <radialGradient id="expenseSpark" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15.5 16.5) rotate(45) scale(8)">
          <stop stopColor="white" />
          <stop offset="1" stopColor="currentColor" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function IncomeGlyph({ className }: TransactionGlyphProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      role="img"
      aria-label="Income glyph"
    >
      <path
        d="M12 31.5C12 20.73 20.73 12 31.5 12H33C43.49 12 52 20.51 52 31V33C52 43.49 43.49 52 33 52H31.5C20.73 52 12 43.27 12 32.5V31.5Z"
        fill="url(#incomeBody)"
        stroke="currentColor"
        strokeOpacity="0.34"
        strokeWidth="1.5"
      />
      <path
        d="M40.5 25H26.5C23.46 25 21 27.46 21 30.5C21 33.54 23.46 36 26.5 36H39"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M32.5 42L39 35.5L32.5 29"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 7V15"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M32 49V57"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="49" cy="16" r="4.5" fill="url(#incomeSpark)" />
      <circle cx="15" cy="47" r="3" fill="currentColor" fillOpacity="0.42" />
      <defs>
        <linearGradient id="incomeBody" x1="12" x2="52" y1="12" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="currentColor" stopOpacity="0.24" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.04" />
        </linearGradient>
        <radialGradient id="incomeSpark" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(47.5 14.5) rotate(45) scale(7)">
          <stop stopColor="white" />
          <stop offset="1" stopColor="currentColor" />
        </radialGradient>
      </defs>
    </svg>
  );
}
