// Command pattern interfaces for canvas operations

export interface CanvasCommand {
  id: string;
  type: string;
  timestamp: number;
  execute(): void;
  undo(): void;
  redo(): void;
  canMerge?(command: CanvasCommand): boolean;
  merge?(command: CanvasCommand): CanvasCommand;
}

export interface Block {
  id: string;
  type: string;
  category: 'compute' | 'data' | 'network' | 'security' | 'messaging' | 'analytics';
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  selected: boolean;
  ports: ConnectionPort[];
  config: Record<string, any>;
}

export interface Connection {
  id: string;
  sourceBlockId: string;
  sourcePortId: string;
  targetBlockId: string;
  targetPortId: string;
  selected: boolean;
}

export interface ConnectionPort {
  id: string;
  type: 'input' | 'output';
  position: { x: number; y: number };
}

export interface CanvasState {
  blocks: Block[];
  connections: Connection[];
}

// Specific command implementations

export class AddBlockCommand implements CanvasCommand {
  id: string;
  type = 'ADD_BLOCK';
  timestamp: number;
  private block: Block;
  private getState: () => CanvasState;
  private setState: (state: CanvasState) => void;

  constructor(
    block: Block,
    getState: () => CanvasState,
    setState: (state: CanvasState) => void
  ) {
    this.id = `add_block_${Date.now()}_${Math.random()}`;
    this.timestamp = Date.now();
    this.block = block;
    this.getState = getState;
    this.setState = setState;
  }

  execute(): void {
    const state = this.getState();
    this.setState({
      ...state,
      blocks: [...state.blocks, this.block]
    });
  }

  undo(): void {
    const state = this.getState();
    this.setState({
      ...state,
      blocks: state.blocks.filter(b => b.id !== this.block.id)
    });
  }

  redo(): void {
    this.execute();
  }
}

export class DeleteBlockCommand implements CanvasCommand {
  id: string;
  type = 'DELETE_BLOCK';
  timestamp: number;
  private block: Block;
  private relatedConnections: Connection[];
  private getState: () => CanvasState;
  private setState: (state: CanvasState) => void;

  constructor(
    block: Block,
    getState: () => CanvasState,
    setState: (state: CanvasState) => void
  ) {
    this.id = `delete_block_${Date.now()}_${Math.random()}`;
    this.timestamp = Date.now();
    this.block = block;
    this.getState = getState;
    this.setState = setState;
    
    // Store connections that will be deleted
    const state = this.getState();
    this.relatedConnections = state.connections.filter(
      conn => conn.sourceBlockId === block.id || conn.targetBlockId === block.id
    );
  }

  execute(): void {
    const state = this.getState();
    this.setState({
      blocks: state.blocks.filter(b => b.id !== this.block.id),
      connections: state.connections.filter(
        conn => conn.sourceBlockId !== this.block.id && conn.targetBlockId !== this.block.id
      )
    });
  }

  undo(): void {
    const state = this.getState();
    this.setState({
      blocks: [...state.blocks, this.block],
      connections: [...state.connections, ...this.relatedConnections]
    });
  }

  redo(): void {
    this.execute();
  }
}

export class MoveBlockCommand implements CanvasCommand {
  id: string;
  type = 'MOVE_BLOCK';
  timestamp: number;
  private blockId: string;
  private fromPosition: { x: number; y: number };
  private toPosition: { x: number; y: number };
  private getState: () => CanvasState;
  private setState: (state: CanvasState) => void;

  constructor(
    blockId: string,
    fromPosition: { x: number; y: number },
    toPosition: { x: number; y: number },
    getState: () => CanvasState,
    setState: (state: CanvasState) => void
  ) {
    this.id = `move_block_${Date.now()}_${Math.random()}`;
    this.timestamp = Date.now();
    this.blockId = blockId;
    this.fromPosition = fromPosition;
    this.toPosition = toPosition;
    this.getState = getState;
    this.setState = setState;
  }

  execute(): void {
    const state = this.getState();
    this.setState({
      ...state,
      blocks: state.blocks.map(block =>
        block.id === this.blockId
          ? { ...block, x: this.toPosition.x, y: this.toPosition.y }
          : block
      )
    });
  }

  undo(): void {
    const state = this.getState();
    this.setState({
      ...state,
      blocks: state.blocks.map(block =>
        block.id === this.blockId
          ? { ...block, x: this.fromPosition.x, y: this.fromPosition.y }
          : block
      )
    });
  }

  redo(): void {
    this.execute();
  }

  canMerge(command: CanvasCommand): boolean {
    return (
      command instanceof MoveBlockCommand &&
      command.blockId === this.blockId &&
      command.timestamp - this.timestamp < 1000 // Merge moves within 1 second
    );
  }

  merge(command: CanvasCommand): CanvasCommand {
    if (command instanceof MoveBlockCommand && this.canMerge(command)) {
      return new MoveBlockCommand(
        this.blockId,
        this.fromPosition,
        command.toPosition,
        this.getState,
        this.setState
      );
    }
    return this;
  }
}

export class AddConnectionCommand implements CanvasCommand {
  id: string;
  type = 'ADD_CONNECTION';
  timestamp: number;
  private connection: Connection;
  private getState: () => CanvasState;
  private setState: (state: CanvasState) => void;

  constructor(
    connection: Connection,
    getState: () => CanvasState,
    setState: (state: CanvasState) => void
  ) {
    this.id = `add_connection_${Date.now()}_${Math.random()}`;
    this.timestamp = Date.now();
    this.connection = connection;
    this.getState = getState;
    this.setState = setState;
  }

  execute(): void {
    const state = this.getState();
    this.setState({
      ...state,
      connections: [...state.connections, this.connection]
    });
  }

  undo(): void {
    const state = this.getState();
    this.setState({
      ...state,
      connections: state.connections.filter(c => c.id !== this.connection.id)
    });
  }

  redo(): void {
    this.execute();
  }
}

export class DeleteConnectionCommand implements CanvasCommand {
  id: string;
  type = 'DELETE_CONNECTION';
  timestamp: number;
  private connection: Connection;
  private getState: () => CanvasState;
  private setState: (state: CanvasState) => void;

  constructor(
    connection: Connection,
    getState: () => CanvasState,
    setState: (state: CanvasState) => void
  ) {
    this.id = `delete_connection_${Date.now()}_${Math.random()}`;
    this.timestamp = Date.now();
    this.connection = connection;
    this.getState = getState;
    this.setState = setState;
  }

  execute(): void {
    const state = this.getState();
    this.setState({
      ...state,
      connections: state.connections.filter(c => c.id !== this.connection.id)
    });
  }

  undo(): void {
    const state = this.getState();
    this.setState({
      ...state,
      connections: [...state.connections, this.connection]
    });
  }

  redo(): void {
    this.execute();
  }
}