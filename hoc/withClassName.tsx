// hoc/withClassName.tsx
import React from 'react';

const withClassName = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  newClassName: string
): React.FC<P> => {
  const WithClassName: React.FC<P> = (props) => {
    return <WrappedComponent {...props} className={newClassName} />;
  };

  WithClassName.displayName = `WithClassName(${getDisplayName(WrappedComponent)})`;

  return WithClassName;
};

const getDisplayName = (WrappedComponent: React.ComponentType<any>) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export default withClassName;