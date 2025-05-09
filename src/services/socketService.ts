
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

interface SpeedTestProgress {
  stage: 'ping' | 'download' | 'upload' | 'complete';
  progress: number;
  speeds?: {
    download?: number;
    upload?: number;
    ping?: number;
    jitter?: number;
  };
}

class SocketService {
  private socket: Socket | null = null;
  private connected = false;
  private listeners: Map<string, Function[]> = new Map();

  connect() {
    if (this.socket) return;

    this.socket = io(API_URL);

    this.socket.on('connect', () => {
      console.log('Socket connected');
      this.connected = true;
      this.emit('listeners.connect');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      toast.error("Failed to connect to the server");
      this.connected = false;
      this.emit('listeners.error', error);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
      this.connected = false;
      this.emit('listeners.disconnect');
    });

    this.socket.on('speedtest.progress', (data: SpeedTestProgress) => {
      this.emit('speedtest.progress', data);
    });

    this.socket.on('speedtest.complete', (result) => {
      this.emit('speedtest.complete', result);
    });

    this.socket.on('speedtest.error', (error) => {
      console.error('Speed test error:', error);
      toast.error("Speed test failed: " + error.message);
      this.emit('speedtest.error', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
    }
  }

  startTest() {
    if (!this.socket || !this.connected) {
      this.connect();
      // Add a slight delay to ensure connection is established
      setTimeout(() => {
        this.socket?.emit('speedtest.start');
      }, 500);
    } else {
      this.socket.emit('speedtest.start');
    }
  }

  stopTest() {
    if (this.socket && this.connected) {
      this.socket.emit('speedtest.stop');
    }
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  }

  off(event: string, callback: Function) {
    if (!this.listeners.has(event)) return;
    
    const callbacks = this.listeners.get(event) || [];
    this.listeners.set(
      event,
      callbacks.filter(cb => cb !== callback)
    );
  }

  private emit(event: string, ...args: any[]) {
    if (!this.listeners.has(event)) return;
    
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach(callback => {
      try {
        callback(...args);
      } catch (error) {
        console.error(`Error in ${event} listener:`, error);
      }
    });
  }

  isConnected() {
    return this.connected;
  }
}

export const socketService = new SocketService();
export default socketService;
