import { welcomeTemplate } from "@/components/email/template";
import Handlebars from "handlebars";

export const compileTemplate = (url: string, host: string) => {
  const template = Handlebars.compile(welcomeTemplate);
  const htmlBody = template({
    name: host,
    url: url,
  });
  return htmlBody;
};
