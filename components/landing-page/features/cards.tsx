import { GanttChart, PenSquare, Share } from "lucide-react";

import { CardItem } from "./card.item";

const cardContent = [
  {
    title: "Create your Form",
    description: "Create your own form with our drag & drop features.",
    icon: <PenSquare className="h-7 w-7 flex-shrink-0" />,
  },
  {
    title: "Share your Form",
    description: "Share your form to other people in the world.",
    icon: <Share className="h-7 w-7 flex-shrink-0" />,
  },
  {
    title: "Manage Form Submissions",
    description:
      "Streamline your workflow and stay organized with our form submission management system.",
    icon: <GanttChart className="h-7 w-7 flex-shrink-0" />,
  },
];
export const CardsWrapper = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-32">
      {cardContent.map((card) => (
        <CardItem key={card.title} {...card} />
      ))}
    </div>
  );
};
