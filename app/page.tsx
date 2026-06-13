"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowUpRight, BadgeCheck, CircuitBoard, Layers3, MousePointer2, Sparkles, Waves } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PremiumScene = dynamic(() => import("@/components/PremiumScene"), { ssr: false });
const FrameField = dynamic(() => import("@/components/FrameField"), { ssr: false });

const ventures = [
  {
    label: "Clube de Benefícios",
    name: "Minha Corrida",
    logo: "/assets/logoMinhaCorrida.svg",
    width: 260,
    height: 84,
    copy: "Experiências digitais para comunidades, provas e jornadas de corrida.",
  },
  {
    label: "Studio de Branding e Design",
    name: "Z3",
    logo: "/assets/logoZ3.png",
    width: 265,
    height: 232,
    copy: "Branding, operação e design para marcas que precisam sair do plano e ganhar presença.",
    featured: true,
  },
  {
    label: "Escola de Inovação e Design",
    name: "Brandscan",
    logo: "/assets/logoBrandscan.svg",
    width: 375,
    height: 105,
    copy: "Leitura estratégica de marca para transformar presença em inteligência acionável.",
  },
];

const principles = [
  { icon: CircuitBoard, title: "Arquitetura", copy: "Cada projeto nasce com estrutura, escala e leitura clara de valor." },
  { icon: Layers3, title: "Experiência", copy: "Interfaces, marcas e jornadas desenhadas para criar presença real." },
  { icon: BadgeCheck, title: "Resultado", copy: "Tecnologia e design trabalhando para impacto mensurável." },
];

