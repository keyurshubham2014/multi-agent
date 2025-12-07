// AgentForge Type Definitions

/**
 * Pipeline data model
 */
export interface Pipeline {
  id: string;
  userId: string;
  name: string;
  description: string;
  agents: Agent[];
  connections: Connection[];
  isTemplate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Agent configuration within a pipeline
 */
export interface Agent {
  id: string;
  type: AgentType;
  name: string;
  role: string;
  config: AgentConfig;
  position: Position;
}

/**
 * Available agent types
 */
export type AgentType =
  | 'input_parser'
  | 'web_search'
  | 'code_executor'
  | 'api_connector'
  | 'data_processor'
  | 'output_formatter'
  | 'strategy_agent'
  | 'presentation_generator';

/**
 * Agent-specific configuration
 */
export interface AgentConfig {
  [key: string]: unknown;
}

/**
 * Canvas position for agents
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Connection between agents
 */
export interface Connection {
  id: string;
  sourceAgentId: string;
  targetAgentId: string;
  sourceHandle?: string;
  targetHandle?: string;
}

/**
 * Pipeline execution record
 */
export interface Execution {
  id: string;
  pipelineId: string;
  userId: string;
  input: string;
  status: ExecutionStatus;
  agentOutputs: AgentOutput[];
  finalOutput: unknown;
  durationMs: number;
  createdAt: Date;
}

/**
 * Execution status states
 */
export type ExecutionStatus = 'pending' | 'running' | 'completed' | 'failed';

/**
 * Output from a single agent
 */
export interface AgentOutput {
  agentId: string;
  output: unknown;
  duration: number;
  status: 'success' | 'error';
  error?: string;
}

/**
 * User profile
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: Date;
}
