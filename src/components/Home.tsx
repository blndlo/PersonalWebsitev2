import Appshell from './Appshell';
import HomePicture from './HomePicture';
import HomeContent from './HomeContent';
import Skills from './Skills';
import Certifications from './Certifications';

export default function Home() {
  return (
    <Appshell>
      {/* Main wrapper stacks children vertically */}
      <div className="flex flex-col">
        {/* Top row: stacked on mobile, side by side from md up */}
        <div className="flex flex-col items-center gap-6 px-4 pt-8 pb-8 md:flex-row md:items-stretch md:justify-evenly md:gap-0 md:p-16 md:pb-8">
          <HomePicture />
          <HomeContent />
        </div>
        {/* Middle row */}
        <div className="px-4 pb-8 md:px-16">
          <Skills />
        </div>
        {/* Bottom row */}
        <div className="px-4 pb-8 md:px-16">
          <Certifications />
        </div>
      </div>
    </Appshell>
  );
}
