import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, SVGProps } from "react";
import { ArrowLeft, ArrowRight } from "iconoir-react";

import "@/core/common/ui/styles/action-button.css";

type ButtonVariant = "light" | "transparent";
type ButtonIcon = "arrow-left" | "arrow-right";

type CommonProps = {
  children: ReactNode;
  className?: string;
  icon?: ButtonIcon;
  variant?: ButtonVariant;
};

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: never;
    loading?: boolean;
  };

export type ButtonProps = LinkProps | NativeButtonProps;

const iconByName: Record<ButtonIcon, (props: SVGProps<SVGSVGElement>) => ReactNode> = {
  "arrow-left": (props) => <ArrowLeft {...props} />,
  "arrow-right": (props) => <ArrowRight {...props} />,
};

const getClassName = (variant: ButtonVariant, className?: string) =>
  ["action-button", `action-button--${variant}`, className].filter(Boolean).join(" ");

function ButtonContent({ children, icon, loading }: CommonProps & { loading?: boolean }) {
  const renderContent = (modifier: string, hidden: boolean) => {
    const Icon = icon ? iconByName[icon] : null;

    return (
      <span
        aria-hidden={hidden || undefined}
        className={`action-button__content action-button__content--${modifier}`}
      >
        {loading && <span className="action-button__spinner" aria-hidden="true" />}
        <span>{children}</span>
        {Icon && <Icon aria-hidden="true" className="action-button__icon" strokeWidth={1.25} />}
      </span>
    );
  };

  return (
    <span className="action-button__content-stack">
      {renderContent("semantic", false)}
      {renderContent("transparent", true)}
      {renderContent("filled", true)}
    </span>
  );
}

export default function Button(props: ButtonProps) {
  if ("href" in props && props.href) {
    const { children, className, href, icon, variant = "transparent", ...attributes } = props;

    return (
      <a className={getClassName(variant, className)} href={href} {...attributes}>
        <ButtonContent icon={icon}>{children}</ButtonContent>
      </a>
    );
  }

  const {
    children,
    className,
    disabled,
    icon,
    loading = false,
    type = "button",
    variant = "transparent",
    ...attributes
  } = props as NativeButtonProps;

  return (
    <button
      aria-busy={loading || undefined}
      className={getClassName(variant, className)}
      data-loading={loading || undefined}
      disabled={disabled || loading}
      type={type}
      {...attributes}
    >
      <ButtonContent icon={icon} loading={loading}>
        {children}
      </ButtonContent>
    </button>
  );
}
