import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const interests = ['Anime', 'Baking', 'Football', 'Travelling', 'Cooking'];

export default function HomeContent() {
  return (
    <Card className="w-full rounded-md md:w-1/2">
      <CardHeader className="text-center">
        <CardTitle>
          <h1 className="text-2xl md:text-3xl">Hi, I'm Blessmore</h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-left text-xs/relaxed">
        <p>
          A Cloud Engineer, Network Specialist, and Software Developer based in Cape Town, South
          Africa. I specialize in cloud networking, infrastructure automation, and operational
          excellence, helping organizations build and maintain reliable, scalable systems. Over the
          years, I’ve worked across enterprise networking, AWS cloud services, and software
          engineering, developing solutions that bridge the gap between infrastructure and code.
        </p>
        <p>
          I’m particularly interested in the intersection of networking, cloud platforms,
          automation, and software development. Outside of work, I enjoy building personal projects,
          learning new technologies, exploring business ideas, travelling, and following sports. I
          believe the best engineers are lifelong learners who never stop improving their craft.
        </p>
        <h2 className="pt-3 text-center font-bold">Outside of Work</h2>
        <div className="flex w-full flex-wrap justify-center gap-2">
          {interests.map((interest) => (
            <Badge key={interest} variant="outline">
              {interest}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
