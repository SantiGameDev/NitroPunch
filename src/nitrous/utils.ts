import { Vector2, Vector3, Vector4 } from 'ts-vector-math';
import GameObject from './GameObject';

interface MultilineTextNode {
  currentText: string[];
  next(line: string): MultilineTextNode;
  end(): string;
}

export function multilineText(): MultilineTextNode {
  const node = {
    currentText: new Array<string>(),
    next(line: string) {
      node.currentText.concat(line);
      return node;
    },
    end() {
      return node.currentText.join('\n');
    },
  };

  return node;
}

export type Constructor<T, P = any> = { new (...args: P): T };

export type GameObjectRef = WeakRef<GameObject>;

export function throwOnUndefined<T>(value: T | undefined, message: string): T;
export function throwOnUndefined<T>(
  value: T | undefined,
  construct: () => Error
): T;
export function throwOnUndefined<T>(
  value: T | undefined,
  error: (() => Error) | string
): T {
  if (value !== undefined) return value;
  if (typeof error == 'string') {
    throw new Error(error);
  } else {
    throw error();
  }
}