import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const skills = [
  'AWS',
  'AWS CDK',
  'Terraform',
  'TypeScript',
  'React',
  'JavaScript',
  'Python',
  'Java',
  'Linux',
  'AI',
  'Networking',
  'Docker',
];

export default function Skills() {
  return (
    <Card className="rounded-md lg:mx-36">
      <CardHeader>
        <CardTitle>
          <h2 className="font-bold">TOOLS & TECH</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill} variant="outline">
            {skill}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}
