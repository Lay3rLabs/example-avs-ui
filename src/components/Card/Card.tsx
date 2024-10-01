import React from "react";
import {
  CardBodyProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
} from "@/types";

/**
 * Card component for displaying content in a styled container.
 *
 * @component
 * @param {CardProps & React.HTMLAttributes<HTMLDivElement>} props - Properties to configure the Card component.
 * @returns {React.ReactElement} The rendered Card component.
 */
const Card: React.FC<CardProps & React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <div
      className="bg-background-primary rounded-md border border-border-secondary p-3 space-y-3"
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * CardHeader component for rendering the header of the Card.
 *
 * @component
 * @param {CardHeaderProps & React.HTMLAttributes<HTMLDivElement>} props - Properties to configure the CardHeader component.
 * @returns {React.ReactElement} The rendered CardHeader component.
 */
const CardHeader: React.FC<
  CardHeaderProps & React.HTMLAttributes<HTMLDivElement>
> = ({
  children,
  ...props
}: CardHeaderProps &
  React.HTMLAttributes<HTMLDivElement>): React.ReactElement => (
  <div {...props}>{children}</div>
);

/**
 * CardBody component for rendering the body of the Card.
 *
 * @component
 * @param {CardBodyProps & React.HTMLAttributes<HTMLDivElement>} props - Properties to configure the CardBody component.
 * @returns {React.ReactElement} The rendered CardBody component.
 */
const CardBody: React.FC<
  CardBodyProps & React.HTMLAttributes<HTMLDivElement>
> = ({
  children,
  ...props
}: CardBodyProps &
  React.HTMLAttributes<HTMLDivElement>): React.ReactElement => (
  <div {...props}>{children}</div>
);

/**
 * CardFooter component for rendering the footer of the Card.
 *
 * @component
 * @param {CardFooterProps & React.HTMLAttributes<HTMLDivElement>} props - Properties to configure the CardFooter component.
 * @returns {React.ReactElement} The rendered CardFooter component.
 */
const CardFooter: React.FC<
  CardFooterProps & React.HTMLAttributes<HTMLDivElement>
> = ({
  children,
  ...props
}: CardFooterProps &
  React.HTMLAttributes<HTMLDivElement>): React.ReactElement => (
  <div {...props}>{children}</div>
);

export { Card, CardHeader, CardBody, CardFooter };
