import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Inventory } from '../models/inventory.entity';

@Injectable()
export class InventoryService {

    private urlBase: string = 'https://tesouraria-core.herokuapp.com/inventory';

    public constructor(private readonly http: HttpClient) {}

    public findAll(treasuryId: number) {
        return this.http.get<Inventory[]>(this.urlBase.concat(`/${treasuryId}`))
    }

    public save(newInventory: Inventory, treasuryId: number) {
        return this.http.post<Inventory>(this.urlBase.concat(`/${treasuryId}`), newInventory);
    }

    public update(inventoryUpdated: Inventory, treasuryId: number) {
        return this.http.put<Inventory>(this.urlBase.concat(`/${treasuryId}`), inventoryUpdated);
    }

    public delete(inventoryId: number, treasuryId: number) {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: {
              inventoryId: inventoryId
            }
        }
        return this.http.delete<Inventory>(this.urlBase.concat(`/${treasuryId}`), options);
    }
}