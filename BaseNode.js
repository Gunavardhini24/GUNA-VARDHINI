import React from 'react';
import {
  Handle,
  Position,
} from 'reactflow';

import './BaseNode.css';

const positionMap = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

const BaseNode = ({
  title,
  subtitle,
  icon,
  selected,
  handles = [],
  children,
  width = 280,
}) => {
  return (
    <div
      className={`base-node ${
        selected ? 'base-node-selected' : ''
      }`}
      style={{
        width,
        position: 'relative',
      }}
    >
      {/* HEADER */}
      <div className="base-node-header">
        <div className="base-node-title-group">
          <div className="base-node-icon">
            {icon}
          </div>

          <div>
            <div className="base-node-title">
              {title}
            </div>

            {subtitle && (
              <div className="base-node-subtitle">
                {subtitle}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="base-node-divider" />

      {/* CONTENT */}
      <div className="base-node-content">
        {children}
      </div>

      {/* HANDLES */}
      {handles.map((handle, index) => {
        const resolvedPosition =
          typeof handle.position === 'string'
            ? positionMap[
                handle.position.toLowerCase()
              ]
            : handle.position;

        return (
          <Handle
            key={handle.id || index}
            id={handle.id}
            type={handle.type}
            position={resolvedPosition}
            isConnectable={true}
            isConnectableStart={true}
            isConnectableEnd={true}
            className={`node-handle node-handle-${handle.type}`}
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background:
                handle.type === 'source'
                  ? '#8b5cf6'
                  : '#3b82f6',
              border: '2px solid white',
              top: handle.top || '50%',
              transform: 'translateY(-50%)',
              zIndex: 1000,
              cursor: 'crosshair',
              ...handle.style,
            }}
          />
        );
      })}
    </div>
  );
};

export default BaseNode;