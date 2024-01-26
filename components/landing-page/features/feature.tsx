import { FeatureItem } from "./feature.item";

const features = [
  {
    title: "Create & Costumize Form",
    description:
      "Easily bring your ideas to life with Z-Form's intuitive form creation and customization tools. Whether you're designing a simple contact form or a complex survey, our user-friendly interface empowers you to craft the perfect form tailored to your needs. Choose from a variety of form elements, customize layouts, and personalize styles effortlessly. With Z-Form, turning your vision into a functional and aesthetically pleasing form has never been more straightforward.",
    imageUrl: "/images/create-form.png",
  },
  {
    title: "Share your Form",
    description:
      "Collaborate effortlessly with Z-Form's Shared Form feature. Enable real-time collaboration with team members or share forms externally with clients and partners. Customize access levels to control who can view, edit, or submit responses, ensuring secure and tailored collaboration. Z-Form's Shared Form feature promotes teamwork and flexibility, making it easy to work together on projects, collect feedback, and streamline communication. Say goodbye to siloed workflows and hello to a more collaborative form-building experience.",
    imageUrl: "/images/share-form.png",
  },
  {
    title: "Manage Form Submissions",
    description:
      "Streamline your workflow and stay organized with Z-Form's robust form submission management system. Access and review all submissions in one centralized location, making it simple to track, analyze, and respond to user input. Effortlessly export data, set up automated notifications, and gain valuable insights to optimize your processes. Z-Form ensures that managing form submissions is not only efficient but also a seamless part of your overall data management strategy.",
    imageUrl: "/images/manage-form.png",
  },
];

export const FeatureWrapper = () => {
  return (
    <div className="bg-gradient-to-tl from-primary/5">
      <h3 className="pl-10 text-2xl pb-2 font-bold border-b border-separate">Features</h3>
      {features.map((feature) => (
        <FeatureItem key={feature.title} {...feature} />
      ))}
    </div>
  );
};
