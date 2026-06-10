import React from 'react';
import './FlowNotification.css';

const FlowNotification = ({ result, onClose }) => {
  if (!result) {
    return null;
  }

  return (
    <div className="flow-notification-backdrop">
      <div className="flow-notification-card">
        <div className="flow-notification-header">
          <div>
            <div className="flow-notification-title">
              Pipeline Analysis
            </div>

            <div className="flow-notification-subtitle">
              Workflow validation completed successfully.
            </div>
          </div>

          <button
            className="flow-notification-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="flow-notification-grid">
          <div className="flow-stat-card">
            <div className="flow-stat-label">Nodes</div>
            <div className="flow-stat-value">
              {result.num_nodes}
            </div>
          </div>

          <div className="flow-stat-card">
            <div className="flow-stat-label">Edges</div>
            <div className="flow-stat-value">
              {result.num_edges}
            </div>
          </div>
        </div>

        <div
          className={`flow-status ${
            result.is_dag
              ? 'flow-status-success'
              : 'flow-status-error'
          }`}
        >
          {result.is_dag
            ? 'Valid DAG Flowchart'
            : 'Cycle Detected In Graph'}
        </div>
      </div>
    </div>
  );
};

export default FlowNotification;