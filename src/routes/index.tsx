import { createFileRoute } from "@tanstack/react-router";
import { Grain } from "@/components/site/grain";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Ribbon } from "@/components/site/ribbon";
import { Situations } from "@/components/site/situations";
import { Health } from "@/components/site/coverage";
import { Life } from "@/components/site/life";
import { Process } from "@/components/site/process";
import { Testimonials } from "@/components/site/testimonials";
import { Quote } from "@/components/site/quote";
import {
  Conversation,
  MobileStickyCta,
} from "@/components/site/conversation";
import { Faq } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div id="top" className="min-h-svh bg-paper">
      <Grain />
      <Header />
      <main>
        <Hero />
        <Ribbon />
        <Situations />
        <Health />
        <Life />
        <Process />
        <Testimonials />
        <Quote />
        <Conversation />
        <Faq />
      </main>
      <Footer />
      <MobileStickyCta />
    </div>
  );
}
