import { useState, useCallback, useEffect } from 'react';
import type { CanvasCommand, CanvasState } from '../types/CanvasCommands';

interface CanvasHistoryOptions {
  maxHistorySize?: number;
  mergeThreshold?: number; // Time in ms to merge similar commands
}

interface CanvasHistoryState {
  canUndo: boolean;
  canRedo: boolean;
  historySize: number;
  currentIndex: number;
}

export function useCanvasHistory(
  initialState: CanvasState,
  options: CanvasHistoryOptions = {}
) {
  const { maxHistorySize = 50, mergeThreshold = 500 } = options;
  
  const [currentState, setCurrentState] = useState<CanvasState>(initialState);
  const [history, setHistory] = useState<CanvasCommand[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isExecuting, setIsExecuting] = useState(false);

  // Get current history state
  const historyState: CanvasHistoryState = {
    canUndo: historyIndex >= 0,
    canRedo: historyIndex < history.length - 1,
    historySize: history.length,
    currentIndex: historyIndex
  };

  // State management functions for commands
  const getState = useCallback(() => currentState, [currentState]);
  const setState = useCallback((newState: CanvasState) => {
    setCurrentState(newState);
  }, []);

  // Execute a command and add it to history
  const executeCommand = useCallback((command: CanvasCommand) => {
    if (isExecuting) return; // Prevent recursive execution
    
    setIsExecuting(true);
    
    try {
      // Execute the command
      command.execute();
      
      setHistory(prevHistory => {
        let newHistory = [...prevHistory];
        
        // Remove any redo history if we're not at the end
        if (historyIndex < prevHistory.length - 1) {
          newHistory = newHistory.slice(0, historyIndex + 1);
        }
        
        // Try to merge with the last command if applicable
        if (newHistory.length > 0) {
          const lastCommand = newHistory[newHistory.length - 1];
          
          if (
            lastCommand.canMerge && 
            lastCommand.canMerge(command) &&
            command.timestamp - lastCommand.timestamp < mergeThreshold
          ) {
            // Merge the commands
            const mergedCommand = lastCommand.merge!(command);
            newHistory[newHistory.length - 1] = mergedCommand;
            return newHistory;
          }
        }
        
        // Add the new command
        newHistory.push(command);
        
        // Limit history size
        if (newHistory.length > maxHistorySize) {
          newHistory = newHistory.slice(-maxHistorySize);
        }
        
        return newHistory;
      });
      
      // Update history index
      setHistoryIndex(prevIndex => {
        const newLength = history.length + 1;
        return Math.min(newLength - 1, maxHistorySize - 1);
      });
      
    } finally {
      setIsExecuting(false);
    }
  }, [historyIndex, history.length, maxHistorySize, mergeThreshold, isExecuting]);

  // Undo the last command
  const undo = useCallback(() => {
    if (!historyState.canUndo || isExecuting) return;
    
    setIsExecuting(true);
    
    try {
      const command = history[historyIndex];
      if (command) {
        command.undo();
        setHistoryIndex(prev => prev - 1);
      }
    } finally {
      setIsExecuting(false);
    }
  }, [history, historyIndex, historyState.canUndo, isExecuting]);

  // Redo the next command
  const redo = useCallback(() => {
    if (!historyState.canRedo || isExecuting) return;
    
    setIsExecuting(true);
    
    try {
      const nextIndex = historyIndex + 1;
      const command = history[nextIndex];
      if (command) {
        command.redo();
        setHistoryIndex(nextIndex);
      }
    } finally {
      setIsExecuting(false);
    }
  }, [history, historyIndex, historyState.canRedo, isExecuting]);

  // Clear history
  const clearHistory = useCallback(() => {
    setHistory([]);
    setHistoryIndex(-1);
  }, []);

  // Get history summary for debugging/analytics
  const getHistorySummary = useCallback(() => {
    return {
      total: history.length,
      index: historyIndex,
      commands: history.map(cmd => ({
        type: cmd.type,
        timestamp: cmd.timestamp,
        id: cmd.id
      }))
    };
  }, [history, historyIndex]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return; // Don't interfere with input fields
      }

      // Ctrl/Cmd + Z = Undo
      if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        undo();
      }
      
      // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y = Redo
      if (
        ((event.ctrlKey || event.metaKey) && event.key === 'z' && event.shiftKey) ||
        ((event.ctrlKey || event.metaKey) && event.key === 'y')
      ) {
        event.preventDefault();
        redo();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  // Debug logging in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Canvas History State:', {
        historySize: history.length,
        currentIndex: historyIndex,
        canUndo: historyState.canUndo,
        canRedo: historyState.canRedo,
        lastCommand: history[historyIndex]?.type || 'none'
      });
    }
  }, [history, historyIndex, historyState]);

  return {
    // Current state
    currentState,
    setState,
    getState,
    
    // History operations
    executeCommand,
    undo,
    redo,
    clearHistory,
    
    // History state
    ...historyState,
    
    // Utilities
    getHistorySummary,
    isExecuting
  };
}