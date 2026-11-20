import Appshell from './Appshell';
import ContactHeader from './ContactHeader';
import ContactForm from './ContactForm';
import ContactDetails from './ContactDetails';

export default function Contact() {
  return (
    <Appshell>
      {/* Main wrapper stacks children vertically */}
      <div className="flex flex-col">
        {/* Top "get in touch" card row */}
        <div className="mt-8 px-4 pb-8 md:px-16">
          <ContactHeader />
        </div>
        {/* Details + form: stacked on mobile, side by side from md up */}
        <div className="flex flex-col gap-6 px-4 pb-8 md:flex-row md:items-start md:justify-evenly md:gap-4 md:px-8">
          <ContactDetails />
          <ContactForm />
        </div>
      </div>
    </Appshell>
  );
}
