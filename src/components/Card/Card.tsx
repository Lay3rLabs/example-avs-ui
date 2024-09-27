import React, { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
}

export type CardHeaderProps = {
  children: ReactNode;
};

export type CardBodyProps = {
  children: ReactNode;
};

export type CardFooterProps = {
  children: ReactNode;
};


const Card: React.FC<CardProps & React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
  return (
    <div className="bg-background-primary rounded-md border border-border-secondary p-3 space-y-3" {...props}>
      {children}
    </div>
  );
};

const CardHeader: React.FC<CardHeaderProps & React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

const CardBody: React.FC<CardBodyProps & React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

const CardFooter: React.FC<CardFooterProps & React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div {...props}>
    {children}
  </div>
);

export { Card, CardHeader, CardBody, CardFooter };
