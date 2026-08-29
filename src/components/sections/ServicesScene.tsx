import { ScrollLinkedScene } from "../motion/ScrollLinkedScene";
import Button from "../ui/Button";
import type { ServicesPanelRevealContent } from "../../content/home/services";
import type { Service } from "../../content/services";

type ServicesSceneProps = {
  panelReveal: ServicesPanelRevealContent;
  services: readonly Service[];
};

const handleViewMore = (service: Service) => {
  console.log("View service details:", service.id);
};

export default function ServicesScene({ panelReveal, services }: ServicesSceneProps) {
  return (
    <ScrollLinkedScene
      className="services-spike__scene"
      items={services}
      renderMedia={({ activeIndex, activeItem }) => (
        <div className="services-spike__media">
          <div className="services-spike__media-frame">
            {services.map((service, index) => (
              <div
                aria-hidden={index !== activeIndex}
                aria-label={service.title}
                className={[
                  "services-spike__media-panel",
                  index === activeIndex ? "is-active" : "",
                ].join(" ")}
                data-tone={String(index + 1).padStart(2, "0")}
                key={service.id}
                role="img"
              >
                <span className="services-spike__media-number">{service.index}</span>
                <span className="services-spike__media-label">{service.title}</span>
              </div>
            ))}
          </div>
          <Button
            aria-label={`Ver más sobre ${activeItem.title}`}
            className="services-spike__media-action"
            onClick={() => handleViewMore(activeItem)}
            type="button"
          >
            Ver más
          </Button>
        </div>
      )}
      renderContent={({ activeIndex, activeItem, itemCount, items, registerItem }) => (
        <div className="services-spike__list" id="services-list">
          <header className="services-spike__scene-heading">
            <h2 id="services-spike-title">{panelReveal.title}</h2>
            <p className="services-spike__scene-intro">{panelReveal.text}</p>
            <a className="services-spike__scene-cta" href={panelReveal.cta.href}>
              {panelReveal.cta.label}
            </a>
            <div className="services-spike__progress" aria-hidden="true">
              <div className="services-spike__progress-bar" />
            </div>
          </header>

          {items.map((service, index) => {
            const isActive = index === activeIndex;

            return (
              <article
                aria-current={isActive ? "step" : undefined}
                className={["services-spike__item", isActive ? "is-active" : ""].join(" ")}
                key={service.id}
                ref={(element) => registerItem({ element, item: service })}
              >
                <div className="services-spike__item-grid">
                  <span className="services-spike__index">
                    {service.index} / {String(itemCount).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="services-spike__eyebrow">Servicio {service.index}</p>
                    <h3 className="services-spike__title">{service.title}</h3>
                    <p className="services-spike__description">{service.description}</p>
                    <div className="services-spike__ideal-for">
                      <p className="services-spike__ideal-for-label">Ideal para:</p>
                      <p>{service.idealFor}</p>
                    </div>
                    <a className="services-spike__item-cta" href={service.cta.href}>
                      {service.cta.label}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}

          <p className="visually-hidden" aria-live="polite">
            Servicio activo {activeIndex + 1} de {itemCount}: {activeItem.title}
          </p>
        </div>
      )}
    />
  );
}
