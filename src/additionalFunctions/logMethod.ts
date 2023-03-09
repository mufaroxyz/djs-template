import { performance } from "perf_hooks";
import { Logger } from "../services/logger";

export function logMethod<Return>(
  // @ts-ignore
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]): Return {
    const perfStart = performance.now();
    const result = originalMethod.apply(this, args);
    const perfEnd = performance.now();

    Logger.info(
      `${this.constructor.name} executed within ${
        Math.round((perfEnd - perfStart) * 100) / 100
      }s with args ${args.map((arg) => arg)}`,
    );
    return result;
  };
  return descriptor;
}

