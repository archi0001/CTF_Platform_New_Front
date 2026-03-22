type Props = {
  className?: string;
};

export default function RequiredIcon({ className }: Props) {
  return (
    <svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.45617 5.8882H2.27217L2.30417 3.9202L0.608168 4.92819L0.000167966 3.90419L1.72817 2.92819L0.000167966 1.96819L0.608168 0.944195L2.30417 1.96819L2.27217 0.00019455H3.45617L3.42417 1.96819L5.12017 0.944195L5.71217 1.96819L3.96817 2.92819L5.71217 3.90419L5.12017 4.92819L3.42417 3.9202L3.45617 5.8882Z"
        fill="#FF4545"
      />
    </svg>
  );
}
