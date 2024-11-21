import React from 'react';
import '@phosphor-icons/web/light';
import '@phosphor-icons/web/bold';
import '@phosphor-icons/web/thin';
import '@phosphor-icons/web/fill';
import '@phosphor-icons/web/duotone';
import IconData from './data';

export default function PhosphorIcon({
  icon,
  type = 'bold',
  className = '',
  ...args
}) {
  return <i class={`ph-${type} ph-${icon} ${className}`} {...args} />;
}

PhosphorIcon.Data = IconData;
