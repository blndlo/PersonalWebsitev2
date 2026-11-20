// Colour coding for project tags and blog categories (wireframe: colour-coded
// thumbnails and post accent borders). Class strings must stay literal so
// Tailwind can detect them.
type TagStyle = {
  /** Background + text for thumbnails and tinted pills */
  tint: string;
  /** Left accent border for blog post rows */
  accent: string;
};

const EMERALD: TagStyle = {
  tint: 'bg-emerald-100 text-emerald-800',
  accent: 'border-l-emerald-500',
};
const BLUE: TagStyle = { tint: 'bg-blue-100 text-blue-800', accent: 'border-l-blue-500' };
const AMBER: TagStyle = { tint: 'bg-amber-100 text-amber-800', accent: 'border-l-amber-500' };
const PINK: TagStyle = { tint: 'bg-pink-100 text-pink-800', accent: 'border-l-pink-500' };
const VIOLET: TagStyle = { tint: 'bg-violet-100 text-violet-800', accent: 'border-l-violet-500' };
const ZINC: TagStyle = { tint: 'bg-zinc-100 text-zinc-700', accent: 'border-l-zinc-400' };

const TAG_STYLES: Record<string, TagStyle> = {
  AWS: EMERALD,
  Python: BLUE,
  React: AMBER,
  Cloud: AMBER,
  Java: PINK,
  Terraform: VIOLET,
  Tutorial: VIOLET,
};

export function tagStyle(tag: string | undefined): TagStyle {
  return (tag && TAG_STYLES[tag]) || ZINC;
}
