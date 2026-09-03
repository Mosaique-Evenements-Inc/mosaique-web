import organizationMain from "@/assets/images/services/organization/main.jpg";
import organization01 from "@/assets/images/services/organization/01.jpg";
import organization02 from "@/assets/images/services/organization/02.jpg";
import organization03 from "@/assets/images/services/organization/03.jpg";
import organization04 from "@/assets/images/services/organization/04.jpg";
import organization05 from "@/assets/images/services/organization/05.jpg";
import organization06 from "@/assets/images/services/organization/06.jpg";
import organization07 from "@/assets/images/services/organization/07.jpg";
import organization08 from "@/assets/images/services/organization/08.jpg";
import organization09 from "@/assets/images/services/organization/09.jpg";
import organization10 from "@/assets/images/services/organization/10.jpg";
import organization11 from "@/assets/images/services/organization/11.jpg";
import organization12 from "@/assets/images/services/organization/12.jpg";
import organization13 from "@/assets/images/services/organization/13.jpg";
import organization14 from "@/assets/images/services/organization/14.jpg";
import weddingsMain from "@/assets/images/services/weddings/main.jpg";
import weddings01 from "@/assets/images/services/weddings/01.jpg";
import weddings02 from "@/assets/images/services/weddings/02.jpg";
import weddings03 from "@/assets/images/services/weddings/03.jpg";
import weddings04 from "@/assets/images/services/weddings/04.jpg";
import weddings05 from "@/assets/images/services/weddings/05.jpg";
import celebrationsMain from "@/assets/images/services/celebrations/main.jpg";
import celebrations01 from "@/assets/images/services/celebrations/01.jpg";
import celebrations02 from "@/assets/images/services/celebrations/02.jpg";
import celebrations03 from "@/assets/images/services/celebrations/03.jpg";
import celebrations04 from "@/assets/images/services/celebrations/04.jpg";
import celebrations05 from "@/assets/images/services/celebrations/05.jpg";
import celebrations06 from "@/assets/images/services/celebrations/06.jpg";
import celebrations07 from "@/assets/images/services/celebrations/07.jpg";
import celebrations08 from "@/assets/images/services/celebrations/08.jpg";
import celebrations09 from "@/assets/images/services/celebrations/09.jpg";
import celebrations10 from "@/assets/images/services/celebrations/10.jpg";
import celebrations11 from "@/assets/images/services/celebrations/11.jpg";
import venuesMain from "@/assets/images/services/venues/main.jpg";
import venues01 from "@/assets/images/services/venues/01.jpg";
import venues02 from "@/assets/images/services/venues/02.jpg";
import logisticsMain from "@/assets/images/services/setup-and-logistics/main.jpg";
import logistics01 from "@/assets/images/services/setup-and-logistics/01.jpg";
import logistics02 from "@/assets/images/services/setup-and-logistics/02.jpg";
import logistics03 from "@/assets/images/services/setup-and-logistics/03.jpg";
import furnitureMain from "@/assets/images/services/furniture/main.jpg";
import furniture01 from "@/assets/images/services/furniture/01.jpg";
import furniture02 from "@/assets/images/services/furniture/02.jpg";
import furniture03 from "@/assets/images/services/furniture/03.jpg";
import furniture04 from "@/assets/images/services/furniture/04.jpg";
import packagesMain from "@/assets/images/services/custom-packages/main.jpg";
import packages01 from "@/assets/images/services/custom-packages/01.jpg";
import packages02 from "@/assets/images/services/custom-packages/02.jpg";
import packages03 from "@/assets/images/services/custom-packages/03.jpg";
import type { StaticImageSource } from "@/core/common/types/media";
import { SERVICE_IDS, type Service, type ServiceId } from "../types";

type ServiceImageCollection = {
  main: StaticImageSource;
  gallery: readonly StaticImageSource[];
};

export const serviceImageCollections: Partial<Record<ServiceId, ServiceImageCollection>> = {
  [SERVICE_IDS.organizationProductionIntegral]: {
    main: organizationMain,
    gallery: [
      organization01,
      organization02,
      organization03,
      organization04,
      organization05,
      organization06,
      organization07,
      organization08,
      organization09,
      organization10,
      organization11,
      organization12,
      organization13,
      organization14,
    ],
  },
  [SERVICE_IDS.weddings]: {
    main: weddingsMain,
    gallery: [weddings01, weddings02, weddings03, weddings04, weddings05],
  },
  [SERVICE_IDS.celebrations]: {
    main: celebrationsMain,
    gallery: [
      celebrations01,
      celebrations02,
      celebrations03,
      celebrations04,
      celebrations05,
      celebrations06,
      celebrations07,
      celebrations08,
      celebrations09,
      celebrations10,
      celebrations11,
    ],
  },
  [SERVICE_IDS.venuePartnerships]: {
    main: venuesMain,
    gallery: [venues01, venues02],
  },
  [SERVICE_IDS.setupLogistics]: {
    main: logisticsMain,
    gallery: [logistics01, logistics02, logistics03],
  },
  [SERVICE_IDS.furnitureRental]: {
    main: furnitureMain,
    gallery: [furniture01, furniture02, furniture03, furniture04],
  },
  [SERVICE_IDS.customPackages]: {
    main: packagesMain,
    gallery: [packages01, packages02, packages03],
  },
};

export const createServiceMedia = (
  serviceId: ServiceId,
  title: string,
): Pick<Service, "featuredMedia" | "gallery"> => {
  const collection = serviceImageCollections[serviceId];

  if (!collection) {
    throw new Error(`No service image collection for ${serviceId}.`);
  }

  return {
    featuredMedia: { kind: "image", status: "approved", src: collection.main, alt: title },
    gallery: collection.gallery.map((src, index) => ({
      src,
      alt: `${title} ${index + 1}`,
      status: "approved",
      layout: src.height > src.width ? "pair-portrait" : "full-landscape",
    })),
  };
};
