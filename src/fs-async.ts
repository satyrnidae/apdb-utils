import { Abortable } from 'events';
import * as fs from 'fs';
import { Resolve, Reject } from './types';

type ReadDirOptions = {
  encoding: BufferEncoding;
  withFileTypes?: false;
} | 'ascii' | 'utf8' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'latin1' | 'binary' | 'hex';

type ReadFileOptions = {
  encoding?: null;
  flag?: string
} & Abortable;

type ReadResult = {
  read: number,
  buffer: Buffer
}

type WriteResult = {
  written: number,
  buffer: Buffer
}

export namespace fsa {
  /**
   * Asynchrounously reads the contents of a file. Promisifies fs.readFile from the fs package.
   * @param path The path of the file to read
   * @param options Read options for the file
   */
  export async function readFileAsync(path: fs.PathLike, options?: ReadFileOptions): Promise<Buffer> {
    return new Promise<Buffer>((resolve: Resolve<Buffer>, reject: Reject) => {
      fs.readFile(path, options, (err, data: Buffer) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      });
    });
  }

  /**
   * Asynchronously gathers a listing for the specified directory. Promisifies fs.readFile from the fs package.
   * @param path The path of the directory to list
   * @param options Read options for the directory
   */
  export async function readdirAsync(path: fs.PathLike, options?: ReadDirOptions): Promise<string[]> {
    return new Promise<string[]>((resolve: Resolve<string[]>, reject: Reject) => {
      fs.readdir(path, options, (err, files) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(files);
      });
    });
  }

  /**
   * Asynchronously returns the stats of a file. Promisifies fs.lstat.
   * @param path The path of the file to stat
   */
  export async function lstatAsync(path: fs.PathLike): Promise<fs.Stats> {
    return new Promise<fs.Stats>((resolve: Resolve<fs.Stats>, reject: Reject) => {
      fs.lstat(path, (err, stats) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(stats);
      });
    });
  }

  /**
   * Asynchronously checks if a file or directory exists. Promisifies fs.exists.
   * @param path The path of the file or directory.
   */
  export async function existsAsync(path: fs.PathLike): Promise<boolean> {
    return new Promise<boolean>((resolve: Resolve<boolean>) => {
      fs.exists(path, (exists: boolean) => resolve(exists));
    });
  }

  export async function openAsync(path: fs.PathLike, flags: string, mode: number = 0o666): Promise<number> {
    return new Promise<number>((resolve: Resolve<number>, reject: Reject) => {
      fs.open(path, flags, mode, (err, fd) => {
        if (err) {
          reject(err);
        }
        resolve(fd);
      });
    });
  }

  export async function readAsync(fd: number, inBuffer: Buffer, offset: number, length: number, position: number): Promise<ReadResult> {
    return new Promise<ReadResult>((resolve: Resolve<ReadResult>, reject: Reject) => {
      fs.read(fd, inBuffer, offset, length, position, (err, read, outBuffer) => {
        if (err) {
          reject(err);
        }
        resolve({ read, buffer: outBuffer });
      });
    });
  }

  export async function writeAsync(fd: number, inBuffer: Buffer, offset: number, length: number, position: number): Promise<WriteResult> {
    return new Promise<WriteResult>((resolve: Resolve<WriteResult>, reject: Reject) => {
      fs.write(fd, inBuffer, offset, length, position, (err, written, outBuffer) => {
        if (err) {
          reject(err);
        }
        resolve({ written, buffer: outBuffer });
      });
    });
  }

  export async function closeAsync(fd: number): Promise<void> {
    return new Promise<void>((resolve: Resolve<void>, reject: Reject) => {
      fs.close(fd, err => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}
