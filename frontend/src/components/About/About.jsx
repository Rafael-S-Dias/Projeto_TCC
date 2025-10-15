import './About.css';

export default function About() {
    return (
        <>
          <section id="weare" className="weare scroll">
              <div className="weare__wrapper">
                  <h2 className="weare__title">Como é feito o diagnóstico de autismo?</h2>
                  <div className="weare__content">
                      <div className="weare__text-grid">
                          {/* <h3 className="weare__content-title">About Evermore</h3> */}
                          <p className="weare__content-text">
                          O Transtorno do Espectro Autista (TEA) é uma condição neurológica que afeta a comunicação, interação social e comportamento. O diagnóstico pode ser desafiador, pois não existe um exame único que o identifique – ele é feito com base em observações clínicas e avaliações multidisciplinares.
                          </p>
                      </div>
                      {/* <div className="weare__image">
                          <picture>
                              <source media="(min-width: 1200px)" type="image/webp"
                                  srcSet="/imgs/team/tending-team-laptop.webp" />
                              <source media="(min-width: 1200px)" srcSet="/imgs/team/tending-team-laptop.jpg" />
                              <source media="(min-width: 520px)" type="image/webp"
                                  srcSet="/imgs/team/tending-team-tablet.webp" />
                              <source media="(min-width: 520px)" srcSet="/imgs/team/tending-team-tablet.jpg" />
                              <source type="image/webp" srcSet="/imgs/team/tending-team-mobile.webp" />
                              <img src="/imgs/team/tending-team-mobile.jpg" width={304} height={316}
                                  alt="The Manilov brothers, founders of the Tending grave care service"
                                  loading="lazy" />
                          </picture>
                      </div> */}
                      {/* <div className="weare__text-grid">
                          <h3 className="weare__content-title">Why Families Trust Tending</h3>
                          <ul className="weare__content-list">
                              <li>Easy online signup and mobile app</li>
                              <li>Transparent grave cleaning services near me</li>
                              <li>Trusted team across the U.S.</li>
                              <li>Personalized support and reporting</li>
                              <li>Subscription-based care — flexible and reliable</li>
                          </ul>
                          <p className="weare__content-text">
                              <strong>
                                  Because memory deserves attention — not just once, but all year
                                  long.
                              </strong>
                          </p>
                      </div> */}
                  </div>
              </div>
          </section>
        </>
    )
}
