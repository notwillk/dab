import * as path from 'path';
import * as fs from 'fs';
import File from './File.js'

function justFiles(fileOrDirectory: fs.Dirent): boolean {
    return fileOrDirectory.isFile();
}

function justDirectories(fileOrDirectory: fs.Dirent): boolean {
    return fileOrDirectory.isDirectory();
}

export default class Directory {
    _path: string;
    _subDirectories: Record<string, Directory>;
    _files: Record<string, File>;
    _allFiles: fs.Dirent[] | null;

    constructor(path: string) {
        this._path = path;
        this._subDirectories = {};
        this._files = {};
        this._allFiles = null;
    }

    dir(name: string): Promise<Directory> {
        const subDir = this._subDirectories[name];
        if (subDir) {
            return Promise.resolve(subDir);
        }

        return new Promise((resolve, reject) => {
            fs.stat(path.resolve(this._path, name), (err, stats) => {
                if(err !== null || !stats.isDirectory()) {
                    reject(err);
                    return;
                }

                const subDir = new Directory(path.resolve(this._path, name));
                this._subDirectories[name] = subDir;
                resolve(subDir);
            });
        });
    }

    file(name: string): Promise<File> {
        const file = this._files[name];
        if (file) {
            return Promise.resolve(file);
        }

        return new Promise((resolve, reject) => {
            fs.stat(path.resolve(this._path, name), (err, stats) => {

                if(err !== null || !stats.isFile()) {
                    reject(err);
                    return;
                }

                const file = new File(path.resolve(this._path, name));
                this._files[name] = file;
                resolve(file);
            });
        });
    }

    directories(): Promise<fs.Dirent[]> {
        if(this._allFiles !== null) {
            return Promise.resolve(this._allFiles.filter(justDirectories));
        }

        return new Promise((resolve, reject) => {
            fs.readdir(this._path, { withFileTypes: true }, (err, files) => {
                if(err !== null) {
                    reject(err);
                    return;
                }

                this._allFiles = files;
                resolve(files.filter(justDirectories));
            });
        });
    }

    files(): Promise<fs.Dirent[]> {
        if(this._allFiles !== null) {
            return Promise.resolve(this._allFiles.filter(justFiles));
        }

        return new Promise((resolve, reject) => {
            fs.readdir(this._path, { withFileTypes: true }, (err, files) => {
                if(err !== null) {
                    reject(err);
                    return;
                }

                this._allFiles = files;
                resolve(files.filter(justFiles));
            });
        });
    }

    createFile(name: string, data: string) {
        const fullPath = path.resolve(this._path, name);

        if( fs.existsSync(fullPath) ) {
            throw new Error("File exists");
        }

        fs.writeFileSync(path.resolve(this._path, name), data);
        this._allFiles = null;
    }
}