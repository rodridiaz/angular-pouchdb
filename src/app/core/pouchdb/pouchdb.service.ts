import { Injectable } from '@angular/core';

import PouchDB from 'pouchdb';

@Injectable({
  providedIn: 'root'
})
export class PouchdbService {
  private db: any;
  private isInstantiated: boolean;

  public constructor() {
    if (!this.isInstantiated) {
      this.db = new PouchDB('exercisesDb');
      this.isInstantiated = true;
    }
    //
    // Use the code below to replicate the dataBase on a CouchDB or PouchDB Server
    //
    // PouchDB.replicate('exercisesDb', 'http://localhost:5984/exercisesDb', {
    //   live: true
    // });
  }

  public async fetch() {
    return this.db.allDocs({ include_docs: true });
  }

  public async get(id: string): Promise<any> {
    return this.db.get(id).then(result => result, error => error);
  }

  public async put(id: string, document: any): Promise<any> {
    let doc = null;

    try {
      doc = await this.get(id);
    } catch (e) {
      if (e.status !== 404) throw new Error(e);
    }

    if (doc) {
      return this.db.put({
        ...document,
        _id: id,
        _rev: doc._rev,
        createdDate: new Date()
      });
    }
    return this.db.put({ ...document, _id: id, createdDate: new Date() });
  }

  public async remove(id: string): Promise<any> {
    let doc = null;

    try {
      doc = await this.get(id);
    } catch (e) {
      throw new Error(e);
    }

    return this.db.remove(doc);
  }
}
