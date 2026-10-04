export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3 text-case-body text-fg-75">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="text-sage">
            &middot;
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
