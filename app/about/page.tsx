import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Image from 'next/image';

function AboutPage() {
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center">About DoorDash Home Services</h1>
        
        <div className="mb-12">
          <Image
            src="/photo/team.webp" // Make sure to add this image to your public folder
            alt="DoorDash Home Services Team"
            width={1200}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              At DoorDash Home Services, we&apos;re committed to revolutionizing the way people access and experience home services. Our mission is to connect homeowners with skilled professionals, making home maintenance and improvement hassle-free and efficient.
            </p>
            <p className="text-gray-700">
              We strive to create a platform that not only serves homeowners but also empowers service providers, fostering a community of trust, quality, and convenience.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Wide range of services from trusted professionals</li>
              <li>Easy booking and scheduling system</li>
              <li>Transparent pricing with no hidden fees</li>
              <li>Quality assurance and customer satisfaction guarantee</li>
              <li>24/7 customer support</li>
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Founded in 2023, DoorDash Home Services emerged from a simple idea: to bring the convenience and reliability of food delivery services to the world of home maintenance and improvement. Our founders, experienced in both technology and home services, saw an opportunity to bridge the gap between homeowners and service providers.
          </p>
          <p className="text-gray-700">
            Since our inception, we&apos;ve grown rapidly, expanding our service offerings and building a network of skilled professionals across the country. Today, we&apos;re proud to be a leading platform in the home services industry, continually innovating to meet the evolving needs of our customers and service providers.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Quality", description: "We&apos;re committed to delivering top-notch services through our vetted professionals." },
              { title: "Trust", description: "Building and maintaining trust is at the core of everything we do." },
              { title: "Innovation", description: "We continuously strive to improve and innovate in the home services industry." },
              { title: "Community", description: "We believe in fostering a strong community of customers and service providers." },
              { title: "Sustainability", description: "We&apos;re dedicated to promoting eco-friendly practices in home services." },
              { title: "Accessibility", description: "Making quality home services accessible to everyone is our priority." },
            ].map((value, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;