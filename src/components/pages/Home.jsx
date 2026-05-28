
import React from 'react';
import HeroSection from '../HeroSections';
import Modulessection from '../Modulesection';
import MatrimonialSection from '../MatrimonialSections';
import CommunitySection from '../CommunitySection';
import DonateSection from '../DonateSections';
import VisionSection from '../VisionSection';


const Home = () => {
  return (
    <>
      <HeroSection />
      <Modulessection />
      <MatrimonialSection />
      <CommunitySection />
      {/* <DonateSection /> */}
      <VisionSection />
    </>
  );
};

export default Home;

