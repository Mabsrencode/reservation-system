import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}
const Accordions = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <section>
      <div className="max-w-fit my-12 mx-2 sm:mx-2 md:mx-2 lg:mx-auto">
        <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(1)}>
            Is the reservation system user friendly?
          </AccordionHeader>
          <AccordionBody>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi
            quo, non beatae molestias odit tempora iste sapiente sint modi vitae
            quaerat similique quia facere sit, debitis repudiandae labore
            aperiam quam.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(2)}>
            Was the program used, effective?
          </AccordionHeader>
          <AccordionBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
            voluptas minus, amet laboriosam commodi vel magni nihil, corporis
            quisquam quis, dicta ratione consequuntur cum possimus maxime
            deleniti necessitatibus labore eius.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(3)}>
            Is the reservation system easily accessible to the customers?
          </AccordionHeader>
          <AccordionBody>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa magni
            veniam quasi iure unde numquam fugiat quas. Distinctio quibusdam
            odit libero alias saepe, repellendus culpa odio laudantium dolorum,
            facilis ex?
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(4)}>
            Is it safe to use?
          </AccordionHeader>
          <AccordionBody>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa magni
            veniam quasi iure unde numquam fugiat quas. Distinctio quibusdam
            odit libero alias saepe, repellendus culpa odio laudantium dolorum,
            facilis ex?
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(5)}>
            Am I required to use the reservation system beforehand?
          </AccordionHeader>
          <AccordionBody>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa magni
            veniam quasi iure unde numquam fugiat quas. Distinctio quibusdam
            odit libero alias saepe, repellendus culpa odio laudantium dolorum,
            facilis ex?
          </AccordionBody>
        </Accordion>
      </div>
    </section>
  );
}

export default Accordions;
