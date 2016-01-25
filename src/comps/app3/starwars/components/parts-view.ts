///<reference path="../../../../../typings/app.d.ts"/>

import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges} from 'angular2/core'

import {createSelector} from 'reselect';

const partsInCartLookupSelector = createSelector((changeRecord:any) => changeRecord.partsInCart.currentValue,
    (partsInCart:any) => partsInCart.reduce((map, part:any) => (map[part.id] = true) && map, {})
);

@Component({
    selector: 'parts',
    template: `
        <table>
            <tr *ngFor="#part of parts">
                <td>
                    <button style="margin-right:10px;margin-bottom:3px;margin-top:3px"
                        [disabled]="partsInCartLookup[part.id]"
                        (click)="addToCart.next(part.id)">add
                    </button>
                </td>
                <td>{{part.name}}</td>
            </tr>
        </table>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartsView implements OnChanges {
    @Input() parts = [];
    @Input() partsInCart = [];
    partsInCartLookup = {};

    @Output() addToCart:EventEmitter<any> = new EventEmitter();

    ngOnChanges(changeRecord) {
        this.partsInCartLookup = partsInCartLookupSelector(changeRecord);
    }
}
