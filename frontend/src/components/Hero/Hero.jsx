// import familyLaptop from '@/assets/imgs/first-screen/family-laptop.webp';
// import familyLaptop2x from '@/assets/imgs/first-screen/family-laptop@2x.webp';
// import familyMobile from '@/assets/imgs/first-screen/family-mobile@2x.webp';

import familyLaptop from '@/assets/imgs/first-screen/imagenuza.png';
import familyLaptop2x from '@/assets/imgs/first-screen/imagenuza.png';
import familyMobile from '@/assets/imgs/first-screen/imagenuza.png';

import './Hero.css';
import './main.css';

export function Hero() {
  
    return (
        <div className="first-screen">
        <div className="first-screen__background">
        <picture>
            <source media="(min-width: 768px)" type="image/webp" srcSet={`${familyLaptop} 1x, ${familyLaptop2x} 2x`} />
            <source media="(min-width: 768px)" srcSet={`${familyLaptop} 1x, ${familyLaptop2x} 2x`} />
            <source type="image/webp" srcSet={`${familyMobile}`} />
            <img src={`${familyMobile}`}
            alt="Family reviewing a loved one's grave care report on a laptop with the Tending app" width={462}
            height={631} loading="lazy" />
        </picture>
        </div>

        <div className="first-screen__content">
        <div className="first-screen__header">
            <h1 className="first-screen__title">
            A sua saúde na palma da sua mão em um só lugar
            </h1>
            <p className="first-screen__paragraph">
            Cuidar de quem mais importa nunca foi tão simples. O Nuza foi criado especialmente para apoiar famílias com filhos no espectro autista, oferecendo uma forma rápida, acessível e descomplicada de agendar consultas, exames, retirada de medicamentos e transporte — tudo em um só lugar, com apenas alguns cliques. Menos burocracia, mais tempo com quem você ama. Uma experiência pensada para tornar o dia a dia mais leve, acolhedor e humano para quem cuida com dedicação todos os dias.
            </p>
        </div>
        <a href="/#plans" className="button button_light first-screen__button">
            Learn About Our Services
        </a>
        </div>
    </div>
  );

}