const footerImages = Array.from({ length: 8 }, (_, index) => `/assets/img_rodape_${index + 1}.jpg`);

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from("[data-hero]", {
        y: 38,
        opacity: 0,
        duration: 1.15,
        ease: "power3.out",
        stagger: 0.11,
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 54,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        gsap.to(element, {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef}>
      <FrameField />

      <section className="premiumHero" aria-label="Toketz Premium">
        <video className="heroVideo" autoPlay muted loop playsInline poster="/assets/banner.jpg" aria-hidden="true">
          <source src="/assets/tok-banner-video.mp4" type="video/mp4" />
        </video>
        <div className="blueprintGrid" />
        <div className="heroVeil" />
        <nav className="topbar" data-hero>
          <Image src="/assets/logoToketz.svg" alt="Toketz" width={178} height={58} priority />
          <a href="#contato" className="navAction">
            contato <ArrowUpRight size={18} />
          </a>
        </nav>

        <div className="heroLayout">
          <div className="heroCopy">
            <span className="eyebrow" data-hero>
              <Sparkles size={16} /> Venture design platform
            </span>
            <h1 data-hero>Toketz cria marcas, negócios e experiências que se movem.</h1>
            <p data-hero>
              Uma plataforma de criação para transformar ideias em impacto: estratégia, design, tecnologia e operação
              conectando talentos, oportunidades e propósito.
            </p>
            <div className="heroActions" data-hero>
              <a href="#manifesto" className="primaryButton">
                explorar manifesto <ArrowUpRight size={18} />
              </a>
              <a href="#ecossistema" className="ghostButton">
                ver ecossistema
              </a>
            </div>
          </div>

          <div className="heroSceneWrap" data-hero>
            <PremiumScene />
            <Image src="/assets/simbolo toketz.svg" alt="" width={118} height={92} className="sceneMark" priority />
          </div>
        </div>

        <a href="#ecossistema" className="scrollCue" aria-label="Ver mais conteúdo">
          <MousePointer2 size={18} />
          <span />
        </a>
      </section>

      <section id="ecossistema" className="ecosystem">
        <div className="sectionIntro" data-reveal>
          <span className="eyebrow">Ecossistema</span>
          <h2>Três frentes para criar, acelerar e medir negócios com alma de marca.</h2>
        </div>

        <div className="ventureGrid">
          {ventures.map((venture) => (
            <article className={`premiumCard ${venture.featured ? "featuredCard" : ""}`} key={venture.name} data-reveal>
              <span>{venture.label}</span>
              <div className="cardLogo">
                <Image
                  src={venture.logo}
                  alt={venture.name}
                  width={venture.width}
                  height={venture.height}
                  loading="eager"
                />
              </div>
              <p>{venture.copy}</p>
              <a href="#contato" aria-label={`Conhecer ${venture.name}`}>
                <ArrowUpRight size={22} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="manifesto" className="manifestoPremium">
        <div className="manifestoMedia" data-parallax>
          <Image src="/assets/background_manifesto.jpg" alt="" fill sizes="45vw" loading="eager" />
        </div>
        <div className="manifestoText" data-reveal>
          <span className="eyebrow">Manifesto</span>
          <h2>Grandes transformações começam com uma ideia.</h2>
          <p>
            Algumas ideias se tornam empresas. Outras se tornam movimentos, comunidades ou causas. Na Toketz, criamos,
            conectamos e desenvolvemos negócios que unem propósito, inovação e resultado.
          </p>
          <p>
            Não construímos apenas marcas. Construímos oportunidades, histórias e legados. Cada projeto representa uma
            nova possibilidade de transformar vidas.
          </p>
        </div>
      </section>

      <section className="missionGrid">
        <article data-reveal>
          <Waves size={26} />
          <h2>Missão</h2>
          <p>
            Transformar ideias em negócios, marcas e iniciativas capazes de gerar impacto positivo, crescimento
            sustentável e valor duradouro para a sociedade.
          </p>
        </article>
        <article data-reveal>
          <CircuitBoard size={26} />
          <h2>Visão</h2>
          <p>
            Ser reconhecida como uma plataforma de criação e desenvolvimento de negócios inovadores, conectando talentos,
            oportunidades e propósito para construir um futuro melhor.
          </p>
        </article>
      </section>

      <section className="principles">
        {principles.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} data-reveal>
              <Icon size={28} />
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          );
        })}
      </section>

      <section className="founderPremium">
        <div className="founderPortrait" data-reveal>
          <Image src="/assets/foto_luiz.png" alt="Luiz Carlos Santos" width={325} height={326} loading="eager" />
        </div>
        <div className="founderCopy" data-reveal>
          <span className="eyebrow">Quem está por trás?</span>
          <h2>Luiz Carlos Santos transforma ideias em marcas com propósito há mais de 25 anos.</h2>
          <p>
            Designer formado pela UNESP, já liderou mais de 300 projetos de identidade visual, unindo estratégia,
            criatividade e inovação. Acredita que desenhar é sonhar, e que toda marca é a materialização de um sonho.
          </p>
        </div>
      </section>

      <section id="contato" className="contactPremium">
        <div data-reveal>
          <span className="eyebrow">Contato</span>
          <h2>Bora tomar um cafezinho?</h2>
          <p>Preencha o formulário abaixo que em breve entraremos em contato.</p>
        </div>
        <form className="contactForm" data-reveal>
          <input type="text" name="nome" placeholder="Nome" aria-label="Nome" />
          <input type="email" name="email" placeholder="Email" aria-label="Email" />
          <input type="tel" name="telefone" placeholder="Telefone" aria-label="Telefone" />
          <input type="text" name="empresa" placeholder="Empresa" aria-label="Empresa" />
          <input type="text" name="assunto" placeholder="Assunto" aria-label="Assunto" />
          <button type="submit">
            enviar <ArrowUpRight size={18} />
          </button>
        </form>
      </section>

      <section className="imageLoop" aria-label="Galeria Toketz">
        <div className="loopTrack">
          {[...footerImages, ...footerImages].map((src, index) => (
            <div className="loopItem" key={`${src}-${index}`}>
              <Image src={src} alt="Projeto Toketz" width={705} height={353} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
