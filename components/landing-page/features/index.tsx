import { CardsWrapper } from "./cards";
import { FeatureWrapper } from "./feature";

const FeaturesSection = () => {
  return (
    <section>
      <div className="mt-14">
        <CardsWrapper />
      </div>
      <div id="features" className="pt-16">
        <FeatureWrapper />
      </div>
    </section>
  );
};

export default FeaturesSection;
