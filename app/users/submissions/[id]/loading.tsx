import { Container } from "@/components/globals/container";
import { ImSpinner2 } from "react-icons/im";

export default function Loading() {
  return (
    <Container className="flex items-center justify-center w-full h-full">
      <ImSpinner2 className="animate-spin h-12 w-12" />
    </Container>
  );
}
