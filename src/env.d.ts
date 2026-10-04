/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    cmsPublication?: import("./features/publication/publication").CmsPublication;
  }
}
