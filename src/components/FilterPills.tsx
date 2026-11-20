import { Badge } from '@/components/ui/badge';

type FilterPillsProps = {
  label: string;
  options: string[];
  active: string;
  onChange: (option: string) => void;
};

export default function FilterPills({ label, options, active, onChange }: FilterPillsProps) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
      <span className="text-muted-foreground text-xs">{label}:</span>
      {options.map((option) => {
        const isActive = option === active;
        return (
          <Badge
            key={option}
            variant={isActive ? 'default' : 'outline'}
            className="h-6 cursor-pointer rounded-sm px-2.5"
            asChild
          >
            <button type="button" aria-pressed={isActive} onClick={() => onChange(option)}>
              {option}
            </button>
          </Badge>
        );
      })}
    </div>
  );
}
